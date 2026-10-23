import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../../../components/ui/button'

const slides = [
  {
    title: <>Tout savoir sur le Secteur Aval des Hydrocarbures</>,
    description: "Le secteur aval des hydrocarbures regroupe l'importation, le raffinage, l'exportation et la réexportation, le stockage, le transport, la distribution et la commercialisation des produits pétroliers. La CRSE veille à la régulation des prix, à la qualité des produits et à la sécurisation de l'approvisionnement du marché national.",
    image: 'https://www.crse.sn/wp-content/uploads/2026/03/HYDROCARBURES.png',
    link: '/hydrocarbures/acteurs',
    label: 'Secteur aval des hydrocarbures',
  },
  {
    title: <>Tout savoir sur le secteur de l'électricité</>,
    description: "Le secteur électrique sénégalais est structuré autour de l'opérateur Senelec, des producteurs privés indépendants (IPP) et des opérateurs d'électrification rurale. L'objectif national est l'accès universel à l'électricité à l'horizon 2029.",
    image: 'https://www.crse.sn/wp-content/uploads/2025/09/weep-crse-electricte-2.jpg',
    link: '/electricite/acteurs',
    label: "Secteur de l'électricité",
  },
  {
    title: <>Tout savoir sur les Segments Intermédiaire & Aval Gaziers</>,
    description: "Ce secteur en pleine expansion concerne l'agrégation, la transformation, le stockage, l'importation, l'exportation, ainsi que le transport, la distribution et la fourniture de gaz naturel sous forme gazeuse ou liquide, y compris le gaz naturel liquéfié et comprimé.",
    image: 'https://www.crse.sn/wp-content/uploads/2026/03/Terminal-Gazier-Port-scaled.jpeg',
    link: '/gaz/acteurs',
    label: 'Secteur gazier',
  },
]

const INTERVAL = 6500

export function HeroBannerSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [prevSlide, setPrevSlide] = useState<number | null>(null)
  const [animating, setAnimating] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const prefersReduced = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const startProgress = () => {
    setProgress(0)
    if (progressRef.current) clearInterval(progressRef.current)
    if (prefersReduced) return
    const step = 100 / (INTERVAL / 50)
    progressRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(progressRef.current!); return 100 }
        return p + step
      })
    }, 50)
  }

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      goToSlide((prev) => (prev + 1) % slides.length)
    }, INTERVAL)
  }

  const goToSlide = (getNext: (current: number) => number) => {
    if (animating) return
    setAnimating(true)
    setActiveSlide(prev => {
      const next = getNext(prev)
      setPrevSlide(prev)
      setTimeout(() => {
        setAnimating(false)
        setPrevSlide(null)
      }, 600)
      return next
    })
    startProgress()
  }

  const showSlide = (index: number) => {
    goToSlide(() => (index + slides.length) % slides.length)
    startTimer()
  }

  useEffect(() => {
    startProgress()
    startTimer()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const slide = slides[activeSlide]
  const prev = prevSlide !== null ? slides[prevSlide] : null

  return (
    <section className="crse-hero" aria-roledescription="carrousel" aria-label="À la une">
      {/* Image précédente (sortante) */}
      {prev && !prefersReduced && (
        <div
          key={`img-prev-${prevSlide}`}
          className="crse-hero-image crse-hero-image--exit"
          style={{ backgroundImage: `url("${prev.image}")` }}
        />
      )}
      {/* Image active (entrante) */}
      <div
        key={`img-${activeSlide}`}
        className={`crse-hero-image crse-hero-image--enter${animating ? ' is-entering' : ''}`}
        style={{ backgroundImage: `url("${slide.image}")` }}
      />
      <div className="crse-hero-overlay" />
      <div className="crse-hero-inner">
        <div
          key={`copy-${activeSlide}`}
          className="crse-hero-copy crse-hero-copy--enter"
          aria-live="polite"
        >
          <p className="crse-hero-kicker">Commission de régulation du secteur de l'énergie</p>
          <h1>{slide.title}</h1>
          <p className="crse-hero-description">{slide.description}</p>
          <Button asChild className="crse-hero-button">
            <Link to={slide.link}>En savoir plus <ArrowRight aria-hidden="true" size={18} /></Link>
          </Button>
        </div>
      </div>
      <div className="crse-hero-controls">
        <button type="button" aria-label="Diapositive précédente" onClick={() => showSlide(activeSlide - 1)}>
          <ArrowLeft aria-hidden="true" size={17} />
        </button>
        <div className="crse-hero-dots" role="group" aria-label="Choisir une diapositive">
          {slides.map((item, index) => (
            <button
              key={item.label}
              type="button"
              aria-label={`Afficher : ${item.label}`}
              aria-current={index === activeSlide ? 'true' : undefined}
              onClick={() => showSlide(index)}
            >
              {index === activeSlide && !prefersReduced && (
                <span
                  className="crse-hero-dot-progress"
                  style={{ width: `${progress}%` }}
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>
        <button type="button" aria-label="Diapositive suivante" onClick={() => showSlide(activeSlide + 1)}>
          <ArrowRight aria-hidden="true" size={17} />
        </button>
      </div>
    </section>
  )
}
