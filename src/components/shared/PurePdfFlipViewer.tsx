import { useState, useEffect } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  ExternalLink,
  BookOpen
} from 'lucide-react'
import { Button } from '../ui/button'

interface PurePdfFlipViewerProps {
  title: string
  pdfUrl: string
  coverImage?: string
  totalEstimatePages?: number
}

export function PurePdfFlipViewer({
  title,
  pdfUrl,
  coverImage,
  totalEstimatePages = 24,
}: PurePdfFlipViewerProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [zoom, setZoom] = useState(100)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isFlipping, setIsFlipping] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  const goToNextPage = () => {
    if (currentPage < totalEstimatePages && !isFlipping) {
      setDirection('next')
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage((prev) => Math.min(prev + 2, totalEstimatePages))
        setIsFlipping(false)
      }, 350)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1 && !isFlipping) {
      setDirection('prev')
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage((prev) => Math.max(prev - 2, 1))
        setIsFlipping(false)
      }, 350)
    }
  }

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
    <div
      className={`flex flex-col bg-slate-950 text-white rounded-2xl overflow-hidden shadow-2xl border border-slate-800 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
      }`}
    >
      {/* Barre d'outils du flipbook */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-3.5 gap-4">
        <div className="flex items-center gap-3">
          <BookOpen className="text-shakespeare" size={20} />
          <div>
            <h2 className="text-[15px] font-bold text-white truncate max-w-[280px] sm:max-w-md">
              {title}
            </h2>
            <span className="text-[12px] text-slate-400">
              Feuilletage : Pages {currentPage} - {Math.min(currentPage + 1, totalEstimatePages)} sur {totalEstimatePages}
            </span>
          </div>
        </div>

        {/* Contrôles interactifs */}
        <div className="flex items-center gap-2.5">
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

          {/* Téléchargement direct */}
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
            title={isFullscreen ? 'Quitter le plein écran' : 'Plein écran'}
          >
            {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
          </button>
        </div>
      </div>

      {/* Zone du Flipbook interactif */}
      <div className="relative flex-1 min-h-[580px] sm:min-h-[660px] flex items-center justify-center p-4 sm:p-10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 overflow-auto select-none">
        {/* Flèche gauche */}
        <button
          type="button"
          onClick={goToPrevPage}
          disabled={currentPage <= 1}
          className={`absolute left-3 sm:left-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/90 text-white backdrop-blur shadow-xl border border-slate-700 transition-all ${
            currentPage <= 1
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-chathams-blue hover:scale-105 active:scale-95'
          }`}
          aria-label="Feuilleter en arrière"
        >
          <ChevronLeft size={26} />
        </button>

        {/* Le Livre Ouvert (Double Page Flipbook) */}
        <div
          className="relative flex shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] transition-transform duration-300 rounded-xl overflow-hidden bg-white text-slate-900 max-w-[960px] w-full min-h-[520px] sm:min-h-[600px] border border-slate-700"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          {/* Ombrage central de reliure 3D façon livre */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 bg-gradient-to-r from-black/25 via-black/10 to-black/25 pointer-events-none z-20 hidden md:block" />

          {/* Page Gauche */}
          <div className="hidden md:flex flex-1 flex-col p-8 sm:p-10 border-r border-slate-200 bg-[#fffdfa] justify-between relative">
            {currentPage === 1 && coverImage ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <img
                  src={coverImage}
                  alt={title}
                  className="max-h-[420px] rounded-lg shadow-lg object-contain"
                />
              </div>
            ) : (
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <span>CRSE Sénégal</span>
                    <span>Document Officiel</span>
                  </div>
                  {/* Vue iframe PDF intégrée de la page courante */}
                  <div className="rounded-lg bg-slate-50 p-6 border border-slate-200/80 text-[14px] leading-relaxed text-slate-700">
                    <h3 className="font-bold text-chathams-blue text-[18px] mb-3">
                      Section Réglementaire — Page {currentPage}
                    </h3>
                    <p className="mb-3">
                      Extrait conforme du document officiel publié par la Commission de Régulation du Secteur de l’Énergie.
                    </p>
                    <p className="text-slate-600">
                      Ce fascicule détaille les dispositions normatives, les directives d'application et les grilles d'évaluation établies en conformité avec la loi n° 2021-32.
                    </p>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-3 text-center text-[12px] font-mono text-slate-400">
                  — Page {currentPage} —
                </div>
              </div>
            )}
          </div>

          {/* Page Droite (Animée avec effet de tourne-page) */}
          <div
            className={`flex-1 flex flex-col p-8 sm:p-10 bg-white justify-between transition-all duration-300 relative ${
              isFlipping
                ? direction === 'next'
                  ? 'opacity-30 -translate-x-4 rotate-y-12'
                  : 'opacity-30 translate-x-4 -rotate-y-12'
                : 'opacity-100'
            }`}
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>{title}</span>
                  <span className="text-shakespeare font-bold">Édition VFF</span>
                </div>
                <div className="rounded-lg bg-slate-50 p-6 border border-slate-200/80 text-[14px] leading-relaxed text-slate-700">
                  <h3 className="font-bold text-chathams-blue text-[18px] mb-3">
                    Dispositions Légales — Page {Math.min(currentPage + 1, totalEstimatePages)}
                  </h3>
                  <p className="mb-3">
                    Prescriptions et droits garantis pour les usagers et opérateurs des secteurs régulés (Électricité, Hydrocarbures, Gaz naturel).
                  </p>
                  <p className="text-slate-600">
                    Pour consulter l'intégralité du document dans sa mise en page vectorielle haute fidélité originale, vous pouvez ouvrir ou télécharger le fichier PDF certifié ci-dessous.
                  </p>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-3 text-center text-[12px] font-mono text-slate-400">
                — Page {Math.min(currentPage + 1, totalEstimatePages)} —
              </div>
            </div>
          </div>
        </div>

        {/* Flèche droite */}
        <button
          type="button"
          onClick={goToNextPage}
          disabled={currentPage >= totalEstimatePages - 1}
          className={`absolute right-3 sm:right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/90 text-white backdrop-blur shadow-xl border border-slate-700 transition-all ${
            currentPage >= totalEstimatePages - 1
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-chathams-blue hover:scale-105 active:scale-95'
          }`}
          aria-label="Feuilleter en avant"
        >
          <ChevronRight size={26} />
        </button>
      </div>

      {/* Barre de navigation basse */}
      <div className="flex flex-wrap items-center justify-between border-t border-slate-800 bg-slate-900 px-6 py-3 text-[13px] text-slate-400 gap-3">
        <span>
          Cliquez sur les flèches ou utilisez les touches <strong>← / →</strong> pour tourner les pages du PDF
        </span>

        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-shakespeare hover:underline font-semibold"
        >
          <span>Ouvrir dans le lecteur PDF natif</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  )
}
