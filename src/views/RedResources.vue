<template>
  <div class="red-resources">
    <div class="main-content">
      <div class="operation-tip">
        <h3>📌 操作提示</h3>
        <p>点击图片进入该景点的介绍、导览视频与链接。</p>
      </div>
      <div class="card" style="margin-bottom: 30px;">
        <p>本页面访问量：<span class="view-count"><strong>{{ viewCount }}</strong> 次</span></p>
      </div>

      <template v-for="(section, sIdx) in redSections" :key="sIdx">
        <h2 class="section-title">{{ section.title }}</h2>
        <div class="item-grid">
          <router-link
            v-for="(item, iIdx) in section.items"
            :key="iIdx"
            :to="'/red-resources/' + item.id"
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
  name: 'RedResources',
  data() {
    return {
      viewCount: 0,
      redSections: [
        {
          title: '1. 晋察冀边区革命纪念馆',
          items: [
            { id: 'jinchaji-outdoor', title: '晋察冀纪念馆室外', image: '/red/jinchaji-outdoor.jpg' },
            { id: 'jinchaji-indoor', title: '晋察冀纪念馆室内', image: '/red/jinchaji-indoor.jpg' }
          ]
        },
        {
          title: '2. 骆驼湾村',
          items: [
            { id: 'luotuowan-outdoor', title: '骆驼湾室外', image: '/red/luotuowan-outdoor.jpg' },
            { id: 'luotuowan-1haoyuan', title: '骆驼湾1号院', image: '/red/luotuowan-1haoyuan.jpg' },
            { id: 'luotuowan-laofangzi', title: '过去的日子', image: '/red/luotuowan-laofangzi.jpg' }
          ]
        },
        {
          title: '3. 顾家台村',
          items: [
            { id: 'gujiatai-outdoor', title: '顾家台室外', image: '/red/gujiatai-outdoor.jpg' },
            { id: 'gujiatai-meeting', title: '顾家台会议室', image: '/red/gujiatai-meeting.jpg' },
            { id: 'gujiatai-chejian', title: '帮扶车间', image: '/red/gujiatai-chejian.jpg' }
          ]
        }
      ]
    }
  },
  mounted() {
    this.viewCount = incrementViewCount('RedResources')
  },
  methods: {
    onImgError(e, title) {
      if (e.target) {
        e.target.onerror = null
        e.target.src = 'https://via.placeholder.com/400x250/dc2626/fff?text=' + encodeURIComponent(title || '')
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
  border-bottom: 2px solid #dc2626;
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
