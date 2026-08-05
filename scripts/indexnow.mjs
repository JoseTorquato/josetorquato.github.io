/**
 * Ping IndexNow (api.indexnow.org) with every URL in the production sitemap,
 * so Bing & friends re-crawl right after a deploy instead of waiting.
 * Runs in CI after the Pages deploy succeeds (key file must already be live).
 * The key is public by design — it only authorizes pings for this host.
 */
const KEY = '4b6117673230fcaeaa7db4ba7880c4e4'
const SITE = 'https://josetorquato.dev'

const res = await fetch(`${SITE}/sitemap.xml`)
if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`)
const xml = await res.text()
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (!urls.length) throw new Error('no URLs found in sitemap')

const ping = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: 'josetorquato.dev',
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList: urls,
  }),
})
console.log(`indexnow: ${ping.status} ${ping.statusText} — ${urls.length} URLs submitted`)
if (ping.status !== 200 && ping.status !== 202) process.exit(1)
