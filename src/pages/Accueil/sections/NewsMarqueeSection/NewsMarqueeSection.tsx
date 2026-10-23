import { Link } from 'react-router-dom'
import type { WPPost } from '../../../../lib/wordpress'
import { formatWPDate, stripHtml } from '../../../../lib/wordpress'

export function NewsMarqueeSection({ posts }: { posts: WPPost[] }) {
  const items = [...posts, ...posts]

  return (
    <div className="crse-marquee-bar" aria-label="Dernières actualités" role="marquee">
      <span className="crse-marquee-label" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
        Actualités
      </span>
      <div className="crse-marquee-track-wrapper" aria-live="off">
        <ul className="crse-marquee-track animate-marquee" aria-hidden="true">
          {items.map((post, index) => (
            <li key={`${post.id}-${index}`} className="crse-marquee-item">
              <Link to={`/actualites/${post.slug}`} tabIndex={-1}>
                <span className="crse-marquee-dot" aria-hidden="true">●</span>
                {stripHtml(post.title.rendered)}
                <span className="crse-marquee-date">{formatWPDate(post.date)}</span>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="crse-marquee-track crse-marquee-accessible">
          {posts.slice(0, 4).map((post) => (
            <li key={post.id} className="crse-marquee-item">
              <Link to={`/actualites/${post.slug}`}>
                <span className="crse-marquee-dot" aria-hidden="true">●</span>
                {stripHtml(post.title.rendered)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}