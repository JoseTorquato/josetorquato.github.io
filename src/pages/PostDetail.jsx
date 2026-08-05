import { Link, useParams } from 'react-router-dom'
import NotFound from './NotFound.jsx'
import { useT } from '../i18n.jsx'
import { ui } from '../copy.js'
import { getPost } from '../data/posts.js'

function Block({ block }) {
  if (block.type === 'h2') return <h2 className="article-h2">{block.text}</h2>
  if (block.type === 'lede') return <p className="article-lede">{block.text}</p>
  if (block.type === 'code') {
    return (
      <pre className="code-card">
        <code>
          {block.lines.map(([key, rest]) => (
            <span key={key}>
              <span className="signal">{key}</span>
              <span className="dim">{rest}</span>
              {'\n'}
            </span>
          ))}
        </code>
      </pre>
    )
  }
  return <p className="article-p">{block.text}</p>
}

export default function PostDetail() {
  const { slug } = useParams()
  const t = useT()
  const post = getPost(slug)

  if (!post) return <NotFound />

  return (
    <div className="page">
      <div className="back">
        <Link to="/blog">{t(ui.backToBlog)}</Link>
      </div>
      <article className="article">
        <p className="row-meta">
          {t(post.date)}&nbsp;&nbsp;·&nbsp;&nbsp;{post.minutes} {t(ui.minutes)}
        </p>
        <h1 className="article-title">{t(post.title)}</h1>
        {t(post.body).map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </article>
    </div>
  )
}
