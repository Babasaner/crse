import { Link } from 'react-router-dom'
import { ExternalLink, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { PageBanner } from '../../components/shared/PageBanner'
import { Button } from '../../components/ui/button'

const agences = [
  {
    sigle: 'ASER',
    nom: 'Agence Sénégalaise d’Électrification Rurale',
    logo: 'https://www.crse.sn/wp-content/uploads/2026/09/aserlogo.png',
    siteUrl: 'https://aser.sn/',
    badge: 'Électrification Rurale',
    role: "L'ASER est chargée de mettre en œuvre les programmes d'électrification rurale définis par le ministère chargé de l'Énergie afin de garantir l'accès universel à l'électricité à l'horizon 2029.",
    missions: [
      "Apporter une assistance technique et financière aux entreprises et particuliers pour le développement de l'électricité en milieu rural",
      "Organiser et superviser les appels d'offres pour l'octroi des concessions d'électrification rurale (CER) et des concessions décentralisées (CERD)",
      "Statuer sur les projets spontanés soumis par les opérateurs privés et veiller au respect des cahiers des charges",
      "Promouvoir les technologies innovantes pour l'électrification des zones isolées et non interconnectées"
    ],
    cadre: "Créée par la loi n° 98-29 et régie par les dispositions du Code de l'Électricité.",
  },
  {
    sigle: 'ANER',
    nom: 'Agence Nationale pour les Énergies Renouvelables',
    logo: 'https://www.crse.sn/wp-content/uploads/2026/03/aner-logo-2048x605.png',
    siteUrl: 'https://aner.sn/',
    badge: 'Énergies Propres & Renouvelables',
    role: "L'ANER a pour mission principale la promotion, l'encouragement et le développement des énergies alternatives et renouvelables sous toutes leurs formes sur l'ensemble du territoire sénégalais.",
    missions: [
      "Promouvoir l'utilisation de l'énergie solaire, éolienne, de la biomasse, du biogaz, de la petite hydraulique et des énergies marines",
      "Élaborer et exécuter les plans et programmes nationaux de développement des énergies renouvelables",
      "Participer à la recherche et à l'innovation technologique en matière d'équipements énergétiques propres",
      "Accompagner les collectivités territoriales, les ménages et les industriels dans l'adoption de solutions solaires autonomes et hybrides"
    ],
    cadre: "Établissement public sous tutelle du Ministère chargé de l'Énergie.",
  },
  {
    sigle: 'AEME',
    nom: 'Agence pour l’Économie et la Maîtrise de l’Énergie',
    logo: 'https://www.crse.sn/wp-content/uploads/2026/03/aeme-LOGO.png',
    siteUrl: 'https://aeme.sn/',
    badge: 'Efficacité Énergétique',
    role: "L'AEME participe activement à la mise en œuvre de la politique énergétique nationale dans les domaines de l'utilisation rationnelle de l'énergie et de l'efficacité énergétique.",
    missions: [
      "Conseiller et apporter son expertise technique aux entreprises, industries, collectivités locales et pouvoirs publics",
      "Conduire et certifier des audits énergétiques obligatoires dans les grands bâtiments publics et les unités industrielles",
      "Soutenir le financement et la réalisation de projets d'efficacité énergétique et d'éclairage public intelligent",
      "Sensibiliser les consommateurs aux gestes d'économie d'énergie pour alléger la facture des ménages"
    ],
    cadre: "Bras technique de l'État pour la maîtrise de la demande énergétique.",
  },
]

export function AgencesPage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <PageBanner
        eyebrow="Secteur Électricité · Acteurs Institutionnels"
        title="Les Agences du Secteur de l’Énergie"
        description="Présentation des agences publiques spécialisées de l’État du Sénégal œuvrant pour l’électrification rurale, le développement des énergies renouvelables et l’efficacité énergétique."
      />

      <main className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-12">
        {/* Navigation retour & Contexte */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">
              Architecture Institutionnelle
            </span>
            <h2 className="text-[24px] sm:text-[28px] font-bold text-chathams-blue mt-1">
              Trois Agences Clés au Service de la Politique Énergétique
            </h2>
          </div>

          <Button asChild variant="outline" className="rounded-full gap-2 border-slate-300">
            <Link to="/electricite">
              <ArrowLeft size={16} />
              <span>Retour au Secteur Électricité</span>
            </Link>
          </Button>
        </div>

        {/* Grille détaillée des 3 agences */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {agences.map((agence) => (
            <article
              key={agence.sigle}
              className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Logo de l'agence */}
                <div className="flex h-24 items-center justify-center rounded-2xl bg-slate-50 p-4 border border-slate-100 mb-6">
                  <img
                    src={agence.logo}
                    alt={agence.nom}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>

                <div className="inline-block rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-chathams-blue mb-3">
                  {agence.badge}
                </div>

                <h3 className="text-[20px] font-bold text-slate-900 leading-snug">
                  {agence.sigle}
                </h3>
                <p className="text-[13px] font-semibold text-shakespeare mt-0.5">
                  {agence.nom}
                </p>

                <p className="mt-4 text-[14px] leading-relaxed text-slate-600">
                  {agence.role}
                </p>

                <div className="mt-6 border-t border-slate-100 pt-5">
                  <h4 className="text-[12px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Missions Principales
                  </h4>
                  <ul className="space-y-2.5 text-[13px] text-slate-600">
                    {agence.missions.map((m, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-shakespeare shrink-0 mt-0.5" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100">
                <Button
                  asChild
                  className="w-full rounded-full bg-chathams-blue text-white hover:bg-shakespeare transition-colors gap-2"
                >
                  <a href={agence.siteUrl} target="_blank" rel="noopener noreferrer">
                    <span>Visiter le site officiel</span>
                    <ExternalLink size={15} />
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Encadré de coordination réglementaire */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-blue-900 to-chathams-blue p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold text-shakespeare uppercase tracking-widest">
              Régulation & Coordination
            </span>
            <h3 className="text-[22px] sm:text-[26px] font-bold mt-1 mb-2">
              Le Rôle de la CRSE auprès des Agences
            </h3>
            <p className="text-[14px] sm:text-[15px] text-blue-100 leading-relaxed">
              La CRSE collabore étroitement avec l'ASER pour la fixation et l'approbation des tarifs applicables dans les concessions rurales, tout en veillant aux normes de qualité et d'interconnexion pour les projets portés par l'ANER et l'AEME.
            </p>
          </div>

          <Button asChild className="rounded-full bg-white text-chathams-blue font-bold px-8 hover:bg-blue-50 shrink-0">
            <Link to="/presentation">
              <span>Découvrir la CRSE</span>
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
