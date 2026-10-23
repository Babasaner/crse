import { Link, useParams } from 'react-router-dom'
import {
  ArrowRight,
  Shield,
  Zap,
  Users,
  Briefcase,
  Newspaper
} from 'lucide-react'
import { PageBanner } from '../components/shared/PageBanner'
import { Button } from '../components/ui/button'

type HubInfo = {
  eyebrow: string
  title: string
  description: string
  icon: React.ElementType
  submenus: {
    title: string
    description: string
    to: string
    badge?: string
  }[]
}

const hubConfig: Record<string, HubInfo> = {
  'la-crse': {
    eyebrow: 'Institution',
    title: 'La CRSE — Autorité de Régulation',
    description: 'Créée par la loi n° 2021-32, la Commission de Régulation du Secteur de l’Énergie veille avec indépendance et impartialité à l’équilibre économique, financier et technique des marchés régulés.',
    icon: Shield,
    submenus: [
      {
        title: 'Mot du Président',
        description: 'La vision stratégique, les priorités de la régulation et les orientations de la Commission par le Président Ibrahima Niane.',
        to: '/mot-du-president',
      },
      {
        title: 'Présentation & Missions',
        description: 'Missions consultatives, compétences décisionnelles, cadre législatif et périmètre d’intervention au Sénégal.',
        to: '/presentation',
      },
      {
        title: 'Organisation & Gouvernance',
        description: 'Découvrez la composition du Collège des régulateurs, les comités spécialisés et les directions opérationnelles.',
        to: '/organisation',
      },
      {
        title: 'Politique Qualité',
        description: 'L’engagement de la CRSE dans la certification, la transparence des procédures et la satisfaction des usagers.',
        to: '/politique-qualite',
      },
    ],
  },
  'secteurs': {
    eyebrow: 'Régulation Sectorielle',
    title: 'Les Secteurs Régulés',
    description: 'La CRSE encadre et régule les activités de production, de transport, de distribution et de vente d’électricité, ainsi que l’aval des hydrocarbures et la chaîne gazière.',
    icon: Zap,
    submenus: [
      {
        title: 'Secteur de l’Électricité',
        description: 'Opérateur historique Senelec, producteurs indépendants d’électricité (IPP), concessions rurales et grilles tarifaires.',
        to: '/electricite/acteurs',
        badge: 'Acteurs & Tarifs',
      },
      {
        title: 'Aval des Hydrocarbures',
        description: 'Raffinage, importation, stockage, distribution des carburants, gaz butane et surveillance des barèmes mensuels.',
        to: '/hydrocarbures/acteurs',
        badge: 'Prix & Contrôles',
      },
      {
        title: 'Segments Aval & Intermédiaire Gaziers',
        description: 'Organisation de l’accès des tiers aux gazoducs nationaux, transport, liquéfaction et valorisation du gaz local.',
        to: '/gaz/acteurs',
        badge: 'Marché Gazier',
      },
    ],
  },
  'consommateurs': {
    eyebrow: 'Défense des Droits',
    title: 'Espace Consommateurs & Usagers',
    description: 'La CRSE protège les intérêts des usagers, veille à la qualité continue des services énergétiques et offre une voie de recours gratuite en cas de litige.',
    icon: Users,
    submenus: [
      {
        title: 'Faire une Réclamation',
        description: 'Formulaire de saisine de la CRSE en cas de litige non résolu avec votre fournisseur d’électricité ou de gaz.',
        to: '/reclamations',
        badge: 'Guichet Unique',
      },
      {
        title: 'Guide du Consommateur',
        description: 'Comprendre vos factures, le fonctionnement de Woyofal, vos droits de raccordement et les conseils d’économie d’énergie.',
        to: '/consommateurs/guide',
      },
      {
        title: 'Associations de Consommateurs',
        description: 'Représentation des usagers, rôle consultatif auprès du Collège et participation aux audiences publiques.',
        to: '/consommateurs/associations',
      },
      {
        title: 'Foire Aux Questions (FAQ)',
        description: 'Toutes les réponses aux interrogations fréquentes sur l’énergie, les coupures, les compteurs et les tarifs.',
        to: '/faq',
      },
    ],
  },
  'operateurs': {
    eyebrow: 'Acteurs Industriels & Investisseurs',
    title: 'Espace Opérateurs & Investisseurs',
    description: 'Cadre réglementaire, octroi des licences, obligations de service public, règles d’accès aux réseaux et procédures de conciliation pour les entreprises du secteur énergétique.',
    icon: Briefcase,
    submenus: [
      {
        title: 'Opérateurs sur les Marchés',
        description: 'Droits, devoirs, respect des standards de qualité et obligations contractuelles des concessionnaires et distributeurs.',
        to: '/operateurs/marches',
      },
      {
        title: 'Livret de l’Investisseur',
        description: 'Guide officiel des opportunités d’investissement, sécurité juridique et cadre incitatif de la transition énergétique.',
        to: '/operateurs/livret-investisseur',
      },
      {
        title: 'Bibliothèque Documentaire',
        description: 'Accédez aux lois, arrêtés, délibérations tarifaires et textes techniques applicables aux opérateurs.',
        to: '/documents',
      },
    ],
  },
  'medias': {
    eyebrow: 'Presse & Communication',
    title: 'Espace Presse & Médias',
    description: 'Toutes les ressources d’information publique de la CRSE : communiqués officiels, calendrier des consultations, reportages et dossiers de presse.',
    icon: Newspaper,
    submenus: [
      {
        title: 'Actualités Récentes',
        description: 'Articles, communiqués de presse, annonces officielles et reportages sur les activités de la Commission.',
        to: '/actualites',
        badge: 'En continu',
      },
      {
        title: 'Agenda des Événements',
        description: 'Dates des prochaines consultations publiques, audiences foraines et ateliers régionaux d’information.',
        to: '/agenda',
        badge: 'Calendrier',
      },
      {
        title: 'Recrutement & Carrières',
        description: 'Consultez les offres d’emploi et opportunités de stage au sein de nos équipes spécialisées.',
        to: '/recrutement',
      },
      {
        title: 'Contactez-nous',
        description: 'Adresses géographiques, coordonnées des services et formulaire de contact direct.',
        to: '/contact',
      },
    ],
  },
}

