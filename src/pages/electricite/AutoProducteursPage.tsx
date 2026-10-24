import { Link } from 'react-router-dom'
import {
  Zap,
  ArrowLeft,
  Factory,
} from 'lucide-react'
import { PageBanner } from '../../components/shared/PageBanner'
import { Button } from '../../components/ui/button'

const sampleAutoProducteurs = [
  {
    nom: 'Dangote Industries Limited',
    secteur: 'Cimenterie & Industrie Lourde',
    localisation: 'Pout, Région de Thiès',
    technologie: 'Centrale thermique & récupération de chaleur',
  },
  {
    nom: 'Metal Sen',
    secteur: 'Métallurgie & Sidérurgie',
    localisation: 'Sébikotane, Région de Dakar',
    technologie: 'Autoproduction industrielle dédiée',
  },
  {
    nom: 'Sosenap & IBS',
    secteur: 'Industrie & Matériaux',
    localisation: 'Zone industrielle de Dakar',
    technologie: 'Groupes autonomes & solaire intégré',
  },
  {
    nom: 'Nestlé Sénégal',
    secteur: 'Agroalimentaire',
    localisation: 'Dakar',
    technologie: 'Installation solaire photovoltaïque sur toiture',
  },
  {
    nom: 'Sen Eau',
    secteur: 'Distribution d’Eau & Pompage',
    localisation: 'Installations régionales de pompage',
    technologie: 'Solaire & groupes de secours',
  },
  {
    nom: 'Sonatel (Projet Solenne)',
    secteur: 'Télécommunications & Numérique',
    localisation: 'Sites techniques et Data Centers',
    technologie: 'Centrale solaire photovoltaïque hybride',
  },
]

