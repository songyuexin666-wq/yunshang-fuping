# 静态资源目录

此目录用于存放静态资源文件，如图片、视频等。

## 文件说明

### 视频文件
- `model-video.mp4` - 首页 3D 重建模型视频（可选）
- `placeholder-video.jpg` - 首页视频封面图（可选）
- **导览视频**：放在 `guide-videos/` 文件夹下，**文件名 = 景点 id + .mp4**，例如：
  - `guide-videos/jinchaji-outdoor.mp4` → 晋察冀纪念馆室外
  - `guide-videos/luotuowan-1haoyuan.mp4` → 骆驼湾1号院
  - 其他景点 id 与红色/绿色/地质列表中的一致（如 `pingshitou-outdoor.mp4`、`tianshengqiao-erpu.mp4` 等）

### 页面使用的图片（红色/绿色/地质资源，按条目）

每类下列出多个条目，每条目对应一张图片、一个 3D 链接和 1.md 介绍。请按以下文件名放入对应目录：

**红色资源** `public/red/`  
- 晋察冀：`jinchaji-outdoor.jpg`、`jinchaji-indoor.jpg`  
- 骆驼湾：`luotuowan-outdoor.jpg`、`luotuowan-1haoyuan.jpg`、`luotuowan-laofangzi.jpg`  
- 顾家台：`gujiatai-outdoor.jpg`、`gujiatai-meeting.jpg`、`gujiatai-chejian.jpg`

**绿色资源** `public/green/`  
- 平石头村：`pingshitou-outdoor.jpg`、`pingshitou-cunweihui.jpg`、`pingshitou-laofangzi.jpg`  
- 民宿：`minsu-shanli.jpg`（山里民宿）、`minsu-dachuang.jpg`、`minsu-shuangchuang.jpg`、`minsu-taofang.jpg`、`minsu-xiaoyuan.jpg`、`minsu-taihang.jpg`

**地质资源** `public/geological/`  
- 天生桥：`tianshengqiao-erpu.jpg`、`tianshengqiao-xiaogouzao1.jpg`～`xiaogouzao4.jpg`  
- 地质博物馆：`bowuguan-tunnel.jpg`

若某张图片不存在，页面会显示占位图。

若某张图片不存在，页面会自动显示占位图。

### 使用方法

1. **视频文件**：将您的模型视频文件重命名为 `model-video.mp4` 并放在此目录下
2. **封面图**：将视频封面图重命名为 `placeholder-video.jpg` 并放在此目录下
3. **页面图片**：按上表放入对应子目录，文件名需一致

### 访问路径

在代码中，可以通过以下方式访问 public 目录下的文件：
- `/model-video.mp4` - 访问视频文件
- `/placeholder-video.jpg` - 访问封面图
- `/red/xxx.jpg`、`/green/xxx.jpg`、`/geological/xxx.jpg` - 访问各资源页图片

**注意**：public 目录下的文件会直接复制到构建输出目录的根目录，所以路径以 `/` 开头。





