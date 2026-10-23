import { useEffect, useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'

export function SiteLayout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  }, [])

  useLayoutEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    const frame = window.requestAnimationFrame(() => {
      if (!hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        return
      }

      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 120
        window.scrollTo({ top, left: 0, behavior: 'instant' })
      }
      else window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [pathname, hash])

  return (
    <>
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <SiteHeader />
      <main id="contenu"><Outlet /></main>
      <SiteFooter />
    </>
  )
}