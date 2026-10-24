import { Link } from 'react-router-dom'
import {
  Zap,
  Building,
  ExternalLink,
  ArrowLeft,
  Layers,
  Radio,
  Users
} from 'lucide-react'
import { PageBanner } from '../../components/shared/PageBanner'
import { Button } from '../../components/ui/button'

export function OperateurHistoriquePage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <PageBanner
        eyebrow="Secteur Électricité · Acteur Opérationnel"
        title="Opérateur Historique — Senelec"
        description="Société nationale d’électricité assurant la production, le transport exclusif, la distribution et la vente d’énergie électrique sur l’ensemble du territoire sénégalais interconnecté."
      />

      <main className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-12">
        {/* Navigation retour & En-tête */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">
              Acteur Majeur du Secteur Électrique
            </span>
            <h2 className="text-[26px] sm:text-[32px] font-extrabold text-chathams-blue mt-1">
              Société Nationale d’Électricité du Sénégal (Senelec)
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
              <a href="https://www.senelec.sn" target="_blank" rel="noopener noreferrer">
                <span>Accéder au site officiel senelec.sn</span>
                <ExternalLink size={15} />
              </a>
            </Button>
          </div>
        </div>

        {/* Section de présentation générale & Statut */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <div className="lg:col-span-8 rounded-3xl bg-white p-8 sm:p-10 shadow-sm border border-slate-200">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-[12px] font-bold text-chathams-blue uppercase mb-4">
              <Building size={16} />
              <span>Opérateur Historique Intégré</span>
            </div>

            <h3 className="text-[22px] sm:text-[26px] font-bold text-slate-900 leading-snug">
              Rôle et Missions au Cœur du Système Électrique National
            </h3>

            <div className="mt-5 space-y-4 text-[15px] sm:text-[16px] text-slate-600 leading-relaxed">
              <p>
                <strong>Senelec</strong> est la société anonyme à capitaux publics majoritaires concessionnaire du service public de la production, du transport, de la distribution et de la vente d’énergie électrique au Sénégal.
              </p>
              <p>
                Aux termes du <strong>Code de l’Électricité (loi n° 2021-31)</strong> et de son contrat de concession conclu avec l’État, Senelec détient le <strong>monopole exclusif du transport</strong> d'électricité sur tout le territoire national (hors réseau de Manantali géré sous égide de l'OMVS) et assure la distribution sur son périmètre concédé.
              </p>
              <p>
                Elle assume également la mission d'<strong>acheteur unique</strong> pour l'ensemble de l'électricité produite par les Producteurs Privés Indépendants (IPP) dans le cadre de contrats d'achat d'énergie à long terme (*PPA*).
              </p>
            </div>
          </div>

          {/* Encadré régulation CRSE */}
          <div className="lg:col-span-4 rounded-3xl bg-gradient-to-br from-[#1b3e80] to-[#122c5c] p-8 text-white shadow-xl">
            <span className="text-[11px] font-bold text-shakespeare uppercase tracking-widest block mb-2">
              Encadrement Réglementaire
            </span>
            <h4 className="text-[19px] font-bold text-white mb-4">
              Régulation Tarifaire par la CRSE
            </h4>
            <p className="text-[14px] text-blue-100 leading-relaxed mb-6">
              La CRSE audite chaque année les charges d'exploitation et les investissements de Senelec pour fixer le <strong>Revenu Maximum Autorisé (RMA)</strong> et arrêter les grilles tarifaires applicables aux usagers (Woyofal, basse et moyenne tension).
            </p>
            <Button asChild size="sm" className="w-full rounded-full bg-white text-chathams-blue font-bold hover:bg-blue-50">
              <Link to="/documents?cats=grilles&secteur=electricite">
                <span>Consulter les grilles tarifaires</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Les 4 Métiers de Senelec */}
        <div className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">
              Périmètre d'Intervention
            </span>
            <h3 className="text-[26px] sm:text-[30px] font-bold text-slate-900 mt-1">
              Les Quatre Métiers Intégrés de Senelec
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Production */}
            <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-5">
                <Zap size={24} />
              </div>
              <h4 className="text-[18px] font-bold text-slate-900 mb-2">Production</h4>
              <p className="text-[13px] text-slate-600 leading-relaxed">
                Exploitation de parcs thermiques propres, centrales solaires, hydroélectricité régionale (Manantali/Félou) et cogénération avec les producteurs tiers.
              </p>
            </div>

            {/* 2. Transport */}
            <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-chathams-blue mb-5">
                <Radio size={24} />
              </div>
              <h4 className="text-[18px] font-bold text-slate-900 mb-2">Transport (Monopole)</h4>
              <p className="text-[13px] text-slate-600 leading-relaxed">
                Gestion exclusive des lignes haute tension (HTB), des postes de transformation et du dispatching national assurant l'équilibre offre-demande en temps réel.
              </p>
            </div>

            {/* 3. Distribution */}
            <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 mb-5">
                <Layers size={24} />
              </div>
              <h4 className="text-[18px] font-bold text-slate-900 mb-2">Distribution</h4>
              <p className="text-[13px] text-slate-600 leading-relaxed">
                Acheminement de l'énergie à travers le réseau moyenne tension (HTA) et basse tension (BT), raccordement des nouveaux usagers et maintenance continue du réseau.
              </p>
            </div>

            {/* 4. Vente */}
            <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 mb-5">
                <Users size={24} />
              </div>
              <h4 className="text-[18px] font-bold text-slate-900 mb-2">Commercialisation & Vente</h4>
              <p className="text-[13px] text-slate-600 leading-relaxed">
                Gestion de la relation client, facturation post-payée et prépayée (système Woyofal), accueil commercial et traitement des demandes de service.
              </p>
            </div>
          </div>
        </div>

        {/* Bandeau d'accès direct vers selec.sn */}
        <div className="rounded-3xl bg-slate-900 p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">
              Lien Partenaire Officiel
            </span>
            <h3 className="text-[22px] sm:text-[26px] font-bold mt-1 mb-2">
              Consulter les Services en Ligne de Senelec
            </h3>
            <p className="text-[14px] text-slate-300 leading-relaxed">
              Pour vos démarches de souscription, suivi de compteur Woyofal, signalement d'incident réseau ou paiement de facture, rendez-vous directement sur le portail officiel de l'opérateur.
            </p>
          </div>

          <Button
            asChild
            size="lg"
            className="rounded-full bg-shakespeare px-8 py-4 font-bold text-white hover:bg-shakespeare/90 shrink-0 gap-2 shadow-lg shadow-shakespeare/25"
          >
            <a href="https://www.senelec.sn" target="_blank" rel="noopener noreferrer">
              <span>Visiter senelec.sn</span>
              <ExternalLink size={18} />
            </a>
          </Button>
        </div>
      </main>
    </div>
  )
}
