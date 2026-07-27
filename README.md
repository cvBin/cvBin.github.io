# OptiCalib 多镜头相机标定系统官网

这是一个基于《OptiCalib 多镜头相机标定系统使用手册 V1.9.7》内容制作的响应式静态商业网站，可直接部署到 GitHub Pages。

## 页面特点

- 无构建工具、无框架依赖，直接打开 `index.html` 即可浏览
- 桌面端、平板和手机端响应式布局
- 固定导航、阅读进度条、滚动渐入、工作流滚动高亮
- 四种工作模式交互切换
- 精度分析仪表盘、模型与参数展示、FAQ 折叠面板
- 使用本地 SVG 与 CSS 绘制视觉元素，不依赖产品截图
- 已加入基础 SEO、Open Graph、无障碍标签与减少动画偏好支持

## 本地预览

在项目目录运行：

```bash
python3 -m http.server 8080
```

然后访问 `http://localhost:8080`。

## 部署到 GitHub Pages

1. 新建一个 GitHub 仓库。
2. 将本目录所有文件推送到仓库根目录。
3. 打开仓库 `Settings` → `Pages`。
4. 在 `Build and deployment` 中选择 `Deploy from a branch`。
5. 分支选择 `main`，目录选择 `/ (root)`，保存。
6. 等待 GitHub Pages 发布完成。

也可以把仓库命名为 `你的用户名.github.io`，作为用户主页直接部署。

## 自定义建议

- 将手册中的软件截图压缩后放入 `assets/`，替换当前 CSS/SVG 示意图。
- 把真实“最新版下载”地址添加到顶部和 CTA 按钮。
- 若有备案、隐私政策、公司主体和版权信息，请在页脚补充。
- 发布前确认产品参数、版本号、联系方式和精度表述仍与当前版本一致。

## 文件结构

```text
.
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets
    ├── favicon.svg
    └── og-cover.svg
```
