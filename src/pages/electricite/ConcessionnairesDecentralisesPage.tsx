import { Link } from 'react-router-dom'
import {
  Zap,
  Sun,
  Battery,
  ArrowLeft,
  Radio
} from 'lucide-react'
import { PageBanner } from '../../components/shared/PageBanner'
import { Button } from '../../components/ui/button'

export function ConcessionnairesDecentralisesPage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <PageBanner
        eyebrow="Secteur Électricité · Acteur Opérationnel"
        title="Concessionnaires d’Électrification Rurale Décentralisée (CERD)"
        description="Présentation des opérateurs privés chargés de l’électrification des zones rurales éloignées à partir de mini-réseaux solaires et de systèmes électriques individuels autonomes."
      />

      <main className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-12">
        {/* Navigation retour & En-tête */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">
              Solutions Hors-Réseau (*Off-Grid*)
            </span>
            <h2 className="text-[26px] sm:text-[32px] font-extrabold text-chathams-blue mt-1">
              Les Concessionnaires Décentralisés (CERD)
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild variant="outline" className="rounded-full gap-2 border-slate-300">
              <Link to="/electricite">
                <ArrowLeft size={16} />
                <span>Retour au Secteur Électricité</span>
              </Link>
            </Button>
            <Button asChild className="rounded-full bg-chathams-blue text-white gap-2 hover:bg-shakespeare">
              <Link to="/electricite/concessionnaires-ruraux">
                <span>Voir les Concessions CER</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Définition officielle */}
        <div className="rounded-3xl bg-white p-8 sm:p-10 shadow-sm border border-slate-200 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-[12px] font-bold text-teal-800 mb-4">
            <Zap size={16} />
            <span>Définition Réglementaire</span>
          </div>

          <h3 className="text-[22px] sm:text-[26px] font-bold text-slate-900 leading-snug">
            Rôle des CERD dans l'Électrification des Territoires
          </h3>

          <div className="mt-4 p-6 rounded-2xl bg-gradient-to-r from-teal-50 via-white to-blue-50/50 border-l-4 border-teal-600">
            <p className="text-[17px] sm:text-[18px] text-slate-800 font-medium leading-relaxed italic">
              « Opérateurs privés chargés de l’exploitation des zones rurales à partir de mini réseaux ou de systèmes électriques individuels. »
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-[15px] text-slate-600 leading-relaxed">
            <div>
              <h4 className="text-[16px] font-bold text-chathams-blue mb-2">
                Mini-Réseaux Hybrides & Systèmes Décentralisés
              </h4>
              <p>
                Dans les localités où l'extension du réseau national est économiquement ou techniquement non viable à court terme, les <strong>CERD</strong> déploient des micro-centrales solaires photovoltaïques adossées à du stockage par batteries et des réseaux de distribution basse tension locaux.
              </p>
            </div>

            <div>
              <h4 className="text-[16px] font-bold text-chathams-blue mb-2">
                Régulation de la Qualité et des Tarifs
              </h4>
              <p>
                La CRSE s'assure que les normes techniques de distribution et de sécurité soient strictement observées, tout en encadrant les barèmes tarifaires et le service de maintenance fourni aux populations bénéficiaires.
              </p>
            </div>
          </div>
        </div>

        {/* Typologie des technologies déployées */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-4">
              <Sun size={24} />
            </div>
            <h4 className="text-[18px] font-bold text-slate-900 mb-2">Mini-Réseaux Solaires Villageois</h4>
            <p className="text-[13px] text-slate-600 leading-relaxed">
              Centrales photovoltaïques communautaires couplées à un réseau de distribution local desservant les foyers, commerces, écoles et postes de santé du village.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 mb-4">
              <Battery size={24} />
            </div>
            <h4 className="text-[18px] font-bold text-slate-900 mb-2">Systèmes Solaires Individuels (SHS)</h4>
            <p className="text-[13px] text-slate-600 leading-relaxed">
              Kits solaires autonomes prépayés (*Pay-As-You-Go*) installés directement chez l'usager dans les hameaux dispersés ne pouvant pas être raccordés à un mini-réseau.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-chathams-blue mb-4">
              <Radio size={24} />
            </div>
            <h4 className="text-[18px] font-bold text-slate-900 mb-2">Pompage Solaire & Usages Productifs</h4>
            <p className="text-[13px] text-slate-600 leading-relaxed">
              Fourniture d'énergie dédiée aux activités productives rurales : forages, pompes d'irrigation agricole, moulins de mil et unités de froid communautaires.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
