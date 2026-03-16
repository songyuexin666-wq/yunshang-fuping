// 浏览量记录工具函数

// 获取页面浏览量
export function getViewCount(pageName) {
  const count = localStorage.getItem(`view_${pageName}`) || '0'
  return parseInt(count)
}

// 增加浏览量
export function incrementViewCount(pageName) {
  const current = getViewCount(pageName)
  localStorage.setItem(`view_${pageName}`, String(current + 1))
  return current + 1
}

// 获取所有页面浏览量
export function getAllViewCounts() {
  const pages = ['Home', 'RedResources', 'GreenResources', 'GeologicalResources']
  const counts = {}
  pages.forEach(page => {
    counts[page] = getViewCount(page)
  })
  return counts
}