export function AutoProducteursPage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <PageBanner
        eyebrow="Secteur Électricité · Acteur Opérationnel"
        title="Auto-producteurs d’Énergie Électrique"
        description="Régime juridique, obligations techniques et modalités de vente du surplus de production électrique pour les personnes physiques et morales au Sénégal."
      />

      <main className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-12">
        {/* Navigation retour & En-tête */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">
              Régime de l'Autoproduction
            </span>
            <h2 className="text-[26px] sm:text-[32px] font-extrabold text-chathams-blue mt-1">
              Cadre Opératoire des Auto-producteurs
            </h2>
          </div>

          <Button asChild variant="outline" className="rounded-full gap-2 border-slate-300">
            <Link to="/electricite">
              <ArrowLeft size={16} />
              <span>Retour au Secteur Électricité</span>
            </Link>
          </Button>
        </div>

        {/* Définition officielle */}
        <div className="rounded-3xl bg-white p-8 sm:p-10 shadow-sm border border-slate-200 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-1.5 text-[12px] font-bold text-purple-800 mb-4">
            <Zap size={16} />
            <span>Définition Légale</span>
          </div>

          <h3 className="text-[22px] sm:text-[26px] font-bold text-slate-900 leading-snug">
            Qu'est-ce qu'un Auto-producteur au Sénégal ?
          </h3>

          <div className="mt-4 p-6 rounded-2xl bg-gradient-to-r from-purple-50 via-white to-blue-50/50 border-l-4 border-purple-600">
            <p className="text-[17px] sm:text-[18px] text-slate-800 font-medium leading-relaxed italic">
              « Toute personne physique ou morale qui produit de l’énergie électrique principalement pour un usage personnel en vue de satisfaire ses besoins et qui peut vendre le surplus de production conformément à la réglementation en vigueur. »
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-[15px] text-slate-600 leading-relaxed">
            <div>
              <h4 className="text-[16px] font-bold text-chathams-blue mb-2">
                Cadre Réglementaire en Vigueur
              </h4>
              <p>
                L'activité d'autoproduction est régie par la <strong>loi n° 2021-31 portant Code de l'Électricité</strong> et précisée par le <strong>Décret n° 2023-286 du 07 février 2023</strong> (modifié par le Décret n° 2025-1757) relatif à l'activité d'autoproduction d'énergie électrique, ainsi que par les règlements d'application adoptés par la CRSE.
              </p>
            </div>

            <div>
              <h4 className="text-[16px] font-bold text-chathams-blue mb-2">
                Vente et Injection du Surplus
              </h4>
              <p>
                L'auto-producteur connecté au réseau interconnecté ou à une concession rurale est autorisé à <strong>vendre son surplus d'énergie</strong> au transporteur ou au distributeur concessionnaire sous réserve de respecter les spécifications techniques de raccordement. Le tarif d'achat du surplus est fixé par la CRSE, avec une priorité accordée aux sources renouvelables.
              </p>
            </div>
          </div>
        </div>

        {/* Modalités & Procédures de Déclaration / Autorisation */}
        <div className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">
              Titres d'Exercice
            </span>
            <h3 className="text-[26px] sm:text-[30px] font-bold text-slate-900 mt-1">
              Régimes Applicables selon la Puissance
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase mb-4">
                  Régime Libre
                </span>
                <h4 className="text-[18px] font-bold text-slate-900 mb-2">Petite Puissance (Usage Domestique)</h4>
                <p className="text-[13px] text-slate-600 leading-relaxed">
                  Installations solaires de très faible capacité destinées à l'autoconsommation pure sans injection sur le réseau public.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 text-[12px] font-semibold text-emerald-700">
                Dispense de formalité lourde
              </div>
            </div>

            <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-chathams-blue text-[11px] font-bold uppercase mb-4">
                  Régime de Déclaration
                </span>
                <h4 className="text-[18px] font-bold text-slate-900 mb-2">Moyenne Puissance (Tertiaire & PME)</h4>
                <p className="text-[13px] text-slate-600 leading-relaxed">
                  Installations nécessitant le dépôt d'un dossier de déclaration auprès de la Commission et de l'opérateur de réseau pour validation des organes de coupure et de découplage.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 text-[12px] font-semibold text-chathams-blue">
                Déclaration enregistrée par la CRSE
              </div>
            </div>

            <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold uppercase mb-4">
                  Régime d'Autorisation
                </span>
                <h4 className="text-[18px] font-bold text-slate-900 mb-2">Grande Puissance (Industriels & IPP)</h4>
                <p className="text-[13px] text-slate-600 leading-relaxed">
                  Installations industrielles de forte puissance avec injection contractuelle de surplus. Nécessite une convention de raccordement et un contrat d'achat approuvé par la CRSE.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 text-[12px] font-semibold text-amber-800">
                Autorisation formelle ministérielle & CRSE
              </div>
            </div>
          </div>
        </div>

        {/* Exemples d'Auto-producteurs répertoriés */}
        <div className="rounded-3xl bg-white p-8 sm:p-10 shadow-sm border border-slate-200 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">
                Registre National
              </span>
              <h3 className="text-[24px] sm:text-[28px] font-bold text-slate-900">
                Exemples d'Auto-producteurs Répertoriés par la CRSE
              </h3>
              <p className="text-[14px] text-slate-500 mt-1">
                Plusieurs grands groupes industriels et entreprises de services disposent d'installations d'autoproduction au Sénégal.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleAutoProducteurs.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-6 hover:bg-white hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700 font-bold text-[14px]">
                    <Factory size={20} />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-slate-900 leading-snug">{item.nom}</h4>
                    <span className="text-[12px] text-slate-500">{item.secteur}</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-[13px] text-slate-600 space-y-1">
                  <p><strong>Localisation :</strong> {item.localisation}</p>
                  <p><strong>Technologie :</strong> {item.technologie}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Documentation */}
        <div className="rounded-3xl bg-chathams-blue p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl">
            <h3 className="text-[22px] sm:text-[26px] font-bold mb-2">
              Vous envisagez un projet d’autoproduction d’énergie ?
            </h3>
            <p className="text-[14px] text-blue-100 leading-relaxed">
              Consultez les textes réglementaires régissant les conditions techniques de raccordement, les modèles de convention d’achat du surplus et les formulaires de déclaration auprès de la CRSE.
            </p>
          </div>

          <Button asChild className="rounded-full bg-shakespeare text-white font-bold px-8 hover:bg-shakespeare/90 shrink-0">
            <Link to="/documents?cats=textes">
              <span>Voir les textes applicables</span>
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
