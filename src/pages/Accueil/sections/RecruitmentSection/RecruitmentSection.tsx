import { Link } from 'react-router-dom'
import { Briefcase, ArrowRight, UserPlus, CheckCircle2 } from 'lucide-react'

export const RecruitmentSection = (): JSX.Element => {
  return (
    <section className="w-full py-16 sm:py-20 bg-white">
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-12 px-6 lg:px-12 lg:grid-cols-2">
        {/* Visuel avec badges institutionnels */}
        <div className="relative overflow-hidden rounded-3xl shadow-xl aspect-[16/10] bg-slate-900 group">
          <img
            src="https://c.animaapp.com/Cq4P7PgEpKkTCbopMcj5Xg/img/recrutement-jpg.png"
            alt="Équipe CRSE Recrutement"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[13px] font-bold tracking-wide">Opportunités de Carrière</span>
            </div>
            <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[12px] font-semibold">
              Stages & Postes
            </span>
          </div>
        </div>

        {/* Contenu textuel */}
        <div className="flex flex-col items-start">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-[12px] font-bold text-chathams-blue mb-4">
            <Briefcase size={16} />
            <span>Rejoignez la Régulation</span>
          </div>

          <h2 className="text-[32px] sm:text-[40px] font-extrabold text-chathams-blue leading-tight">
            Recrutement
          </h2>

          <p className="mt-5 text-[16px] sm:text-[18px] text-slate-600 leading-relaxed max-w-xl">
            Nous vous invitons à consulter nos offres d’emploi et de stages les plus récentes.
            <br className="hidden sm:inline" />
            {' '}Vous avez également la possibilité de nous soumettre une candidature spontanée en vue d’une collaboration au sein de notre institution.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-[14px] text-slate-700">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-shakespeare" />
              <span>Environnement d’expertise de haut niveau</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-shakespeare" />
              <span>Stages d’immersion professionnelle</span>
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/recrutement"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-chathams-blue px-8 py-4 text-[16px] font-bold text-white shadow-md hover:bg-blue-900 transition-all hover:gap-4"
            >
              <span>Consulter les offres</span>
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/recrutement"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 hover:bg-slate-200 px-6 py-4 text-[15px] font-semibold text-slate-700 transition-colors"
            >
              <UserPlus size={18} />
              <span>Candidature spontanée</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
