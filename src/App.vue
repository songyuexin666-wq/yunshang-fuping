<template>
  <div id="app">
    <!-- 顶部品牌区域 -->
    <div class="header-brand">
      <div class="header-brand-container">
        <img src="/logo.jpg" alt="Logo" class="header-logo">
        <router-link to="/" class="header-brand-text">
          云上阜平
        </router-link>
      </div>
    </div>
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="navbar-container">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active">网站首页</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/red-resources" class="nav-link" active-class="active">红色记忆·沉浸馆</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/green-resources" class="nav-link" active-class="active">绿水青山·漫游廊</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/geological-resources" class="nav-link" active-class="active">地质奇观·科普窗</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

