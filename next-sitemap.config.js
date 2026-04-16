/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://kirans-fitness-club.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin', '/admin/*', '/dashboard', '/dashboard/*', '/api/*', '/login'],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/dashboard', '/api', '/login'],
      },
      // Allow AI crawlers
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'DuckDuckBot', allow: '/' },
    ],
  },
  transform: async (config, path) => {
    // Higher priority for key pages
    const priorityMap: Record<string, number> = {
      '/': 1.0,
      '/services': 0.9,
      '/about': 0.8,
      '/contact': 0.8,
      '/gym-in-anjananagar': 0.9,
      '/gym-near-magadi-road': 0.9,
      '/gym-near-bath-road': 0.9,
      '/blog': 0.8,
      '/events': 0.8,
    };
    return {
      loc: path,
      changefreq: path === '/' ? 'daily' : 'weekly',
      priority: priorityMap[path] ?? 0.6,
      lastmod: new Date().toISOString(),
    };
  },
}
