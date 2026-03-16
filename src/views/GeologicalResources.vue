<template>
  <div class="geological-resources">
    <div class="main-content">
      <div class="operation-tip">
        <h3>📌 操作提示</h3>
        <p>点击图片进入该景点的介绍、导览视频与链接。</p>
      </div>
      <div class="card" style="margin-bottom: 30px;">
        <p>本页面访问量：<span class="view-count"><strong>{{ viewCount }}</strong> 次</span></p>
      </div>

      <template v-for="(section, sIdx) in geoSections" :key="sIdx">
        <h2 class="section-title">{{ section.title }}</h2>
        <div class="item-grid">
          <router-link
            v-for="(item, iIdx) in section.items"
            :key="iIdx"
            :to="'/geological-resources/' + item.id"
            class="item-card"
          >
            <div class="item-image-wrap">
              <img :src="item.image" :alt="item.title" @error="onImgError($event, item.title)">
              <div class="item-overlay">
                <span class="item-overlay-text">{{ item.title }}</span>
                <span class="item-overlay-link">查看详情 →</span>
              </div>
            </div>
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { incrementViewCount } from '../utils/viewCounter'

export default {
  name: 'GeologicalResources',
  data() {
    return {
      viewCount: 0,
      geoSections: [
        {
          title: '1. 天生桥室外',
          items: [
            { id: 'tianshengqiao-erpu', title: '天生桥门口到二瀑', image: '/geological/tianshengqiao-erpu.jpg' },
            { id: 'tianshengqiao-xiaogouzao1', title: '天生桥小构造1', image: '/geological/tianshengqiao-xiaogouzao1.jpg' },
            { id: 'tianshengqiao-xiaogouzao2', title: '天生桥小构造2', image: '/geological/tianshengqiao-xiaogouzao2.jpg' },
            { id: 'tianshengqiao-xiaogouzao3', title: '天生桥小构造3', image: '/geological/tianshengqiao-xiaogouzao3.jpg' },
            { id: 'tianshengqiao-xiaogouzao4', title: '天生桥小构造4', image: '/geological/tianshengqiao-xiaogouzao4.jpg' }
          ]
        },
        {
          title: '2. 地质博物馆',
          items: [
            { id: 'bowuguan-tunnel', title: '地质博物馆隧道', image: '/geological/bowuguan-tunnel.jpg' }
          ]
        }
      ]
    }
  },
  mounted() {
    this.viewCount = incrementViewCount('GeologicalResources')
  },
  methods: {
    onImgError(e, title) {
      if (e.target) {
        e.target.onerror = null
        e.target.src = 'https://via.placeholder.com/400x250/0ea5e9/fff?text=' + encodeURIComponent(title || '')
      }
    }
  }
}
</script>

<style scoped>
.section-title {
  font-size: 22px;
  color: #333;
  margin: 36px 0 20px;
  padding-bottom: 8px;
  border-bottom: 2px solid #0ea5e9;
}
.section-title:first-of-type { margin-top: 0; }
.item-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
.item-card {
  display: block;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  border: 1px solid #eee;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
}
.item-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
.item-image-wrap {
  width: 100%;
  aspect-ratio: 16/10;
  overflow: hidden;
  background: #f5f5f5;
  position: relative;
}
.item-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.item-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s;
}
.item-card:hover .item-overlay { opacity: 1; }
.item-overlay-text {
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  padding: 0 12px;
}
.item-overlay-link {
  color: #fff;
  font-size: 14px;
}
</style>
