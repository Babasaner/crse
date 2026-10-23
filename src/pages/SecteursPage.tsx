import { Link, useSearchParams } from 'react-router-dom'
import {
  Zap,
  Flame,
  Fuel,
  ArrowRight,
  FileText,
  Building,
  BarChart3,
  Scale
} from 'lucide-react'

type SectorTab = 'electricite' | 'hydrocarbures' | 'gaz'

export function SecteursPage({ secteur }: { secteur?: SectorTab }) {
  const [searchParams] = useSearchParams()
  const secteurParam = searchParams.get('secteur')
  const activeTab: SectorTab = secteur ?? (
    secteurParam === 'hydrocarbures' ? 'hydrocarbures' :
    secteurParam === 'gaz' ? 'gaz' :
    'electricite'
  )
  const sectorTitle = activeTab === 'electricite'
    ? 'SECTEUR DE L’ÉLECTRICITÉ'
    : activeTab === 'hydrocarbures'
      ? 'AVAL DES HYDROCARBURES'
      : 'AVAL & INTERMÉDIAIRE GAZIERS'

  return (
    <div className="min-h-screen bg-slate-50/60">
      {/* 1. HERO BANNER SECTEURS */}
      <section className="relative flex min-h-[240px] sm:min-h-[300px] w-full items-center bg-chathams-blue">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1920&q=80")`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-chathams-blue via-chathams-blue/90 to-chathams-blue/75" />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:px-12">
          <div className="inline-block rounded-xl bg-white/10 px-8 py-3.5 shadow-xl backdrop-blur-md border border-white/20">
            <h1 className="text-[26px] sm:text-[34px] font-extrabold tracking-wider text-white uppercase">
              {sectorTitle}
            </h1>
          </div>
          <p className="mt-4 max-w-2xl text-[15px] sm:text-[16px] text-blue-100 font-medium">
            Cadre opératoire, cartographie des acteurs, chiffres clés et tarification des marchés de l’énergie au Sénégal.
          </p>
        </div>
      </section>

      {/* 2. ONGLETS DE NAVIGATION SECTORIELLE */}
      <section className="bg-white border-b border-slate-200 sticky top-[72px] z-30 shadow-sm">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
          <div className="flex overflow-x-auto no-scrollbar gap-2 sm:gap-4 py-3">
            <Link
              to="/electricite"
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-[14px] sm:text-[15px] transition-all shrink-0 ${
                activeTab === 'electricite'
                  ? 'bg-chathams-blue text-white shadow-md shadow-chathams-blue/20'
                  : 'text-slate-600 hover:text-chathams-blue hover:bg-slate-100'
              }`}
            >
              <Zap size={18} className={activeTab === 'electricite' ? 'text-amber-300' : 'text-slate-400'} />
              <span>Secteur de l'Électricité</span>
            </Link>

            <Link
              to="/hydrocarbures"
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-[14px] sm:text-[15px] transition-all shrink-0 ${
                activeTab === 'hydrocarbures'
                  ? 'bg-chathams-blue text-white shadow-md shadow-chathams-blue/20'
                  : 'text-slate-600 hover:text-chathams-blue hover:bg-slate-100'
              }`}
            >
              <Fuel size={18} className={activeTab === 'hydrocarbures' ? 'text-shakespeare' : 'text-slate-400'} />
              <span>Aval des Hydrocarbures</span>
            </Link>

            <Link
              to="/gaz"
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-[14px] sm:text-[15px] transition-all shrink-0 ${
                activeTab === 'gaz'
                  ? 'bg-chathams-blue text-white shadow-md shadow-chathams-blue/20'
                  : 'text-slate-600 hover:text-chathams-blue hover:bg-slate-100'
              }`}
            >
              <Flame size={18} className={activeTab === 'gaz' ? 'text-orange-400' : 'text-slate-400'} />
              <span>Aval & Intermédiaire Gaziers</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. CONTENU DÉTAILLÉ SELON L'ONGLET SÉLECTIONNÉ */}
      <main className="mx-auto w-full max-w-[1440px] px-6 py-14 lg:px-12">
        {/* ========================================================================= */}
        {/* ONGLET 1 : ÉLECTRICITÉ */}
        {/* ========================================================================= */}
        {activeTab === 'electricite' && (
          <div className="space-y-16 animate-fade-in">
            {/* Résumé & Ce que vous trouverez ici */}
            <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-md border border-slate-200">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-[12px] font-bold text-amber-800 mb-4">
                <Zap size={16} className="text-amber-600" />
                <span>Régulation de l'Énergie Électrique</span>
              </div>
              <h2 className="text-[28px] sm:text-[34px] font-extrabold text-slate-900 leading-snug">
                Secteur de l’Électricité
              </h2>
              <p className="mt-4 text-[16px] sm:text-[17px] text-slate-600 leading-relaxed max-w-4xl">
                Le secteur de l’électricité est au cœur de la stratégie énergétique nationale. Retrouvez ici toutes les informations relatives à la production, à l’autoproduction, au transport, à la distribution, au stockage et à la vente d’énergie électrique au Sénégal.
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-100">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chathams-blue text-white mb-3">
                    <Building size={20} />
                  </div>
                  <h3 className="text-[16px] font-bold text-slate-900"><Link to="/electricite/acteurs" className="hover:text-shakespeare">Présentation des acteurs <ArrowRight size={14} className="ml-1 inline" /></Link></h3>
                  <p className="text-[13px] text-slate-600 mt-1">
                    Vue d’ensemble du secteur et liste des acteurs principaux (Senelec, IPP, ERD, CERD et Auto-producteurs).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-shakespeare text-white mb-3">
                    <BarChart3 size={20} />
                  </div>
                  <h3 className="text-[16px] font-bold text-slate-900">Chiffres clés</h3>
                  <p className="text-[13px] text-slate-600 mt-1">
                    Données annuelles consolidées sur la puissance installée, la production et l’évolution de la consommation.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white mb-3">
                    <Scale size={20} />
                  </div>
                  <h3 className="text-[16px] font-bold text-slate-900">Tarification et accès</h3>
                  <p className="text-[13px] text-slate-600 mt-1">
                    Grilles tarifaires de vente au détail, tarifs d’accès au réseau de transport et distribution (TURPE).
                  </p>
                </div>
              </div>
            </div>

            {/* CARTOGRAPHIE DES ACTEURS DE L'ÉLECTRICITÉ */}
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">Écosystème National</span>
                  <h3 className="text-[26px] sm:text-[30px] font-bold text-slate-900">
                    Présentation des Acteurs Régulés
                  </h3>
                  <p className="text-[14px] text-slate-500 mt-1">
                    Les différents segments d'activité encadrés par la loi n° 2021-31 portant Code de l'Électricité.
                  </p>
                </div>
                <Link
                  to="/operateurs/marches"
                  className="inline-flex items-center gap-2 text-[14px] font-bold text-chathams-blue hover:text-shakespeare"
                >
                  <span>Consulter le registre des opérateurs</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 1. Opérateur Historique */}
                <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-chathams-blue text-[11px] font-bold uppercase mb-3">
                    Opérateur Intégré
                  </span>
                  <h4 className="text-[18px] font-bold text-slate-900"><Link to="/electricite/acteurs#senelec" className="hover:text-shakespeare">Senelec (Opérateur Historique)</Link></h4>
                  <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                    Société nationale d'électricité assurant la production, le transport exclusif, la distribution et la vente d’énergie électrique sur l’ensemble du territoire interconnecté.
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500">
                    <span>Monopole du transport</span>
                    <span className="font-semibold text-chathams-blue">Réseau national</span>
                  </div>
                </div>

                {/* 2. Producteurs privés indépendants (IPP) */}
                <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold uppercase mb-3">
                    Production Indépendante
                  </span>
                  <h4 className="text-[18px] font-bold text-slate-900"><Link to="/electricite/acteurs#producteurs-independants" className="hover:text-shakespeare">Producteurs Privés (IPP)</Link></h4>
                  <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                    Titulaires d’un titre d’exercice autorisés à développer, financer, construire, exploiter et maintenir une installation de production ou de stockage, revendant leur production au gestionnaire de réseau ou aux clients éligibles.
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500">
                    <span>Centrales Solaires, Éoliennes, Thermiques</span>
                    <span className="font-semibold text-chathams-blue">Contrats PPA</span>
                  </div>
                </div>

                {/* 3. Concessionnaires d'Électrification Rurale (CER) */}
                <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase mb-3">
                    Électrification Rurale
                  </span>
                  <h4 className="text-[18px] font-bold text-slate-900"><Link to="/electricite/acteurs#concessionnaires-ruraux" className="hover:text-shakespeare">Concessionnaires Ruraux (CER)</Link></h4>
                  <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                    Opérateurs privés chargés de l’électrification des zones non interconnectées et périurbaines sous convention de concession spécifique (ERA, COMASEL, etc.).
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500">
                    <span>Périmètres concédés</span>
                    <span className="font-semibold text-chathams-blue">Accès universel</span>
                  </div>
                </div>

                {/* 4. Concessionnaires d'Électrification Rurale Décentralisée (CERD) */}
                <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-[11px] font-bold uppercase mb-3">
                    Hors-Réseau / Mini-Réseaux
                  </span>
                  <h4 className="text-[18px] font-bold text-slate-900"><Link to="/electricite/acteurs#electrification-decentralisee" className="hover:text-shakespeare">CERD (Électrification Décentralisée)</Link></h4>
                  <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                    Opérateurs privés chargés de l’exploitation des zones rurales à partir de mini-réseaux hybrides, solaires ou de systèmes électriques individuels autonomes.
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500">
                    <span>Mini-réseaux solaires</span>
                    <span className="font-semibold text-chathams-blue">Systèmes isolés</span>
                  </div>
                </div>

                {/* 5. Auto-producteurs */}
                <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <span className="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-[11px] font-bold uppercase mb-3">
                    Usage Propre & Injection
                  </span>
                  <h4 className="text-[18px] font-bold text-slate-900"><Link to="/electricite/acteurs#autoproducteurs" className="hover:text-shakespeare">Auto-producteurs</Link></h4>
                  <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                    Personne physique ou morale produisant de l’énergie électrique principalement pour un usage personnel en vue de satisfaire ses besoins, autorisée à réinjecter et vendre le surplus conformément à la réglementation.
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500">
                    <span>Industries & Particuliers</span>
                    <span className="font-semibold text-chathams-blue">Injection surplus</span>
                  </div>
                </div>

                {/* 6. Clients Éligibles */}
                <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <span className="inline-block px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 text-[11px] font-bold uppercase mb-3">
                    Grands Consommateurs
                  </span>
                  <h4 className="text-[18px] font-bold text-slate-900"><Link to="/electricite/acteurs#clients-eligibles" className="hover:text-shakespeare">Clients Éligibles</Link></h4>
                  <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                    Consommateurs de grande puissance ayant la liberté de contracter directement leur approvisionnement auprès des producteurs indépendants autorisés avec accès régulé aux réseaux tiers.
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500">
                    <span>Haute Tension</span>
                    <span className="font-semibold text-chathams-blue">Libre choix</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CHIFFRES CLÉS DU SECTEUR ÉLECTRICITÉ */}
            <div className="rounded-3xl bg-gradient-to-br from-chathams-blue via-slate-900 to-chathams-blue p-8 sm:p-12 text-white shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10">
                <div>
                  <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">Indicateurs 2024</span>
                  <h3 className="text-[26px] sm:text-[32px] font-extrabold text-white">
                    Quelques Chiffres Clés du Secteur en 2024
                  </h3>
                </div>
                <Link
                  to="/documents?cats=rapports&secteur=electricite"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[13px] font-bold backdrop-blur-sm border border-white/15 transition-all"
                >
                  <FileText size={16} />
                  <span>Consulter le rapport annuel</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[13px] text-blue-200 block">Capacité Totale Installée</span>
                  <span className="text-[34px] sm:text-[40px] font-black text-amber-300 block mt-1">+1 800 MW</span>
                  <p className="text-[12px] text-blue-200 mt-2">Parc thermique, solaire, éolien et hydroélectrique</p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[13px] text-blue-200 block">Part des Énergies Renouvelables</span>
                  <span className="text-[34px] sm:text-[40px] font-black text-shakespeare block mt-1">~32%</span>
                  <p className="text-[12px] text-blue-200 mt-2">Leader de la transition propre en Afrique de l'Ouest</p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[13px] text-blue-200 block">Taux d'Électrification Urbain</span>
                  <span className="text-[34px] sm:text-[40px] font-black text-emerald-400 block mt-1">&gt; 94%</span>
                  <p className="text-[12px] text-blue-200 mt-2">Garantie d'accès au service public de l'énergie</p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[13px] text-blue-200 block">Taux d'Électrification Rural</span>
                  <span className="text-[34px] sm:text-[40px] font-black text-white block mt-1">~60%</span>
                  <p className="text-[12px] text-blue-200 mt-2">Objectif d'accès universel porté par les concessions</p>
                </div>
              </div>
            </div>

            {/* TARIFICATION ET ACCÈS AUX DOCUMENTS */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-[20px] font-bold text-slate-900">Grilles Tarifaires de l'Électricité</h4>
                <p className="text-[14px] text-slate-600 mt-1 max-w-2xl">
                  Retrouvez les barèmes officiels approuvés par la CRSE pour les clients domestiques, professionnels, industriels et l'éclairage public.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/documents?cats=grilles&secteur=electricite"
                  className="px-5 py-3 rounded-xl bg-chathams-blue text-white text-[14px] font-bold hover:bg-blue-900 transition-colors shadow-sm"
                >
                  Voir les grilles tarifaires
                </Link>
                <Link
                  to="/consommateurs/guide"
                  className="px-5 py-3 rounded-xl bg-slate-100 text-slate-700 text-[14px] font-bold hover:bg-slate-200 transition-colors"
                >
                  Guide du consommateur
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ONGLET 2 : AVAL HYDROCARBURES */}
        {/* ========================================================================= */}
        {activeTab === 'hydrocarbures' && (
          <div className="space-y-16 animate-fade-in">
            {/* Présentation générale */}
            <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-md border border-slate-200">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-[12px] font-bold text-chathams-blue mb-4">
                <Fuel size={16} />
                <span>Régulation de l'Aval Pétrolier</span>
              </div>
              <h2 className="text-[28px] sm:text-[34px] font-extrabold text-slate-900 leading-snug">
                Aval des Hydrocarbures
              </h2>
              <p className="mt-4 text-[16px] sm:text-[17px] text-slate-600 leading-relaxed max-w-4xl">
                La CRSE régule les activités de l’aval hydrocarbures pour assurer un approvisionnement correct du pays en produits pétroliers. Cette rubrique détaille le cadre opératoire pour les acteurs (raffinage, stockage, distribution, importation, transport et commercialisation).
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6 pt-8 border-t border-slate-100">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h3 className="text-[15px] font-bold text-slate-900 mb-1"><Link to="/hydrocarbures/acteurs" className="hover:text-shakespeare">Présentation des acteurs <ArrowRight size={14} className="ml-1 inline" /></Link></h3>
                  <p className="text-[13px] text-slate-600">
                    Cartographie des acteurs (raffineur, importateurs/distributeurs, stockistes, infrastructures).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h3 className="text-[15px] font-bold text-slate-900 mb-1">Cadre réglementaire</h3>
                  <p className="text-[13px] text-slate-600">
                    Textes législatifs et obligations spécifiques au secteur aval des hydrocarbures.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h3 className="text-[15px] font-bold text-slate-900 mb-1">Données sectorielles</h3>
                  <p className="text-[13px] text-slate-600">
                    Statistiques annuelles, chiffres clés et rapports techniques de suivi des flux.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h3 className="text-[15px] font-bold text-slate-900 mb-1">Structure des prix</h3>
                  <p className="text-[13px] text-slate-600">
                    Décomposition transparente et barèmes des hydrocarbures raffinés (Super, Gasoil, Lampant, GPL).
                  </p>
                </div>
              </div>
            </div>

            {/* CARTOGRAPHIE DES ACTEURS HYDROCARBURES */}
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">Chaîne de Valeur Pétrolière</span>
                  <h3 className="text-[26px] sm:text-[30px] font-bold text-slate-900">
                    Acteurs & Activités Régulées de l'Aval
                  </h3>
                  <p className="text-[14px] text-slate-500 mt-1">
                    Les segments industriels et logistiques surveillés par la CRSE.
                  </p>
                </div>
                <Link
                  to="/documents?cats=hydrocarbures&secteur=hydrocarbures"
                  className="inline-flex items-center gap-2 text-[14px] font-bold text-chathams-blue hover:text-shakespeare"
                >
                  <span>Structures des prix mensuelles</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-chathams-blue text-[11px] font-bold uppercase mb-3">
                    Raffinage National
                  </span>
                  <h4 className="text-[18px] font-bold text-slate-900"><Link to="/hydrocarbures/acteurs#sar" className="hover:text-shakespeare">Société Africaine de Raffinage (SAR)</Link></h4>
                  <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                    Seule raffinerie du pays, assurant le traitement du brut, l'approvisionnement en bases pétrolières raffinées et la sécurisation des stocks stratégiques nationaux.
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <span className="inline-block px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 text-[11px] font-bold uppercase mb-3">
                    Stockage & Dépôts
                  </span>
                  <h4 className="text-[18px] font-bold text-slate-900"><Link to="/hydrocarbures/acteurs#stockistes" className="hover:text-shakespeare">Stockistes & Gestionnaires de Dépôts</Link></h4>
                  <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                    Opérateurs assurant la réception maritime, la manutention et le stockage sécurisé des produits pétroliers (SENSTOCK, Elton Logistics, dépôts côtiers et intérieurs).
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold uppercase mb-3">
                    Distribution & Réseaux
                  </span>
                  <h4 className="text-[18px] font-bold text-slate-900"><Link to="/hydrocarbures/acteurs#distributeurs" className="hover:text-shakespeare">Compagnies Distributrices & Stations</Link></h4>
                  <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                    Réseau national des distributeurs agréés (TotalEnergies, Vivo Energy/Shell, Ola Energy, Elton, Star Oil, etc.) exploitant les stations-services et livrant les consommateurs industriels.
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase mb-3">
                    Gaz Butane (GPL)
                  </span>
                  <h4 className="text-[18px] font-bold text-slate-900"><Link to="/hydrocarbures/acteurs#gpl" className="hover:text-shakespeare">Centres Emplisseurs de GPL</Link></h4>
                  <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                    Entreprises assurant l'emplissage des bonbonnes de gaz butane, leur contrôle technique périodique et leur distribution sur l'ensemble des points de vente.
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <span className="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-[11px] font-bold uppercase mb-3">
                    Transport Routier & Maritime
                  </span>
                  <h4 className="text-[18px] font-bold text-slate-900"><Link to="/hydrocarbures/acteurs#transporteurs" className="hover:text-shakespeare">Transporteurs Agréés d'Hydrocarbures</Link></h4>
                  <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                    Flotte de camions-citernes et caboteurs habilités, soumis à des règles rigoureuses d'agrément technique et de sécurité environnementale.
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <span className="inline-block px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-[11px] font-bold uppercase mb-3">
                    Importation & Trading
                  </span>
                  <h4 className="text-[18px] font-bold text-slate-900"><Link to="/hydrocarbures/acteurs#importateurs" className="hover:text-shakespeare">Importateurs Directs Agréés</Link></h4>
                  <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                    Acteurs habilités par licence ministérielle avec avis de la CRSE pour l'importation de cargaisons de produits pétroliers finis en complément du raffinage local.
                  </p>
                </div>
              </div>
            </div>

            {/* STRUCTURE DES PRIX ET STATISTIQUES */}
            <div className="rounded-3xl bg-gradient-to-br from-chathams-blue to-slate-900 p-8 sm:p-12 text-white shadow-xl">
              <div className="max-w-3xl">
                <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">Transparence Tarifaire</span>
                <h3 className="text-[26px] sm:text-[32px] font-bold text-white mt-1">
                  Structure des Prix des Hydrocarbures Raffinés
                </h3>
                <p className="text-[15px] text-blue-100 mt-3 leading-relaxed">
                  La CRSE calcule et vérifie scrupuleusement les composantes des barèmes des prix : cours international FOB, fret maritime, droits de douane, péréquation transport, marges de passage, marge de distribution et marge des gérants de station.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    to="/documents?cats=hydrocarbures&secteur=hydrocarbures"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-shakespeare text-white text-[14px] font-bold hover:bg-shakespeare/90 transition-all shadow-md"
                  >
                    <FileText size={16} />
                    <span>Télécharger les barèmes officiels</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ONGLET 3 : AVAL & INTERMÉDIAIRE GAZIERS */}
        {/* ========================================================================= */}
        {activeTab === 'gaz' && (
          <div className="space-y-16 animate-fade-in">
            {/* Présentation générale */}
            <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-md border border-slate-200">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-1.5 text-[12px] font-bold text-orange-700 mb-4">
                <Flame size={16} />
                <span>Nouvelle Économie Gazière (GTA & Yakaar-Teranga)</span>
              </div>
              <h2 className="text-[28px] sm:text-[34px] font-extrabold text-slate-900 leading-snug">
                Aval & Intermédiaire Gaziers
              </h2>
              <p className="mt-4 text-[16px] sm:text-[17px] text-slate-600 leading-relaxed max-w-4xl">
                Avec l’émergence de l’économie gazière et les découvertes offshore de classe mondiale, la régulation du segment intermédiaire et aval est cruciale pour alimenter les centrales « Gas-to-Power », décarboner l'industrie et valoriser la ressource locale.
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-slate-100">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white mb-3">
                    <Building size={20} />
                  </div>
                  <h3 className="text-[17px] font-bold text-slate-900"><Link to="/gaz/acteurs" className="hover:text-shakespeare">Présentation des acteurs <ArrowRight size={14} className="ml-1 inline" /></Link></h3>
                  <p className="text-[14px] text-slate-600 mt-2">
                    Vue d’ensemble des acteurs en présence : transporteurs par gazoduc, gestionnaires de réseau gazier, distributeurs et clients industriels.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chathams-blue text-white mb-3">
                    <Scale size={20} />
                  </div>
                  <h3 className="text-[17px] font-bold text-slate-900">Cadre réglementaire & Codes de Réseau</h3>
                  <p className="text-[14px] text-slate-600 mt-2">
                    Lois gazières, décrets d'application, règles d'accès des tiers non discriminatoire (ATR) et codes de réseaux applicables aux infrastructures.
                  </p>
                </div>
              </div>
            </div>

            {/* ACTEURS DU SEGMENT GAZIER */}
            <div>
              <div className="mb-8">
                <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">Infrastructures Gazières</span>
                <h3 className="text-[26px] sm:text-[30px] font-bold text-slate-900">
                  Acteurs Clés du Réseau Gazier National
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <span className="inline-block px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-[11px] font-bold uppercase mb-3">
                    Transporteur National
                  </span>
                  <h4 className="text-[18px] font-bold text-slate-900"><Link to="/gaz/acteurs#rgs" className="hover:text-shakespeare">Réseau Gazier du Sénégal (RGS SA)</Link></h4>
                  <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                    Entité dédiée au développement, au financement, à la construction et à l’exploitation du réseau national de gazoducs pour transporter le gaz naturel vers les centrales électriques et les pôles industriels.
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-chathams-blue text-[11px] font-bold uppercase mb-3">
                    Gas-to-Power
                  </span>
                  <h4 className="text-[18px] font-bold text-slate-900"><Link to="/gaz/acteurs#centrales-gaz" className="hover:text-shakespeare">Centrales Électriques Utilisatrices</Link></h4>
                  <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                    Centrales de Senelec et IPP (ex. Malicounda, Cap des Biches) converties au gaz naturel pour réduire les coûts de production du kWh et diminuer l’empreinte carbone nationale.
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase mb-3">
                    Utilisateurs Industriels & GNV
                  </span>
                  <h4 className="text-[18px] font-bold text-slate-900"><Link to="/gaz/acteurs#clients-industriels" className="hover:text-shakespeare">Industries & Mobilité Propre</Link></h4>
                  <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                    Cimenteries, industries chimiques, minières et développement futur du Gaz Naturel Véhicule (GNV) pour les transports lourds et urbains.
                  </p>
                </div>
              </div>
            </div>

            {/* CADRE LÉGISLATIF ET DOCUMENTS */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-[20px] font-bold text-slate-900">Cadre Légal & Réglementaire du Gaz</h4>
                <p className="text-[14px] text-slate-600 mt-1 max-w-2xl">
                  Consultez la loi n° 2020-06 portant Code Gazier, les décrets d'application et les décisions relatives aux tarifs de transport gazier.
                </p>
              </div>
              <Link
                to="/documents?cats=textes&secteur=gaz"
                className="px-6 py-3 rounded-xl bg-chathams-blue text-white text-[14px] font-bold hover:bg-blue-900 transition-colors shadow-sm shrink-0"
              >
                Consulter les textes légaux
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
