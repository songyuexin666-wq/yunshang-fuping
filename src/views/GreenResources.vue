<template>
  <div class="green-resources">
    <div class="main-content">
      <div class="operation-tip">
        <h3>📌 操作提示</h3>
        <p>点击图片进入该景点的介绍、导览视频与链接。</p>
      </div>
      <div class="card" style="margin-bottom: 30px;">
        <p>本页面访问量：<span class="view-count"><strong>{{ viewCount }}</strong> 次</span></p>
      </div>

      <template v-for="(section, sIdx) in greenSections" :key="sIdx">
        <h2 class="section-title">{{ section.title }}</h2>
        <div class="item-grid">
          <router-link
            v-for="(item, iIdx) in section.items"
            :key="iIdx"
            :to="'/green-resources/' + item.id"
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
  name: 'GreenResources',
  data() {
    return {
      viewCount: 0,
      greenSections: [
        {
          title: '1. 平石头村',
          items: [
            { id: 'pingshitou-outdoor', title: '平石头村室外风景', image: '/green/pingshitou-outdoor.jpg' },
            { id: 'pingshitou-cunweihui', title: '平石头村村委会', image: '/green/pingshitou-cunweihui.jpg' },
            { id: 'pingshitou-laofangzi', title: '平石头村老房子', image: '/green/pingshitou-laofangzi.jpg' }
          ]
        },
        {
          title: '2. 平石头村民宿',
          items: [
            { id: 'minsu-shanli', title: '平石头村-山里民宿', image: '/green/minsu-shanli.jpg' },
            { id: 'minsu-dachuang', title: '平石头-石屋大床房', image: '/green/minsu-dachuang.jpg' },
            { id: 'minsu-shuangchuang', title: '平石头-石屋双床房', image: '/green/minsu-shuangchuang.jpg' },
            { id: 'minsu-taofang', title: '平石头-石屋套房', image: '/green/minsu-taofang.jpg' },
            { id: 'minsu-xiaoyuan', title: '平石头-石屋小院', image: '/green/minsu-xiaoyuan.jpg' },
            { id: 'minsu-taihang', title: '平石头-太行民宿', image: '/green/minsu-taihang.jpg' }
          ]
        }
      ]
    }
  },
  mounted() {
    this.viewCount = incrementViewCount('GreenResources')
  },
  methods: {
    onImgError(e, title) {
      if (e.target) {
        e.target.onerror = null
        e.target.src = 'https://via.placeholder.com/400x250/22c55e/fff?text=' + encodeURIComponent(title || '')
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
  border-bottom: 2px solid #22c55e;
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
