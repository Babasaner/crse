import { Link } from 'react-router-dom'
import {
  Zap,
  MapPin,
  ArrowLeft,
} from 'lucide-react'
import { PageBanner } from '../../components/shared/PageBanner'
import { Button } from '../../components/ui/button'

const sampleConcessions = [
  {
    concessionnaire: 'COMASEL Saint-Louis',
    societe: 'Compagnie Maroco-Sénégalaise d’Électricité',
    perimetre: 'Concession de Saint-Louis / Dagana / Podor',
    description: 'Dessert des dizaines de milliers de ménages et d’exploitations agricoles le long de la vallée du fleuve Sénégal à partir de réseaux moyenne et basse tension.',
    badge: 'Nord Sénégal',
  },
  {
    concessionnaire: 'COMASEL Louga',
    societe: 'Compagnie Maroco-Sénégalaise d’Électricité',
    perimetre: 'Concession de Louga / Linguère / Kébémer',
    description: 'Électrification de zones agropastorales et rurales dans le bassin arachidier et le Ferlo avec solutions hybrides et raccordements au réseau.',
    badge: 'Zone Sylvopastorale',
  },
  {
    concessionnaire: 'SCL Énergie Solutions',
    societe: 'Groupement Coselec / Câbleries du Sénégal',
    perimetre: 'Concession de Mbour et Petite Côte rurale',
    description: 'Couvre les localités rurales du département de Mbour, reliant les zones touristiques, halieutiques et agricoles aux infrastructures électriques.',
    badge: 'Petite Côte',
  },
  {
    concessionnaire: 'ERA (Énergie Rurale Africaine)',
    societe: 'Consortium ERA Sénégal',
    perimetre: 'Concession de Kaffrine / Tambacounda / Kédougou',
    description: 'Plus vaste concession rurale du pays, apportant l’électricité dans le Sénégal oriental à travers des extensions de réseau et des centrales solaires décentralisées.',
    badge: 'Sénégal Oriental',
  },
]

export function ConcessionnairesRurauxPage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <PageBanner
        eyebrow="Secteur Électricité · Acteur Opérationnel"
        title="Concessionnaires d'Électrification Rurale (CER)"
        description="Présentation des opérateurs privés concessionnaires chargés de la distribution et de la fourniture de l’électricité dans les zones rurales sénégalaises non interconnectées."
      />

      <main className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-12">
        {/* Navigation retour & En-tête */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">
              Accès Universel à l'Électricité
            </span>
            <h2 className="text-[26px] sm:text-[32px] font-extrabold text-chathams-blue mt-1">
              Les Concessionnaires d'Électrification Rurale (CER)
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
              <Link to="/electricite/agences">
                <span>Voir l'Agence ASER</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Définition officielle & Mission */}
        <div className="rounded-3xl bg-white p-8 sm:p-10 shadow-sm border border-slate-200 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-[12px] font-bold text-emerald-800 mb-4">
            <Zap size={16} />
            <span>Définition & Périmètre</span>
          </div>

          <h3 className="text-[22px] sm:text-[26px] font-bold text-slate-900 leading-snug">
            Le Modèle Concessionnaire Rural au Sénégal
          </h3>

          <div className="mt-4 p-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-white to-blue-50/50 border-l-4 border-emerald-600">
            <p className="text-[17px] sm:text-[18px] text-slate-800 font-medium leading-relaxed italic">
              « Opérateurs privés chargés de l’électrification des zones non interconnectées (ERA, COMASEL, etc.) sous contrat de concession de service public (CER). »
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-[15px] text-slate-600 leading-relaxed">
            <div>
              <h4 className="text-[16px] font-bold text-chathams-blue mb-2">
                Périmètres Concédés par l'État
              </h4>
              <p>
                Afin d'accélérer l'accès à l'énergie en milieu rural, le Sénégal a découpé le territoire en concessions d'électrification rurale attribuées à des opérateurs privés par voie d'appel d'offres international coordonné par l'<strong>ASER</strong>.
              </p>
            </div>

            <div>
              <h4 className="text-[16px] font-bold text-chathams-blue mb-2">
                Régulation & Protection des Abonnés Ruraux
              </h4>
              <p>
                La CRSE veille à l'application du <strong>principe d'harmonisation tarifaire</strong> afin que les usagers ruraux bénéficient de conditions de tarification équitables, tout en contrôlant la conformité des compteurs et les délais de raccordement.
              </p>
            </div>
          </div>
        </div>

        {/* Cartographie des Concessions Actives */}
        <div className="mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">
                Opérateurs Répertoriés
              </span>
              <h3 className="text-[24px] sm:text-[28px] font-bold text-slate-900">
                Les Principales Concessions Rurales Régulées
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleConcessions.map((c, idx) => (
              <article
                key={idx}
                className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                      {c.badge}
                    </span>
                    <span className="text-[12px] text-slate-400 font-semibold">Titre de Concession</span>
                  </div>

                  <h4 className="text-[20px] font-bold text-slate-900 leading-snug">
                    {c.concessionnaire}
                  </h4>
                  <p className="text-[13px] font-semibold text-shakespeare mt-0.5 mb-2">
                    {c.societe}
                  </p>

                  <div className="flex items-center gap-2 text-[13px] font-semibold text-chathams-blue mb-4">
                    <MapPin size={15} className="shrink-0 text-shakespeare" />
                    <span>{c.perimetre}</span>
                  </div>

                  <p className="text-[14px] text-slate-600 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[13px]">
                  <span className="text-slate-500">Tarif régulé CRSE</span>
                  <Link
                    to="/reclamations"
                    className="font-bold text-chathams-blue hover:text-shakespeare inline-flex items-center gap-1"
                  >
                    <span>Réclamation d'usager →</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Liens avec les CERD */}
        <div className="rounded-3xl bg-slate-900 p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold text-shakespeare uppercase tracking-widest">
              Solutions Hors Réseau & Décentralisées
            </span>
            <h3 className="text-[22px] sm:text-[26px] font-bold mt-1 mb-2">
              Découvrir les CERD (Électrification Décentralisée)
            </h3>
            <p className="text-[14px] text-slate-300 leading-relaxed">
              Pour les villages éloignés des dorsales de réseau, découvrez le cadre des Concessionnaires d'Électrification Rurale Décentralisée (mini-réseaux et kits solaires).
            </p>
          </div>

          <Button asChild className="rounded-full bg-shakespeare px-8 py-3.5 font-bold text-white hover:bg-shakespeare/90 shrink-0">
            <Link to="/electricite/concessionnaires-decentralises">
              <span>Voir les CERD</span>
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
