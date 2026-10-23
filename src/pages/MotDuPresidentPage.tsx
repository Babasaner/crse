import { Link } from 'react-router-dom'
import { ArrowLeft, Quote } from 'lucide-react'
import { PageBanner } from '../components/shared/PageBanner'
import { Button } from '../components/ui/button'

const presidentPhoto = 'https://www.crse.sn/wp-content/uploads/2026/04/NEWTOF-PRESI-e1777451517261.jpeg'

export function MotDuPresidentPage() {
  return (
    <>
      <PageBanner
        eyebrow="Institution"
        title="Mot du Président"
        description="Le message du Président de la Commission de Régulation du Secteur de l’Énergie, M. Ibrahima NIANE, sur les ambitions et les orientations de la régulation au Sénégal."
      />

      <main className="mx-auto w-full max-w-[1440px] px-6 py-14 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_minmax(0,1fr)] gap-12 items-start">
          {/* Colonne gauche : Photo et encadré officiel */}
          <aside className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="overflow-hidden rounded-xl bg-slate-100 aspect-[4/5] shadow-inner mb-4">
                <img
                  src={presidentPhoto}
                  alt="M. Ibrahima NIANE, Président de la CRSE"
                  className="h-full w-full object-cover object-top hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="text-center pt-2 pb-1">
                <h2 className="text-[20px] font-bold text-chathams-blue">
                  M. Ibrahima NIANE
                </h2>
                <p className="text-[14px] font-semibold text-shakespeare mt-0.5">
                  Président de la CRSE
                </p>
                <span className="block text-[12px] text-slate-400 mt-1 uppercase tracking-wider">
                  Commission de Régulation du Secteur de l'Énergie
                </span>
              </div>
            </div>

            {/* Raccourcis de contact et institution */}
            <div className="rounded-2xl bg-slate-50 p-6 border border-slate-200 text-[14px] space-y-3">
              <h3 className="font-bold text-chathams-blue text-[15px] border-b border-slate-200 pb-2">
                Cabinet du Président
              </h3>
              <p className="text-slate-600 text-[13px] leading-relaxed">
                Le Président veille à l’application des décisions prises par le Collège de Régulation et représente la Commission auprès des pouvoirs publics et partenaires.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <Button asChild variant="outline" size="sm" className="rounded-full justify-start text-[13px]">
                  <Link to="/organisation">
                    <span>Voir l'organigramme de la Commission</span>
                  </Link>
                </Button>
                <Button asChild size="sm" className="rounded-full bg-chathams-blue text-white justify-start text-[13px]">
                  <Link to="/presentation">
                    <span>Présentation de la CRSE</span>
                  </Link>
                </Button>
              </div>
            </div>
          </aside>

          {/* Colonne droite : Texte intégral du mot du président */}
          <article className="rounded-2xl border border-slate-200 bg-white p-8 lg:p-12 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1 text-[12px] font-bold text-chathams-blue uppercase tracking-wider mb-4">
              <Quote size={14} className="text-shakespeare" />
              <span>Message officiel</span>
            </div>

            <h1 className="text-[clamp(24px,2.8vw,36px)] font-bold text-chathams-blue leading-snug mb-8">
              Bienvenue sur le nouveau site web de la Commission de Régulation du Secteur de l’Energie (CRSE)
            </h1>

            <div className="space-y-6 text-[17px] leading-relaxed text-slate-700">
              <p className="text-[19px] font-semibold text-chathams-blue leading-normal">
                Cette plateforme s’inscrit pleinement dans la dynamique de renouveau engagée par la CRSE afin d’accompagner les profondes mutations que connaît le secteur énergétique sénégalais.
              </p>

              <p>
                Dans ce contexte en constante évolution, la CRSE renforce son rôle de régulateur pour préserver l’équilibre économique et financier du secteur, promouvoir une concurrence saine et loyale et, surtout, <strong>garantir la protection des droits des consommateurs</strong>. Notre action vise ainsi à assurer la disponibilité, la qualité et la fiabilité du service public de l’énergie au bénéfice de tous.
              </p>

              <div className="my-8 rounded-2xl bg-gradient-to-r from-blue-50 via-white to-blue-50/50 p-6 border-l-4 border-chathams-blue text-chathams-blue shadow-sm">
                <p className="text-[18px] font-bold italic leading-relaxed">
                  « Le lancement de ce nouveau site reflète notre volonté d’inscrire la transparence, l’accessibilité et la proximité au cœur de notre action. »
                </p>
              </div>

              <p>
                Conçu comme un outil moderne, intuitif et interactif, il permet aux usagers, aux opérateurs et à l’ensemble de nos partenaires d’accéder facilement à l’information, de mieux comprendre nos missions et de suivre l’actualité de la régulation du secteur de l’énergie.
              </p>

              <p className="font-semibold text-chathams-blue">
                Je vous invite à parcourir ce site et à vous approprier ses contenus.
              </p>
            </div>

            {/* Signature officielle */}
            <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-[19px] font-bold text-chathams-blue">
                  M. Ibrahima NIANE
                </p>
                <p className="text-[14px] font-semibold text-slate-500">
                  Président de la CRSE
                </p>
              </div>

              <Button asChild variant="outline" className="rounded-full gap-2">
                <Link to="/">
                  <ArrowLeft size={16} />
                  <span>Retour à l'accueil</span>
                </Link>
              </Button>
            </div>
          </article>
        </div>
      </main>
    </>
  )
}
