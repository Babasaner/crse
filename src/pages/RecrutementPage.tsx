import { useState } from 'react'
import {
  Briefcase,
  GraduationCap,
  Users,
  Mail,
  Clock,
  MapPin
} from 'lucide-react'
import { PageBanner } from '../components/shared/PageBanner'
import { Button } from '../components/ui/button'

const jobOffers = [
  {
    id: 1,
    title: 'Juriste Spécialiste en Droit de l’Énergie & Contentieux',
    department: 'Direction des Affaires Juridiques',
    location: 'Dakar (Siège)',
    contract: 'CDI',
    deadline: '15 Mai 2025',
    description: 'Rattaché(e) au Directeur Juridique, vous assurez l’analyse des litiges, la rédaction des avis consultatifs et la conformité des projets d’arrêtés et délibérations avec la loi 2021-32.',
    requirements: ['Master 2 en Droit Public des Affaires / Droit de l’Énergie', '5 ans minimum d’expérience dans une autorité de régulation ou un cabinet d’avocats', 'Excellente maîtrise du contentieux contractuel'],
  },
  {
    id: 2,
    title: 'Économiste de la Régulation Tarifaire Électrique & Gazière',
    department: 'Direction Économique & Tarifaire',
    location: 'Dakar (Siège)',
    contract: 'CDI',
    deadline: '20 Mai 2025',
    description: 'En charge de la modélisation financière des coûts de revient des opérateurs et de l’audit annuel du revenu maximum autorisé des concessions de service public.',
    requirements: ['Diplôme d’ingénieur statisticien économiste ou Master Économie appliquée', 'Expérience confirmée dans la tarification d’infrastructures de réseau', 'Maîtrise avancée des modèles financiers sous Excel / Python / R'],
  },
]

export function RecrutementPage() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null)

  return (
    <>
      <PageBanner
        eyebrow="Carrières & Talents"
        title="Rejoindre la CRSE"
        description="Contribuez à la souveraineté et à l'équilibre énergétique du Sénégal au sein d’une institution d’excellence réunissant juristes, ingénieurs et économistes chevronnés."
      />

      <main className="mx-auto w-full max-w-[1440px] px-6 py-14 lg:px-12">
        {/* Piliers RH & Culture */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[13px] font-bold text-shakespeare uppercase tracking-wider">
              Pourquoi nous rejoindre ?
            </span>
            <h2 className="text-[30px] font-bold text-chathams-blue mt-1">
              Une mission d'intérêt général au cœur de la transition
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="rounded-xl bg-blue-50 p-3 w-fit text-chathams-blue mb-4">
                <Briefcase size={22} />
              </div>
              <h3 className="text-[18px] font-bold text-chathams-blue mb-2">Expertise stratégique</h3>
              <p className="text-[14px] text-slate-600 leading-relaxed">
                Intervenez sur des projets d'envergure nationale : développement du réseau gazier, intégration des énergies renouvelables et réformes tarifaires majeures.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="rounded-xl bg-blue-50 p-3 w-fit text-chathams-blue mb-4">
                <GraduationCap size={22} />
              </div>
              <h3 className="text-[18px] font-bold text-chathams-blue mb-2">Formation continue de pointe</h3>
              <p className="text-[14px] text-slate-600 leading-relaxed">
                Accès privilégié aux programmes de certification internationale de régulation (formation BADGE, échanges avec les régulateurs de la CEDEAO et du RERA).
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="rounded-xl bg-blue-50 p-3 w-fit text-chathams-blue mb-4">
                <Users size={22} />
              </div>
              <h3 className="text-[18px] font-bold text-chathams-blue mb-2">Éthique et indépendance</h3>
              <p className="text-[14px] text-slate-600 leading-relaxed">
                Un environnement professionnel stimulant fondé sur la rigueur scientifique, l'intégrité déontologique et l'impact direct sur le bien-être des usagers.
              </p>
            </div>
          </div>
        </div>

        {/* Offres d'emploi en cours */}
        <div className="mb-16">
          <h2 className="text-[24px] font-bold text-chathams-blue mb-6">
            Appels à candidatures & Postes ouverts
          </h2>

          <div className="space-y-4">
            {jobOffers.map((job) => (
              <div
                key={job.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-shakespeare/70 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <div>
                    <span className="rounded-md bg-chathams-blue/10 px-2.5 py-1 text-[12px] font-bold text-chathams-blue mr-3">
                      {job.contract}
                    </span>
                    <span className="text-[13px] text-slate-500">{job.department}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[13px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {job.location}
                    </span>
                    <span className="flex items-center gap-1 text-red-600 font-semibold">
                      <Clock size={14} /> Clôture : {job.deadline}
                    </span>
                  </div>
                </div>

                <h3 className="text-[20px] font-bold text-[#1b3e80] mb-2">{job.title}</h3>
                <p className="text-[14px] text-slate-600 leading-relaxed mb-4">{job.description}</p>

                {selectedJob === job.id && (
                  <div className="mb-4 rounded-xl bg-slate-50 p-4 border border-slate-200 text-[14px] animate-fade-in">
                    <strong className="block text-slate-800 mb-2">Profil & Prérequis :</strong>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600">
                      {job.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                    className="text-[13px] font-semibold text-shakespeare hover:underline"
                  >
                    {selectedJob === job.id ? 'Masquer les détails' : 'Voir le profil complet'}
                  </button>

                  <Button asChild size="sm" className="rounded-full bg-chathams-blue text-white px-5">
                    <a href={`mailto:recrutement@crse.sn?subject=Candidature - ${encodeURIComponent(job.title)}`}>
                      Postuler par email
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Candidature spontanée */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-chathams-blue p-8 lg:p-12 text-white shadow-xl">
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold text-shakespeare tracking-widest uppercase">
              Aucune offre ne correspond à votre profil ?
            </span>
            <h2 className="text-[28px] font-bold mt-1 mb-4">
              Déposez une candidature spontanée
            </h2>
            <p className="text-[15px] text-white/80 leading-relaxed mb-6">
              Nous sommes constamment en quête d’experts du domaine de l’énergie, de consultants sectoriels et de jeunes talents désireux d’effectuer un stage de perfectionnement.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild className="rounded-full bg-white text-chathams-blue font-bold px-8 hover:bg-white/90">
                <a href="mailto:recrutement@crse.sn?subject=Candidature Spontanée - CRSE">
                  <Mail className="mr-2 h-4 w-4" />
                  Envoyer CV et lettre à recrutement@crse.sn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
