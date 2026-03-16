// Vercel Serverless Function：全网浏览量统计
// 依赖：@vercel/kv，并在 Vercel 控制台配置 KV 集成

const { kv } = require('@vercel/kv')

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204).end()
    return
  }

  res.setHeader('Access-Control-Allow-Origin', '*')

  if (req.method === 'GET') {
    // 可选：返回所有页面的统计汇总
    try {
      const keys = await kv.keys('page:*')
      const result = {}
      for (const key of keys) {
        const count = await kv.get(key)
        const page = key.replace(/^page:/, '')
        result[page] = Number(count || 0)
      }
      res.status(200).json({ ok: true, data: result })
    } catch (e) {
      res.status(500).json({ ok: false, error: 'KV error' })
    }
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method Not Allowed' })
    return
  }

  try {
    const body = req.body || {}
    const page = typeof body.page === 'string' && body.page.trim() ? body.page.trim() : 'unknown'
    const key = `page:${page}`

    // 自增计数
    const newCount = await kv.incr(key)

    res.status(200).json({
      ok: true,
      page,
      count: newCount
    })
  } catch (e) {
    res.status(500).json({ ok: false, error: 'KV error' })
  }
}

