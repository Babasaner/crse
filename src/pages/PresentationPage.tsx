import { Link } from 'react-router-dom'
import {
  FileText,
  Shield,
  Layers,
  Users,
  Building,
  Briefcase,
  Scale,
  CheckCircle2,
  ArrowRight
} from 'lucide-react'
import { PageBanner } from '../components/shared/PageBanner'
import { Button } from '../components/ui/button'

const refineryImg = 'https://www.crse.sn/wp-content/uploads/2025/11/Usine-du-futur_0-scaled-1-2048x1365.jpg'
const electricImg = 'https://www.crse.sn/wp-content/uploads/2025/11/Container.jpg'
const petrolImg = 'https://www.crse.sn/wp-content/uploads/2025/11/Container-1.jpg'
const gasImg = 'https://www.crse.sn/wp-content/uploads/2025/11/Container-2.jpg'

export function PresentationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO BANNER UNIFORME AVEC BREADCRUMB */}
      <PageBanner
        eyebrow="Institution"
        title="Présentation de la CRSE"
        description="Autorité administrative indépendante chargée de la régulation du secteur de l’électricité, du secteur aval des hydrocarbures et des segments aval et intermédiaire du gaz au Sénégal."
      />

      {/* 2. SECTION CRÉATION DE LA CRSE */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_minmax(0,0.85fr)] gap-12 items-center">
            {/* Texte de gauche */}
            <div>
              <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-[12px] font-bold text-chathams-blue uppercase tracking-wider mb-3">
                Institution
              </span>

              <h2 className="text-[clamp(32px,3.5vw,46px)] font-bold text-slate-900 leading-tight">
                Création de <span className="text-shakespeare">la CRSE</span>
              </h2>

              {/* Badge officiel de la loi */}
              <div className="my-5 inline-flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-2.5 border border-slate-200">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-chathams-blue text-white">
                  <FileText size={18} />
                </div>
                <span className="text-[15px] font-bold text-chathams-blue">
                  Loi n° 2021-32 du 09 juillet 2021
                </span>
              </div>

              <div className="space-y-4 text-[15px] leading-relaxed text-slate-600">
                <p>
                  Initialement créée par la loi n° 98-29 du 14 avril 1998 pour réguler le secteur de l’électricité, la Commission de Régulation du Secteur de l’Énergie (CRSE) a vu ses compétences considérablement élargies en 2021.
                </p>
                <p>
                  Aux termes de la <strong>loi n° 2021-32 du 09 juillet 2021</strong>, la CRSE est une autorité administrative indépendante dotée de la personnalité juridique et de l’autonomie financière et de gestion. Son siège est fixé à Dakar.
                </p>
                <p>
                  Elle assure désormais la régulation de l’ensemble des activités de production, de transport, de distribution et de vente d’électricité, ainsi que des segments intermédiaire et aval du secteur gazier, et du secteur aval des hydrocarbures.
                </p>
                <p>
                  La Commission veille à garantir l’équilibre économique et financier des secteurs régulés, la continuité et la qualité du service public, ainsi que la protection rigoureuse des droits des usagers et consommateurs.
                </p>
              </div>
            </div>

            {/* Illustration industrielle à droite */}
            <div className="overflow-hidden rounded-2xl shadow-xl aspect-[4/3] bg-slate-900 border border-slate-200">
              <img
                src={refineryImg}
                alt="Complexe industriel énergétique"
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION ORGANES DE GOUVERNANCE (FOND BLEU NUIT INSTITUTIONNEL) */}
      <section className="bg-gradient-to-b from-[#1b3e80] to-[#122e60] py-16 text-white">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
          <p className="text-center text-[18px] sm:text-[21px] font-semibold text-white/95 max-w-3xl mx-auto mb-12">
            Cette nouvelle loi renforce la gouvernance de la CRSE avec la mise en place de trois (3) organes :
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Organe 1 : Conseil de Régulation */}
            <div className="rounded-2xl bg-white/10 p-8 backdrop-blur-md border border-white/15 flex flex-col justify-between hover:bg-white/15 transition-all">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-shakespeare/30 text-shakespeare mb-6">
                  <Shield size={26} />
                </div>
                <h3 className="text-[20px] font-bold text-white mb-2">
                  Conseil de Régulation (CR)
                </h3>
                <span className="inline-block rounded-md bg-white/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-shakespeare mb-4">
                  Organe délibérant
                </span>
                <p className="text-[14px] leading-relaxed text-white/80">
                  Composé de membres nommés par décret présidentiel, le Conseil de Régulation est l'instance souveraine chargée d’arrêter les délibérations, décisions tarifaires, avis consultatifs et directives réglementaires applicables aux marchés de l'énergie.
                </p>
              </div>
            </div>

            {/* Organe 2 : Secrétariat Exécutif */}
            <div className="rounded-2xl bg-white/10 p-8 backdrop-blur-md border border-white/15 flex flex-col justify-between hover:bg-white/15 transition-all">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-shakespeare/30 text-shakespeare mb-6">
                  <Layers size={26} />
                </div>
                <h3 className="text-[20px] font-bold text-white mb-2">
                  Secrétariat Exécutif (SE)
                </h3>
                <span className="inline-block rounded-md bg-white/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-shakespeare mb-4">
                  Organe d'exécution
                </span>
                <p className="text-[14px] leading-relaxed text-white/80">
                  Dirigé par le Secrétaire Exécutif, il assure la gestion administrative, financière et technique quotidienne de la Commission. Il coordonne l’instruction des dossiers techniques soumis au Conseil de Régulation.
                </p>
              </div>
            </div>

            {/* Organe 3 : Comité de Règlement des Différends */}
            <div className="rounded-2xl bg-white/10 p-8 backdrop-blur-md border border-white/15 flex flex-col justify-between hover:bg-white/15 transition-all">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-shakespeare/30 text-shakespeare mb-6">
                  <Scale size={26} />
                </div>
                <h3 className="text-[20px] font-bold text-white mb-2">
                  Comité de Règlement des Différends (CRD)
                </h3>
                <span className="inline-block rounded-md bg-white/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-shakespeare mb-4">
                  Arbitrage & Recours
                </span>
                <p className="text-[14px] leading-relaxed text-white/80">
                  Instance indépendante chargée de régler les différends entre les opérateurs du secteur de l'énergie, ainsi qu'entre les opérateurs et les consommateurs, garantissant un recours impartial, équitable et gratuit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION COMITÉS CONSULTATIFS */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
          <p className="text-center text-[14px] sm:text-[15px] font-bold text-chathams-blue uppercase tracking-widest mb-10">
            LA CRSE A ÉGALEMENT CRÉÉ DES COMITÉS CONSULTATIFS DANS CHAQUE SECTEUR :
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-chathams-blue mb-4">
                <Building size={28} />
              </div>
              <h3 className="text-[18px] font-bold text-chathams-blue mb-2">
                Comité Consultatif des Administrations
              </h3>
              <p className="text-[13px] text-slate-600 leading-relaxed">
                Cadre de concertation avec les ministères, collectivités territoriales et institutions étatiques impliqués dans les politiques énergétiques.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-chathams-blue mb-4">
                <Users size={28} />
              </div>
              <h3 className="text-[18px] font-bold text-chathams-blue mb-2">
                Comité Consultatif des Consommateurs
              </h3>
              <p className="text-[13px] text-slate-600 leading-relaxed">
                Représentation officielle des usagers et des associations de défense des droits des consommateurs d'électricité, de gaz et de carburants.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-chathams-blue mb-4">
                <Briefcase size={28} />
              </div>
              <h3 className="text-[18px] font-bold text-chathams-blue mb-2">
                Comité Consultatif des Opérateurs
              </h3>
              <p className="text-[13px] text-slate-600 leading-relaxed">
                Plateforme d'échanges avec les producteurs, distributeurs, raffineurs et acteurs industriels des marchés régulés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION MISSIONS DE LA CRSE */}
      <section className="py-20">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12 text-center">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-[12px] font-bold text-chathams-blue uppercase tracking-wider mb-2">
            Régulation sectorielle
          </span>
          <h2 className="text-[clamp(32px,3.5vw,44px)] font-bold text-slate-900 mb-12">
            Missions <span className="text-shakespeare">de la CRSE</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Carte Électricité */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={electricImg}
                  alt="Secteur de l'électricité"
                  className="h-full w-full object-cover object-right hover:scale-105 transition-transform duration-500"
                />
                
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[20px] font-bold text-chathams-blue mb-2.5">
                    Secteur de l’électricité
                  </h3>
                  <p className="text-[14px] leading-relaxed text-slate-600">
                    Fixation des tarifs de vente, contrôle des investissements de la Senelec, régulation des concessions rurales, et surveillance des normes de continuité et de qualité de service.
                  </p>
                </div>
                <Link to="/electricite/acteurs" className="mt-5 text-[13px] font-bold text-chathams-blue hover:text-shakespeare inline-flex items-center gap-1">
                  En savoir plus <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Carte Hydrocarbures */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={petrolImg}
                  alt="Secteur aval des hydrocarbures"
                  className="h-full w-full object-cover object-right hover:scale-105 transition-transform duration-500"
                />
                
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[20px] font-bold text-chathams-blue mb-2.5">
                    Secteur aval des hydrocarbures
                  </h3>
                  <p className="text-[14px] leading-relaxed text-slate-600">
                    Élaboration de la structure mensuelle des prix des carburants et du gaz butane, contrôle des stocks de sécurité énergétique et délivrance des avis pour les licences d'exploitation.
                  </p>
                </div>
                <Link to="/hydrocarbures/acteurs" className="mt-5 text-[13px] font-bold text-chathams-blue hover:text-shakespeare inline-flex items-center gap-1">
                  En savoir plus <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Carte Gaz */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={gasImg}
                  alt="Segments gaziers"
                  className="h-full w-full object-cover object-right hover:scale-105 transition-transform duration-500"
                />
                
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[20px] font-bold text-chathams-blue mb-2.5">
                    Segments intermédiaire & aval gaziers
                  </h3>
                  <p className="text-[14px] leading-relaxed text-slate-600">
                    Établissement des codes de réseau pour les gazoducs nationaux, fixation des tarifs de transport et distribution du gaz naturel, et promotion du Gas-to-Power.
                  </p>
                </div>
                <Link to="/gaz/acteurs" className="mt-5 text-[13px] font-bold text-chathams-blue hover:text-shakespeare inline-flex items-center gap-1">
                  En savoir plus <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION NOS VALEURS */}
      <section className="py-16 bg-[#f8fafc] border-y border-slate-200">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
          <h2 className="text-[28px] font-bold text-chathams-blue mb-8">
            Nos Valeurs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              {
                title: 'Transparence',
                desc: 'Accessibilité totale de l’information réglementaire et ouverture des décisions aux consultations publiques.',
              },
              {
                title: 'Indépendance',
                desc: 'Prise de décision impartiale et autonome, affranchie de toute pression politique ou commerciale.',
              },
              {
                title: 'Intégrité',
                desc: 'Attachement strict à la déontologie, à la probité morale et au respect des principes constitutionnels.',
              },
              {
                title: 'Expertise',
                desc: 'Rigueur scientifique et technique assurée par un collège de spécialistes chevronnés en droit, économie et ingénierie.',
              },
              {
                title: 'Proximité',
                desc: 'Écoute permanente des préoccupations citoyennes et dialogue continu avec les consommateurs des 14 régions.',
              },
            ].map((v) => (
              <div key={v.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-[17px] font-bold text-chathams-blue mb-2">
                  {v.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-slate-600">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SECTION NOS ATTRIBUTIONS */}
      <section className="py-20">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
          <h2 className="text-[28px] font-bold text-chathams-blue mb-10">
            Nos Attributions
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Colonne 1 : Contrôle financier et suivi des opérateurs */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <h3 className="text-[18px] font-bold text-chathams-blue mb-3 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-shakespeare" />
                  <span>En matière de contrôle financier et de suivi des activités :</span>
                </h3>

                <h4 className="text-[14px] font-bold text-slate-800 uppercase tracking-wider mt-4 mb-2">
                  La CRSE émet un avis consultatif sur :
                </h4>
                <ul className="space-y-2 text-[14px] text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-shakespeare font-bold">›</span>
                    <span>Les projets de textes législatifs ou réglementaires régissant les secteurs de l’électricité, du gaz et des hydrocarbures.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-shakespeare font-bold">›</span>
                    <span>L’octroi, la modification, le renouvellement ou le retrait des licences et concessions de service public.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-shakespeare font-bold">›</span>
                    <span>Les plans d’investissement et programmes de développement des opérateurs sous contrat de concession.</span>
                  </li>
                </ul>

                <h4 className="text-[14px] font-bold text-slate-800 uppercase tracking-wider mt-6 mb-2">
                  La CRSE est chargée, de manière décisionnelle :
                </h4>
                <ul className="space-y-2 text-[14px] text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-chathams-blue font-bold">✓</span>
                    <span>De fixer les tarifs et grilles tarifaires de l’électricité selon des principes économiques transparents.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chathams-blue font-bold">✓</span>
                    <span>De contrôler la conformité des coûts d’exploitation et le revenu maximum autorisé des opérateurs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chathams-blue font-bold">✓</span>
                    <span>D’auditer périodiquement les performances de gestion et la rentabilité financière des exploitants de réseaux.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chathams-blue font-bold">✓</span>
                    <span>D'infliger des sanctions administratives et pécuniaires en cas de manquements aux obligations réglementaires.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Colonne 2 : Réglementation technique et tarification */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <h3 className="text-[18px] font-bold text-chathams-blue mb-3 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-shakespeare" />
                  <span>En matière de réglementation technique :</span>
                </h3>
                <p className="text-[14px] text-slate-600 mb-3">
                  La CRSE est chargée notamment :
                </p>
                <ul className="space-y-2.5 text-[14px] text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-shakespeare font-bold">›</span>
                    <span>D'approuver les règles de sécurité technique, de fiabilité des installations et d’interconnexion aux réseaux.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-shakespeare font-bold">›</span>
                    <span>De veiller au respect des normes de qualité de l’énergie délivrée aux usagers (tension, fréquence, coupures).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-shakespeare font-bold">›</span>
                    <span>D'établir et de réviser les codes de réseau de transport et de distribution de gaz et d'électricité.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <h3 className="text-[18px] font-bold text-chathams-blue mb-3 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-shakespeare" />
                  <span>En matière de tarification :</span>
                </h3>
                <p className="text-[14px] text-slate-600 leading-relaxed">
                  Elle assure la péréquation des tarifs, protège les ménages à revenus modestes grâce à la tranche sociale subventionnée, et calcule mensuellement les barèmes plafonds des produits pétroliers et du gaz butane.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Raccourci vers les documents */}
      <div className="border-t border-slate-200 bg-slate-50 py-10 text-center">
        <p className="text-[16px] font-semibold text-chathams-blue mb-4">
          Vous souhaitez consulter les textes législatifs et rapports officiels de la CRSE ?
        </p>
        <Button asChild className="rounded-full bg-chathams-blue text-white px-8">
          <Link to="/documents">Accéder à la bibliothèque documentaire</Link>
        </Button>
      </div>
    </div>
  )
}
