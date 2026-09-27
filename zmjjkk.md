# ZmjjKK 个人介绍页

无畏契约（VALORANT）EDG 选手郑永康（ZmjjKK）的个人介绍单页网站，粉丝致敬性质的非官方页面。

## 技术栈

- 原生 HTML / CSS / JavaScript，无框架、无第三方 UI 库
- 三文件分离：`portfolio.html` + `style.css` + `script.js`
- Google Fonts（Inter、Noto Serif SC）
- 深浅色主题基于 CSS 变量 + `data-theme` 属性实现

## 运行方式

直接用浏览器打开 `portfolio.html` 即可；或启动本地静态服务器：

```bash
python -m http.server 8080
# 或
npx http-server -p 8080
```

访问 `http://localhost:8080/portfolio.html`。

## 主要功能

- **六大内容板块**：个人信息、打法特点、游戏经历、重要荣誉、职业生涯低谷、外界评价
- **深浅色主题切换**：导航栏右侧按钮切换；`localStorage` 记忆用户选择，首次访问跟随系统偏好
- **交互增强**：滚动进度条、导航当前区块高亮、Hero 视差、卡片涟漪、数字滚动动画、返回顶部
- **响应式布局**：兼容桌面端与移动端（断点 640px / 820px）
