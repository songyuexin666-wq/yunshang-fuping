# 云上阜平 · Yunshang Fuping

<p align="center">
  <b>面向乡村文旅资源展示的 3D 数字化体验平台</b>
</p>

“云上阜平”是一个基于 **Vue 3 + Vite** 构建的乡村文旅数字展示平台，围绕红色文化、自然生态与地质资源，将三维重建内容、景点介绍、路线导航和访问统计整合到统一的 Web 端体验中。

项目重点不是复杂算法，而是将 **3D 数字内容、文旅信息与前端交互** 组合成一个可部署、可浏览、可扩展的展示系统。

---

## 项目亮点

- **3D 文旅展示**：通过视频与模型链接展示三维重建成果
- **多主题资源组织**：红色资源、绿色资源、地质资源分区展示
- **景点信息聚合**：统一呈现景点介绍、图片与外部资源
- **智能导航入口**：支持路线规划、景点讲解等扩展能力
- **访问统计**：本地访问统计 + Vercel KV 全局统计
- **响应式设计**：适配桌面端与移动端
- **云端部署**：支持 Vercel 一键式前端部署与 Serverless API

---

## 功能模块

### 红色文化资源

展示晋察冀纪念馆、骆驼湾、顾家台等红色文化与乡村振兴相关资源。

### 绿色生态资源

展示自然风光、特色民宿等生态与乡村旅游资源。

### 地质资源

展示天生桥等代表性地质景观，并通过数字媒体增强远程浏览体验。

### 3D 数字内容

项目可嵌入：

- 三维重建模型展示链接
- 三维模型录屏 / 演示视频
- 景点图片与说明
- 外部导航与讲解服务

---

## 技术栈

| 模块 | 技术 |
| --- | --- |
| Frontend | Vue 3 |
| Build | Vite |
| Routing | Vue Router 4 |
| Local analytics | localStorage |
| Cloud analytics | Vercel Serverless Function + KV |
| Deployment | Vercel |

---

## 项目结构

```text
yunshang-fuping/
├── api/                        # Vercel Serverless APIs
├── data/                       # 项目数据
├── public/                     # 静态资源
├── src/
│   ├── views/
│   │   ├── Home.vue
│   │   ├── RedResources.vue
│   │   ├── GreenResources.vue
│   │   └── GeologicalResources.vue
│   ├── router/
│   │   └── index.js
│   ├── utils/
│   │   └── viewCounter.js
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Quick Start

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

启动后访问终端输出的本地开发地址。

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

---

## 访问统计

项目包含两类访问统计逻辑：

### 本地统计

使用浏览器 `localStorage` 记录访问行为，适合本地演示和轻量级统计。

### 全局统计

前端在页面跳转时调用：

```text
/api/track
```

Vercel Serverless Function 负责写入云端 KV，从而实现跨用户的全局访问统计。

---

## Vercel 部署

推荐配置：

```text
Build Command: npm run build
Output Directory: dist
```

项目已包含针对 Vue Router history 模式的 Vercel 路由回退配置。

若启用全局访问统计，需要在 Vercel 中绑定对应 KV 存储并配置相关环境变量。

---

## 内容扩展

你可以很容易地继续扩展：

- 新增景点页面
- 增加更多 3D 模型
- 接入在线地图与路线规划
- 增加语音导览
- 增加后台内容管理系统
- 将统计模块升级为更完整的用户行为分析

---

## 使用场景

本项目适合作为：

- 乡村旅游数字展示平台
- 三维重建成果展示前端
- 红色文化数字化展示项目
- 文旅比赛 / 创新创业项目原型
- Vue 3 + Vercel 全栈部署案例

---

## Notes

部分展示内容、外部链接和三维资源可能依赖具体部署环境。若复用本项目，请根据实际资源替换对应图片、视频和模型地址。

---

## License

See [LICENSE](LICENSE) for details.
