(() => {
  const header = document.querySelector('.site-header');
  const progress = document.getElementById('pageProgress');
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('primaryNav');
  const navLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];

  const onScroll = () => {
    header?.classList.toggle('scrolled', window.scrollY > 18);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (progress) progress.style.width = `${pct}%`;
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  navToggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    document.body.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
  });
  navLinks.forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -30px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const sections = [...document.querySelectorAll('main section[id]')];
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55%', threshold: 0 });
  sections.forEach(section => navObserver.observe(section));

  const steps = [...document.querySelectorAll('.step')];
  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      steps.forEach(step => step.classList.toggle('active', step === entry.target));
    });
  }, { rootMargin: '-38% 0px -38%', threshold: .3 });
  steps.forEach(step => stepObserver.observe(step));

  const modeData = {
    'single-single': {
      no: 'MODE 01', title: '单镜头单标定板相机标定',
      desc: '适合单相机内参、畸变和标定板外参求解。手册示例使用 15 张鱼眼图像与 9×7 棋盘格，标定焦距、主点及 4 个畸变参数。',
      list: ['流程最简，适合快速建立单相机模型', '支持普通镜头与鱼眼镜头', '可结合误差分布与畸变校正效果进行复核']
    },
    'single-multi': {
      no: 'MODE 02', title: '单镜头多标定板相机标定',
      desc: '同一镜头可在一个工程中使用多个尺寸、类型和编码方式不同的标定板。手册示例同时使用两块棋盘和一块 ChArUco 标定板。',
      list: ['适合复杂空间或单块标定板覆盖不足的场景', '支持不同尺寸与不同编码标定板混用', '有利于改善视场边缘覆盖与有效区域评估']
    },
    'multi-single': {
      no: 'MODE 03', title: '多镜头单标定板相机标定',
      desc: '使用同一块标定板完成双目或多镜头联合标定。需确保相机刚性连接、图像同步，并设置正确的共视图像关系。',
      list: ['统一求解多镜头相对位姿', '支持内参独立求解或参与全局优化', '可通过极线约束与单点误差修正检查一致性']
    },
    'multi-multi': {
      no: 'MODE 04', title: '多镜头多标定板相机标定',
      desc: '适合大空间、多相机阵列和复杂遮挡条件。通过多个标定板建立更丰富的空间约束，并将所有镜头外参统一到全局坐标系。',
      list: ['面向多相机系统的全局联合优化', '支持混合标定板与不完全公共视场', '可结合基准标定板完成工程坐标系对齐']
    }
  };
  const modeTabs = [...document.querySelectorAll('.mode-tab')];
  const modeRig = document.getElementById('modeRig');
  const updateMode = key => {
    const data = modeData[key];
    document.getElementById('modeNo').textContent = data.no;
    document.getElementById('modeTitle').textContent = data.title;
    document.getElementById('modeDesc').textContent = data.desc;
    document.getElementById('modeList').innerHTML = data.list.map(item => `<li>${item}</li>`).join('');
    modeRig.dataset.layout = key;
    modeTabs.forEach(tab => {
      const active = tab.dataset.mode === key;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });
  };
  updateMode('single-single');
  modeTabs.forEach(tab => tab.addEventListener('click', () => updateMode(tab.dataset.mode)));

  document.querySelectorAll('.faq-item button').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const open = item.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
  });

  const qualityBar = document.getElementById('qualityBar');
  const qualityObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      qualityBar.style.width = '86%';
      qualityObserver.disconnect();
    }
  }, { threshold: .5 });
  if (qualityBar) qualityObserver.observe(qualityBar);

  document.getElementById('year').textContent = new Date().getFullYear();
})();
