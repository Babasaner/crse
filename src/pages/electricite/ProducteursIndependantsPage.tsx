import { Link } from 'react-router-dom'
import {
  Zap,
  Sun,
  Wind,
  Flame,
  BatteryCharging,
  Building2,
  FileCheck,
  ArrowLeft,
  CheckCircle2,
  ExternalLink
} from 'lucide-react'
import { PageBanner } from '../../components/shared/PageBanner'
import { Button } from '../../components/ui/button'

const sampleIPP = [
  {
    nom: 'ContourGlobal (Cap des Biches)',
    capacite: '86 MW',
    technologie: 'Thermique Tri-fuel (convertible gaz)',
    icon: Flame,
    color: 'text-orange-600 bg-orange-50',
    description: 'Centrale thermique moderne avec contrat d’achat d’énergie (PPA) à long terme approvisionnant le réseau interconnecté.',
  },
  {
    nom: 'Parc Éolien de Taïba N’Diaye (PETN)',
    capacite: '158,7 MW',
    technologie: 'Éolien terrestre',
    icon: Wind,
    color: 'text-sky-600 bg-sky-50',
    description: 'Premier grand parc éolien d’Afrique de l’Ouest composé de 46 éoliennes géantes injectant directement sur le réseau national.',
  },
  {
    nom: 'Malicounda Power SAS',
    capacite: '120 MW',
    technologie: 'Thermique / Gas-to-Power',
    icon: Flame,
    color: 'text-amber-600 bg-amber-50',
    description: 'Centrale de dernière génération conçue pour fonctionner avec le gaz naturel issu des gisements nationaux (GTA / Yakaar-Teranga).',
  },
  {
    nom: 'Tobene Power SA',
    capacite: '96 MW',
    technologie: 'Thermique lourd & gaz',
    icon: Flame,
    color: 'text-orange-600 bg-orange-50',
    description: 'Centrale majeure située dans la région de Thiès renforçant la stabilité du réseau de transport interconnecté.',
  },
  {
    nom: 'Senergy 1 & 2 (Mékhé & Bokhol)',
    capacite: '30 MW + 20 MW',
    technologie: 'Solaire Photovoltaïque au sol',
    icon: Sun,
    color: 'text-yellow-600 bg-yellow-50',
    description: 'Pionnières des grandes centrales solaires au Sénégal, contribuant à l’un des mix énergétiques les plus propres d’Afrique de l’Ouest.',
  },
  {
    nom: 'Walo Storage & Nea Kolda',
    capacite: '50 MW / 100 MWh',
    technologie: 'Système de stockage par batteries (BESS)',
    icon: BatteryCharging,
    color: 'text-emerald-600 bg-emerald-50',
    description: 'Infrastructures innovantes de stockage sur batteries pour lisser l’intermittence des énergies renouvelables et réguler la fréquence.',
  },
]

export function ProducteursIndependantsPage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <PageBanner
        eyebrow="Secteur Électricité · Acteur Opérationnel"
        title="Producteurs Privés Indépendants (IPP)"
        description="Présentation des investisseurs et producteurs privés d’énergie autorisés à développer, financer, construire et exploiter des centrales électriques et unités de stockage au Sénégal."
      />

      <main className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-12">
        {/* Navigation retour & En-tête */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">
              Production Privée & Transition Énergétique
            </span>
            <h2 className="text-[26px] sm:text-[32px] font-extrabold text-chathams-blue mt-1">
              Les Producteurs Indépendants d'Électricité (IPP)
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
              <Link to="/operateurs/marches">
                <span>Voir les opérateurs du marché</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Définition officielle */}
        <div className="rounded-3xl bg-white p-8 sm:p-10 shadow-sm border border-slate-200 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-[12px] font-bold text-amber-800 mb-4">
            <Zap size={16} />
            <span>Définition Réglementaire</span>
          </div>

          <h3 className="text-[22px] sm:text-[26px] font-bold text-slate-900 leading-snug">
            Rôle des IPP dans le Système Électrique Sénégalais
          </h3>

          <div className="mt-4 p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-white to-blue-50/50 border-l-4 border-amber-500">
            <p className="text-[17px] sm:text-[18px] text-slate-800 font-medium leading-relaxed italic">
              « Titulaire d’un titre d’exercice autorisé à développer, financer, construire, exploiter et maintenir une installation de production ou de stockage et qui vend également sa production au transporteur, au gestionnaire du Réseau de Distribution, aux détaillants indépendants et aux clients éligibles. »
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-[15px] text-slate-600 leading-relaxed">
            <div>
              <h4 className="text-[16px] font-bold text-chathams-blue mb-2">
                Cadre Contractuel (PPA)
              </h4>
              <p>
                Les IPP concluent avec le transporteur (Senelec) des contrats d'achat d'énergie à long terme (*Power Purchase Agreements - PPA*). La CRSE contrôle et approuve la conformité de ces contrats, en s'assurant que le coût de l'énergie achetée reflète des coûts justifiés et concourt au moindre coût pour la collectivité nationale.
              </p>
            </div>

            <div>
              <h4 className="text-[16px] font-bold text-chathams-blue mb-2">
                Diversification & Mix Énergétique
              </h4>
              <p>
                Grâce aux IPP, le Sénégal dispose aujourd'hui de plus de 30 % d'énergie propre injectée sur son réseau (solaire photovoltaïque et éolien), complétée par des centrales thermiques convertibles au gaz local (*Gas-to-Power*) et des projets pilotes de stockage par batteries.
              </p>
            </div>
          </div>
        </div>

        {/* Cartographie des principales centrales IPP */}
        <div className="mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">
                Parc Installé & Acteurs
              </span>
              <h3 className="text-[24px] sm:text-[28px] font-bold text-slate-900">
                Principales Centrales IPP en Exploitation au Sénégal
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleIPP.map((ipp) => {
              const Icon = ipp.icon
              return (
                <article
                  key={ipp.nom}
                  className="flex flex-col justify-between rounded-3xl bg-white p-7 shadow-sm border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${ipp.color}`}>
                        <Icon size={22} />
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[12px] font-bold text-slate-800">
                        {ipp.capacite}
                      </span>
                    </div>

                    <h4 className="text-[18px] font-bold text-slate-900 leading-snug mb-1">
                      {ipp.nom}
                    </h4>
                    <span className="text-[12px] font-semibold text-shakespeare block mb-3">
                      {ipp.technologie}
                    </span>

                    <p className="text-[13px] text-slate-600 leading-relaxed">
                      {ipp.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500">
                    <span>Acheteur : Senelec</span>
                    <span className="font-semibold text-chathams-blue">PPA Régulé</span>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        {/* CTA Investisseurs */}
        <div className="rounded-3xl bg-slate-900 p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold text-shakespeare uppercase tracking-widest">
              Investir dans la Production Électrique
            </span>
            <h3 className="text-[22px] sm:text-[26px] font-bold mt-1 mb-2">
              Consultez le Livret de l'Investisseur
            </h3>
            <p className="text-[14px] text-slate-300 leading-relaxed">
              Retrouvez toutes les modalités d'octroi de licences de production, de contrats de rachat et de raccordement au réseau de transport national dans notre guide officiel.
            </p>
          </div>

          <Button asChild className="rounded-full bg-shakespeare px-8 py-3.5 font-bold text-white hover:bg-shakespeare/90 shrink-0">
            <Link to="/livret-de-linvestisseur">
              <span>Consulter le Livret</span>
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
