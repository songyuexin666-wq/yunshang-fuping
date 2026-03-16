# 云上阜平 - 乡村旅游3D重建展示平台

一个基于Vue 3的乡村旅游展示平台，运用三维重建技术展示红色资源、绿色资源和地质资源，解决乡村旅游信息不对称问题。

## 功能特点

- 🏠 **项目首页**：包含项目介绍、团队介绍和3D重建模型视频展示
- 🔴 **红色资源**：展示晋察冀纪念馆、骆驼湾、顾家台等红色文化资源（3D重建）
- 🟢 **绿色资源**：展示平石头自然风光和特色民宿（3D重建）
- 🏔️ **地质资源**：展示天生桥地质奇观（3D重建）
- 📊 **浏览量统计**：自动记录每个页面的访问次数
- 🎥 **3D模型展示**：高精度三维实景模型视频播放和模型链接跳转
- 🗺️ **智能导航**：集成智能导航、路线规划、景点讲解等功能
- 📱 **响应式设计**：适配各种设备屏幕

## 技术栈

- Vue 3
- Vue Router 4
- Vite
- 本地存储（localStorage）用于浏览量统计

## 安装和运行

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 公网部署（Vercel）

- **Build Command**：`npm run build`
- **Output Directory**：`dist`
- **history 路由刷新不 404**：项目已包含 `vercel.json`（Vue Router `createWebHistory()` 需要回退到 `index.html`）

### 全网访问统计（基于 Vercel KV）

- 本地统计：仍然使用 `localStorage`，逻辑在 `src/router/index.js` 和 `src/utils/viewCounter.js`
- 全网统计：前端在路由跳转时调用 `/api/track`，后端使用 Vercel Serverless Function + KV 进行计数

启用步骤（在 Vercel）：

1. 在 Vercel 项目中添加 KV 存储（`Storage -> KV`），并关联到当前项目；
2. 确保 KV 的相关环境变量自动注入（Vercel 会在绑定后自动配置）；
3. 重新部署后，每次路由跳转都会向 `/api/track` 写入对应页面的全网浏览量；
4. 访问 `/api/track`（GET）可以看到所有页面的全网计数汇总（JSON）。

## 项目结构

```
create/
├── src/
│   ├── views/          # 页面组件
│   │   ├── Home.vue                    # 网站首页
│   │   ├── RedResources.vue            # 红色资源
│   │   ├── GreenResources.vue          # 绿色资源
│   │   └── GeologicalResources.vue     # 地质资源
│   ├── router/         # 路由配置
│   │   └── index.js
│   ├── utils/          # 工具函数
│   │   └── viewCounter.js              # 浏览量统计
│   ├── App.vue         # 根组件
│   ├── main.js         # 入口文件
│   └── style.css       # 全局样式
├── index.html
├── package.json
└── vite.config.js
```

## 使用说明

1. **浏览页面**：通过顶部导航栏切换不同页面
2. **查看图片**：鼠标悬停在图片上可查看详细信息链接
3. **模型视频**：在首页可以观看3D重建模型视频
4. **浏览量统计**：每次访问页面会自动记录浏览量，数据存储在浏览器本地

## 注意事项

- 图片链接使用的是占位符，实际使用时需要替换为真实图片URL
- 模型视频路径需要根据实际情况调整
- 超链接地址为示例，需要替换为实际链接
- 浏览量数据存储在浏览器本地存储中，清除浏览器数据会重置统计

## 自定义配置

### 修改图片

在对应的Vue组件中，将 `<img src="...">` 中的URL替换为实际图片地址。

### 修改链接

在对应的Vue组件中，将 `<a href="...">` 中的URL替换为实际链接地址。

### 添加模型视频

1. 将视频文件放置在 `public` 目录下
2. 在 `Home.vue` 中修改视频路径
3. 如需添加视频封面，可设置 `poster` 属性