export function HubPage({ hubKey }: { hubKey?: string }) {
  const params = useParams()
  const key = hubKey ?? params.hub ?? 'la-crse'
  const hub = hubConfig[key] ?? hubConfig['la-crse']
  const Icon = hub.icon

  return (
    <>
      <PageBanner
        eyebrow={hub.eyebrow}
        title={hub.title}
        description={hub.description}
      />

      <main className="mx-auto w-full max-w-[1440px] px-6 py-14 lg:px-12">
        {/* Présentation introductive */}
        <div className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-2xl bg-slate-50 p-8 border border-slate-200">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-chathams-blue p-3.5 text-white shrink-0">
              <Icon size={28} />
            </div>
            <div>
              <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">
                Portail Thématique
              </span>
              <h2 className="text-[24px] font-bold text-chathams-blue mt-0.5">
                Explorer cette rubrique
              </h2>
              <p className="text-[15px] text-slate-600 mt-1 max-w-2xl">
                Sélectionnez l'une des sections ci-dessous pour accéder aux dossiers détaillés, démarches et publications associées.
              </p>
            </div>
          </div>
        </div>

        {/* Grille des sous-menus avec cartes interactives */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hub.submenus.map((item, index) => (
            <div
              key={item.to}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:border-chathams-blue hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-[14px] font-bold text-chathams-blue group-hover:bg-chathams-blue group-hover:text-white transition-colors">
                    0{index + 1}
                  </span>
                  {item.badge && (
                    <span className="rounded-full bg-shakespeare/15 px-3 py-1 text-[11px] font-bold text-shakespeare uppercase">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-[20px] font-bold text-chathams-blue group-hover:text-shakespeare transition-colors mb-2.5">
                  {item.title}
                </h3>
                <p className="text-[14px] text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-chathams-blue group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
                  Accéder à la section <ArrowRight size={15} />
                </span>
                <Button asChild size="sm" className="rounded-full bg-chathams-blue text-white group-hover:bg-shakespeare transition-colors">
                  <Link to={item.to}>
                    <span>Consulter</span>
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
