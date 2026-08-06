/**
 * Blog posts. Empty until the real articles land (LinkedIn import pending).
 *
 * Shape of an entry:
 * {
 *   slug: 'meu-artigo',
 *   date: { pt: 'Ago 2026', en: 'Aug 2026' },
 *   minutes: 8,
 *   featured: true,
 *   title: { pt: '...', en: '...' },
 *   body: {
 *     pt: [ { type: 'lede', text: '...' }, { type: 'p', text: '...' },
 *           { type: 'h2', text: '...' }, { type: 'code', lines: [['k', ' ...']] } ],
 *     en: [ ... ],
 *   },
 * }
 */
export const posts = []

export const getPost = (slug) => posts.find((p) => p.slug === slug)
export const featuredPosts = posts.filter((p) => p.featured)
