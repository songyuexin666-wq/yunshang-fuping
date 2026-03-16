// 全网浏览量统计：调用后端 /api/track 接口

export async function incrementGlobalView(pageName) {
  try {
    const res = await fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page: pageName,
        ts: Date.now()
      })
    })

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    return data
  } catch (e) {
    // 后端不可用时静默失败，不影响前端正常使用
    return null
  }
}

