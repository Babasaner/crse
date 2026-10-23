import { Link, useNavigate } from 'react-router-dom'
import { Home, FileText, MessageSquare, Search, ArrowLeft, Zap } from 'lucide-react'

const quickLinks = [
  { label: 'Accueil', to: '/', icon: Home, description: 'Retourner à la page principale' },
  { label: 'Documents', to: '/documents', icon: FileText, description: 'Bibliothèque documentaire officielle' },
  { label: 'Réclamations', to: '/reclamations', icon: MessageSquare, description: 'Déposer une réclamation' },
  { label: 'Recherche', to: '/recherche', icon: Search, description: 'Chercher sur tout le site' },
]

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d2855] via-[#1b3e80] to-[#1e5a9e] flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#55aed0]/10 blur-3xl" />
        <div className="absolute bottom-[-15%] left-[-8%] w-[600px] h-[600px] rounded-full bg-[#55aed0]/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/5" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* CRSE Logo */}
        <div className="mb-10 flex justify-center">
          <Link to="/" className="inline-block opacity-90 hover:opacity-100 transition-opacity">
            <img
              src="https://c.animaapp.com/Cq4P7PgEpKkTCbopMcj5Xg/img/crse-logopng-png.png"
              alt="CRSE"
              className="h-14 object-contain brightness-0 invert"
            />
          </Link>
        </div>

        {/* 404 Large Display */}
        <div className="relative mb-6">
          <p
            className="font-black text-[clamp(120px,20vw,200px)] leading-none text-white/10 select-none absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            404
          </p>
          <div className="relative pt-6 pb-4">
            <div className="inline-flex items-center gap-2.5 bg-[#55aed0]/20 border border-[#55aed0]/30 text-[#7dcbe8] text-[13px] font-semibold rounded-full px-4 py-1.5 mb-6">
              <Zap size={13} />
              <span>Erreur 404 — Page introuvable</span>
            </div>
            <h1 className="font-bold text-[clamp(28px,4vw,52px)] leading-tight text-white mb-4">
              Cette page n'existe pas
              <br />
              <span className="text-[#55aed0]">ou a été déplacée</span>
            </h1>
            <p className="text-white/70 text-[clamp(15px,1.8vw,18px)] max-w-lg mx-auto leading-relaxed">
              Le lien que vous avez suivi est peut-être obsolète, ou la page a été déplacée. Utilisez les liens ci-dessous pour retrouver votre chemin.
            </p>
          </div>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-2xl mx-auto">
          {quickLinks.map(({ label, to, icon: Icon, description }) => (
            <Link
              key={to}
              to={to}
              className="group flex flex-col items-center gap-2.5 rounded-2xl bg-white/8 border border-white/10 hover:bg-white/15 hover:border-white/25 backdrop-blur-sm p-4 transition-all duration-200 text-white"
            >
              <div className="w-10 h-10 rounded-xl bg-[#55aed0]/20 group-hover:bg-[#55aed0]/30 flex items-center justify-center transition-colors">
                <Icon size={18} className="text-[#7dcbe8]" />
              </div>
              <span className="text-[13px] font-bold">{label}</span>
              <span className="text-[11px] text-white/50 text-center leading-snug hidden sm:block">{description}</span>
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/80 text-[14px] font-semibold hover:bg-white/10 transition-all"
          >
            <ArrowLeft size={16} />
            <span>Page précédente</span>
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-[#1b3e80] text-[14px] font-bold hover:bg-white/90 shadow-lg hover:shadow-xl transition-all"
          >
            <Home size={16} />
            <span>Retour à l'accueil</span>
          </Link>
        </div>

        {/* Footer hint */}
        <p className="mt-12 text-white/30 text-[12px]">
          Commission de Régulation du Secteur de l'Énergie · crse.sn
        </p>
      </div>
    </div>
  )
}