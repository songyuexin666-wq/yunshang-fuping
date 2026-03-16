<template>
  <div class="home">
    <div class="main-content">
      <!-- 大图展示 -->
      <div class="hero-image">
        <img src="/datu.jpg" alt="云上阜平" class="hero-img">
      </div>

      <!-- 操作提示 -->
      <div class="operation-tip">
        <h3>📌 操作提示</h3>
        <p>欢迎来到云上阜平项目展示平台！您可以浏览项目介绍、团队介绍，查看红色记忆·沉浸馆、绿水青山·漫游廊和地质奇观·科普窗。每个页面都会自动记录您的访问次数。</p>
      </div>


      <!-- 项目介绍 -->
      <div class="card">
        <h2 class="card-title">项目介绍</h2>
        <div class="card-content">
          <p><strong>项目名称：</strong>云上阜平</p>
          <p><strong>项目背景：</strong>当前乡村旅游虽然火热，但推广与现实存在脱节，游客信息不对称，严重影响体验质量和行业口碑。</p>
          <p><strong>解决方案：</strong>本项目运用<strong>三维重建技术</strong>，采集乡村景区全方位数据（地形地貌、特色建筑、民俗场景），构建1:1高精度三维实景模型。</p>
          <p><strong>核心功能：</strong>平台集成<strong>智能导航、路线规划、景点讲解</strong>等功能，游客可通过终端沉浸式预览整个景区，获得准确的游览信息。</p>
          <p><strong>项目价值：</strong>帮助景区优化运营，破解"线上火爆，线下失望"的困境，用数字技术建立乡村文旅与游客之间的信任，推动乡村旅游高质量发展。</p>
          <p>本平台通过图片、视频和3D模型等多种形式，为您呈现一个立体、生动的乡村文旅体验。</p>
        </div>
      </div>

      <!-- 团队介绍 -->
      <div class="card">
        <h2 class="card-title">团队介绍</h2>
        <div class="card-content">
          <p>我们的团队由一群致力于推动乡村旅游高质量发展的专业人士组成，专注于运用3D重建技术解决乡村旅游信息不对称问题。</p>
          <p><strong>团队使命：</strong>通过三维重建技术和数字化手段，构建真实可信的乡村文旅展示平台，建立游客与景区之间的信任桥梁。</p>
          <p><strong>团队愿景：</strong>成为最专业、最全面的乡村文旅数字化展示平台，推动乡村旅游产业高质量发展。</p>
          <p><strong>项目类别：</strong>红旅赛道 · 红旅创意组</p>
          <p><strong>核心成员：</strong></p>
          <ul style="margin-left: 20px; margin-top: 10px;">
            <li>项目负责人：负责整体规划与协调</li>
            <li>技术开发：负责平台开发与3D重建技术实现</li>
            <li>内容策划：负责资源收集与内容编辑</li>
            <li>3D建模：负责高精度三维实景模型制作与优化</li>
            <li>社会实践：负责实地调研与数据采集</li>
          </ul>
          <p style="margin-top: 20px;"><strong>项目成果：</strong></p>
          <ul style="margin-left: 20px; margin-top: 10px;">
            <li>入选中国青年报第十届大学生暑期社会实践成果展示</li>
            <li>荣获中国矿业大学（北京）2024年优秀社会实践报告二等奖</li>
            <li>荣获中国矿业大学（北京）2025年优秀社会实践报告特等奖</li>
            <li>获得大学云报、大学新闻网、和庆新闻网、中国教育网等媒体报道</li>
            <li>全网浏览量超8万次</li>
          </ul>
        </div>
      </div>

      <!-- 浏览量显示 -->
      <div class="card">
        <h2 class="card-title">访问统计</h2>
        <div class="card-content">
          <p>本页面访问量：<span class="view-count"><strong>{{ viewCount }}</strong> 次</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getViewCount, incrementViewCount } from '../utils/viewCounter'

export default {
  name: 'Home',
  data() {
    return {
      viewCount: 0
    }
  },
  mounted() {
    // 增加浏览量
    this.viewCount = incrementViewCount('Home')
  }
}
</script>

