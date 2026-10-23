import { useState, useEffect } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  BookOpen,
  ExternalLink
} from 'lucide-react'
import { Button } from '../ui/button'

export interface BookPage {
  pageNumber: number
  title: string
  content: React.ReactNode
}

interface PdfBookViewerProps {
  title: string
  pdfUrl: string
  pages: BookPage[]
  coverImage?: string
}

export function PdfBookViewer({ title, pdfUrl, pages, coverImage }: PdfBookViewerProps) {
  const [currentPage, setCurrentPage] = useState(0) // 0 is cover or intro
  const [zoom, setZoom] = useState(100)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next')

  const totalPages = pages.length

  const goToNextPage = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setFlipDirection('next')
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1)
        setIsFlipping(false)
      }, 350)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection('prev')
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1)
        setIsFlipping(false)
      }, 350)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNextPage()
      if (e.key === 'ArrowLeft') goToPrevPage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentPage, isFlipping])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true))
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false))
    }
  }

  return (
    <div className={`flex flex-col bg-slate-900 text-white rounded-2xl overflow-hidden shadow-2xl border border-slate-700 ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}>
      {/* Barre d'outils du visualiseur */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-3.5 gap-4">
        <div className="flex items-center gap-3">
          <BookOpen className="text-shakespeare" size={20} />
          <div>
            <h2 className="text-[15px] font-bold text-white truncate max-w-[280px] sm:max-w-md">
              {title}
            </h2>
            <span className="text-[12px] text-slate-400">
              Page {currentPage + 1} sur {totalPages}
            </span>
          </div>
        </div>

        {/* Contrôles de navigation et d'affichage */}
        <div className="flex items-center gap-2">
          {/* Zoom */}
          <div className="hidden sm:flex items-center gap-1 border-r border-slate-800 pr-3 mr-1">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(80, z - 10))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Zoom arrière"
            >
              <ZoomOut size={16} />
            </button>
            <span className="text-[12px] font-mono text-slate-300 w-12 text-center">
              {zoom}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(130, z + 10))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Zoom avant"
            >
              <ZoomIn size={16} />
            </button>
          </div>

          {/* Téléchargement officiel */}
          <Button
            asChild
            size="sm"
            className="rounded-full bg-shakespeare text-white hover:bg-shakespeare/90 text-[12px] gap-1.5 h-8 px-3"
          >
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" download>
              <Download size={13} />
              <span className="hidden sm:inline">Télécharger PDF</span>
            </a>
          </Button>

          {/* Plein écran */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isFullscreen ? 'Quitter le plein écran' : 'Mode plein écran'}
          >
            {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
          </button>
        </div>
      </div>

      {/* Scène du livre interactif (Flipbook container) */}
      <div className="relative flex-1 min-h-[560px] sm:min-h-[640px] flex items-center justify-center p-4 sm:p-8 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 overflow-auto select-none">
        {/* Flèche gauche */}
        <button
          type="button"
          onClick={goToPrevPage}
          disabled={currentPage === 0}
          className={`absolute left-3 sm:left-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/80 text-white backdrop-blur shadow-lg border border-slate-700/80 transition-all ${
            currentPage === 0
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-chathams-blue hover:scale-105 active:scale-95'
          }`}
          aria-label="Page précédente"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Le Livre Ouvert (Double Page ou Page unique selon zoom) */}
        <div
          className="relative flex shadow-2xl transition-transform duration-300 rounded-xl overflow-hidden bg-white text-slate-900 max-w-[950px] w-full min-h-[520px] sm:min-h-[580px] border border-slate-300"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          {/* Reliure centrale (effet 3D de pliure de livre) */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/15 via-black/5 to-black/15 pointer-events-none z-10 hidden md:block" />

          {/* Page de Gauche (ou couverture) */}
          <div className="hidden md:flex flex-1 flex-col p-8 sm:p-10 border-r border-slate-200 bg-gradient-to-r from-amber-50/20 to-white justify-between">
            {currentPage === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt={title}
                    className="max-h-[360px] rounded-lg shadow-md object-cover mb-4"
                  />
                ) : (
                  <div className="rounded-2xl bg-blue-50 p-6 text-chathams-blue mb-4">
                    <BookOpen size={48} />
                  </div>
                )}
                <span className="text-[11px] font-bold tracking-widest text-shakespeare uppercase">
                  Commission de Régulation du Secteur de l’Énergie
                </span>
                <h3 className="text-[22px] font-bold text-chathams-blue mt-1">
                  {title}
                </h3>
                <span className="text-[13px] text-slate-400 mt-2 block">
                  Édition officielle certifiée
                </span>
              </div>
            ) : (
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-4 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                    <span>CRSE Sénégal</span>
                    <span>Document de référence</span>
                  </div>
                  <h4 className="text-[18px] font-bold text-chathams-blue mb-3">
                    {pages[currentPage]?.title}
                  </h4>
                  <div className="text-[14px] leading-relaxed text-slate-700">
                    {pages[currentPage]?.content}
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-3 text-center text-[12px] text-slate-400 font-mono">
                  — {currentPage * 2} —
                </div>
              </div>
            )}
          </div>

          {/* Page de Droite (animée lors du tourne-page) */}
          <div
            className={`flex-1 flex flex-col p-8 sm:p-10 bg-white justify-between transition-all duration-300 ${
              isFlipping
                ? flipDirection === 'next'
                  ? 'opacity-40 -translate-x-3 rotate-y-6'
                  : 'opacity-40 translate-x-3 -rotate-y-6'
                : 'opacity-100'
            }`}
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-4 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                  <span>{title}</span>
                  <span className="text-shakespeare font-bold">Édition 2025</span>
                </div>
                <h4 className="text-[18px] font-bold text-chathams-blue mb-3">
                  {pages[Math.min(currentPage + 1, totalPages - 1)]?.title}
                </h4>
                <div className="text-[14px] leading-relaxed text-slate-700">
                  {pages[Math.min(currentPage + 1, totalPages - 1)]?.content}
                </div>
              </div>
              <div className="border-t border-slate-100 pt-3 text-center text-[12px] text-slate-400 font-mono">
                — {currentPage * 2 + 1} —
              </div>
            </div>
          </div>
        </div>

        {/* Flèche droite */}
        <button
          type="button"
          onClick={goToNextPage}
          disabled={currentPage >= totalPages - 1}
          className={`absolute right-3 sm:right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/80 text-white backdrop-blur shadow-lg border border-slate-700/80 transition-all ${
            currentPage >= totalPages - 1
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-chathams-blue hover:scale-105 active:scale-95'
          }`}
          aria-label="Page suivante"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Barre de navigation basse & raccourcis */}
      <div className="flex flex-wrap items-center justify-between border-t border-slate-800 bg-slate-950 px-6 py-3 text-[13px] text-slate-400 gap-3">
        <span className="hidden sm:inline">
          Astuce : utilisez les touches <strong>←</strong> et <strong>→</strong> de votre clavier pour feuilleter
        </span>

        {/* Sélecteur direct de page */}
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span>Aller au chapitre :</span>
          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            className="rounded-lg bg-slate-800 border border-slate-700 px-3 py-1 text-white text-[12px] focus:outline-none"
          >
            {pages.map((p, idx) => (
              <option key={idx} value={idx}>
                {p.title} (p. {idx + 1})
              </option>
            ))}
          </select>
        </div>

        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-shakespeare hover:underline font-semibold"
        >
          <span>Ouvrir le PDF original</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  )
}
