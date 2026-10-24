import { useState, useMemo } from 'react'
import {
  Users,
  Search,
  UserCheck,
  MapPin,
  Mail,
  Phone,
  Globe,
  ExternalLink,
  ShieldCheck,
  FileText,
  MessageSquare
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageBanner } from '../components/shared/PageBanner'

interface Association {
  id: string
  sigle: string
  nomComplet: string
  president: string
  adresse?: string
  email?: string
  telephone?: string
  siteWeb?: string
  description?: string
}

const associationsData: Association[] = [
  {
    id: 'adec',
    sigle: 'ADEC',
    nomComplet: 'Association pour la Défense de l’Environnement et des Consommateurs',
    president: 'Maguette Fall',
    adresse: 'DEEPS de Rufisque',
    email: 'adec_cons@yahoo.fr',
    telephone: '77 687 03 00 / 77 551 61 71'
  },
  {
    id: 'adeetels',
    sigle: 'ADEETéLS',
    nomComplet: 'Association de Défense des usagers de l’Eau, de L’Electricité, des Télécommunications et des Services',
    president: 'Madame Anne Marie SOW',
    adresse: 'Cité Air Afrique II villa N° 10, Ouest foire',
    email: 'adeetels@gmail.com'
  },
  {
    id: 'fesac',
    sigle: 'FESAC',
    nomComplet: 'Fédération Sénégalaise des Associations de Consommateurs',
    president: 'Youssoupha SARR',
    adresse: 'Villa N° 34, Rue D – Fann Résidence',
    email: 'youssarr@yahoo.fr',
    telephone: '76 685 30 50'
  },
  {
    id: 'rusp',
    sigle: 'RUSP',
    nomComplet: 'Réseau des Usagers du Service Public',
    president: 'Jean Pierre DIENG',
    adresse: 'Sicap Amitié 1, villa N°3065 Dakar'
  },
  {
    id: 'fojcosen',
    sigle: 'FOJCOSEN',
    nomComplet: 'Forum des Jeunes Consommateurs du Sénégal',
    president: 'Monsieur Seydina Mame Alassane SOW LAHI',
    adresse: 'Médina rue 33×06, Dakar',
    email: 'fojcosen1@gmail.com',
    telephone: '77 665 80 20'
  },
  {
    id: 'cicodev',
    sigle: 'CICODEV',
    nomComplet: 'Citoyenneté-Consommateurs et Développement en Afrique',
    president: 'Amadou KANOUTE (Directeur Exécutif)',
    adresse: '78C16, BVD Charles De Gaulle',
    email: 'cicodevafrica@cicodev.org',
    telephone: '78 124 68 84'
  },
  {
    id: 'lcs',
    sigle: 'LCS',
    nomComplet: 'Ligue des Consommateurs du Sénégal',
    president: 'Pr El hadji NIANG',
    adresse: 'N°34 Rue D, Fann Résidences, Dakar',
    email: 'leconsommateurdusenegal@gmail.com',
    telephone: '77 693 49 44'
  },
  {
    id: 'modiec',
    sigle: 'MODIEC',
    nomComplet: 'Mouvement pour la Défense, l’Information et l’Education des Consommateurs',
    president: 'Mme Aminata BARRO',
    adresse: 'Scat Urbam N° 12, 3e étage BP 7505',
    email: 'modiec1@yahoo.fr',
    telephone: '77 321 75 45'
  },
  {
    id: 'ecocitoyen',
    sigle: 'ECOCITOYEN',
    nomComplet: 'Environnement, Consommation, Citoyenneté',
    president: 'Souleymane NDIAYE',
    adresse: 'Villa M 10 Hann Maristes, Dakar',
    email: 'lecocitoyen@gmail.com',
    telephone: '77 561 67 57'
  },
  {
    id: 'sos-consommateurs',
    sigle: 'SOS CONSOMMATEURS',
    nomComplet: 'Association SOS Consommateurs Sénégal',
    president: 'Maître Massokhna Kane',
    adresse: 'Sicap Mermoz, 1ère Porte, Villa N°7135',
    email: 'sosconsommateurs18@gmail.com',
    telephone: '+221 77 117 44 44',
    siteWeb: 'https://www.sosconsommateurs.org'
  },
  {
    id: 'uncs',
    sigle: 'UNCS',
    nomComplet: 'Union Nationale des Consommateurs du Sénégal',
    president: 'Ibrahima DRAME',
    adresse: 'Sicap Amitié 1 Villa n°3065, Dakar',
    email: 'uncs2007@gmail.com',
    telephone: '77 618 93 00',
    siteWeb: 'https://www.uncs.sn'
  },
  {
    id: 'ascosen',
    sigle: 'ASCOSEN',
    nomComplet: 'Association des Consommateurs du Sénégal',
    president: 'Momar NDAO',
    adresse: 'Villa n° 10066 rue ZGMOZ Immeuble Serigne Babacar SY',
    email: 'ascosen@gmail.com',
    telephone: '77 635 07 07'
  },
  {
    id: 'gress',
    sigle: 'GRESS',
    nomComplet: 'Groupe Energie Environnement Sénégal',
    president: 'Cheikh M. H. DIENG',
    adresse: 'Unité 6, villa N°167 Parcelles Assainies Dakar',
    email: 'educatecgrees@gmail.com',
    telephone: '77 645 81 59'
  },
  {
    id: 'a2cn',
    sigle: 'A2CN',
    nomComplet: 'Action Citoyenne pour la Consommation et la Normalisation',
    president: 'Amadou SOW',
    adresse: 'SICAP MERMOZ, 1ére Porte villa N° 7135',
    email: 'a2cons.sn@gmail.com',
    telephone: '77 430 30 28'
  },
  {
    id: 'asnu',
    sigle: 'ASNU',
    nomComplet: 'Association Sénégalaise pour les Nations Unies',
    president: 'Maguatte THIAM',
    email: 'bathie130@gmail.com',
    telephone: '77 650 15 97'
  },
  {
    id: 'asdic',
    sigle: 'ASDIC',
    nomComplet: 'Association Sénégalaise de Défense des Intérêts Communs des Consommateurs',
    president: 'Papa Djibril Ndiaye',
    adresse: 'Rue 33x 28 Médina',
    email: 'pdjibril77@live.fr',
    telephone: '77 085 50 33'
  },
  {
    id: 'facs',
    sigle: 'FACS',
    nomComplet: 'Forum d’Assistance des Consommateurs du Sénégal',
    president: 'Abdou DIOUF',
    adresse: 'Keur Massar Sud – Cité Ainoumady, Villa N° 101, Dakar',
    email: 'zizajuuf27@gmail.com',
    telephone: '77 547 30 36'
  },
  {
    id: 'asoscen',
    sigle: 'ASOSCEN',
    nomComplet: 'Association Sénégalaise des Consommateurs d’Énergie',
    president: 'Fallou FALL',
    adresse: 'Cité Sonatel 01, N° 096',
    email: 'asoscen2022@gmail.com'
  },
  {
    id: 'avnrst',
    sigle: 'AVNRST',
    nomComplet: 'Association des Victimes du Net des Réseaux Sociaux et des Télécoms',
    president: 'Amadou Moustapha Gaye',
    adresse: 'Sacré Coeur x VDN',
    email: 'victimesdunet@gmail.com',
    telephone: '77 631 62 27'
  }
]

export function AssociationsConsommateursPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAssociations = useMemo(() => {
    const term = searchTerm.toLowerCase().trim()
    if (!term) return associationsData

    return associationsData.filter((assoc) => {
      const matchSigle = assoc.sigle.toLowerCase().includes(term)
      const matchNom = assoc.nomComplet.toLowerCase().includes(term)
      const matchPres = assoc.president.toLowerCase().includes(term)
      const matchAdr = assoc.adresse ? assoc.adresse.toLowerCase().includes(term) : false
      const matchEmail = assoc.email ? assoc.email.toLowerCase().includes(term) : false
      const matchTel = assoc.telephone ? assoc.telephone.toLowerCase().includes(term) : false
      return matchSigle || matchNom || matchPres || matchAdr || matchEmail || matchTel
    })
  }, [searchTerm])

  return (
    <div className="min-h-screen bg-slate-50/60">
      {/* 1. HERO BANNER UNIFORME AVEC BREADCRUMB */}
      <PageBanner
        eyebrow="Consommateurs"
        title="Associations de Consommateurs"
        description="Liste et coordonnées des associations de consommateurs partenaires de la CRSE dans le cadre du dialogue permanent et du Comité Consultatif."
      />

      {/* 2. EN-TÊTE ET CADRE DE CONCERTATION */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-[12px] font-bold text-chathams-blue mb-3">
                <ShieldCheck size={16} />
                <span>Protection & Dialogue Citoyen</span>
              </div>
              <h2 className="text-[26px] sm:text-[32px] font-extrabold text-slate-900 leading-snug">
                Partenariat avec les Usagers et Consommateurs
              </h2>
              <p className="mt-3 text-[16px] text-slate-600 leading-relaxed">
                La CRSE associe étroitement les associations de consommateurs à ses réflexions, notamment lors des révisions tarifaires, des enquêtes de satisfaction et au sein du <strong className="text-chathams-blue font-semibold">Comité Consultatif des Consommateurs</strong>. Retrouvez ici la liste officielle des organisations partenaires.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                to="/reclamations"
                className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 hover:bg-amber-100 transition-colors shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold">Déposer une réclamation</h4>
                  <p className="text-[12px] text-amber-800">Litige non résolu avec votre opérateur</p>
                </div>
              </Link>

              <Link
                to="/guide-du-consommateur"
                className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-200 text-chathams-blue hover:bg-blue-100 transition-colors shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-chathams-blue text-white">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold">Guide du consommateur</h4>
                  <p className="text-[12px] text-blue-700">Connaître ses droits et démarches</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RECHERCHE ET LISTING DES ASSOCIATIONS */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
          {/* Barre de recherche instantanée */}
          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-[22px] sm:text-[26px] font-bold text-slate-900 flex items-center gap-2.5">
                <Users className="text-shakespeare" size={26} />
                <span>Organisations Partenaires</span>
                <span className="text-[14px] font-semibold text-slate-500 bg-slate-200 px-3 py-0.5 rounded-full">
                  {filteredAssociations.length} répertoriée{filteredAssociations.length > 1 ? 's' : ''}
                </span>
              </h3>
              <p className="text-[14px] text-slate-500 mt-1">
                Filtrez instantanément par sigle, nom de l’association, président ou localisation.
              </p>
            </div>

            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher nom, président, adresse..."
                className="w-full rounded-2xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-[14px] text-slate-900 shadow-sm focus:border-chathams-blue focus:outline-none focus:ring-2 focus:ring-chathams-blue/20 transition-all"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-[12px] font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Grille des cartes associations */}
          {filteredAssociations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssociations.map((assoc) => (
                <div
                  key={assoc.id}
                  className="group flex flex-col justify-between rounded-3xl bg-white p-7 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200/80 relative overflow-hidden"
                >
                  {/* Accent supérieur subtil */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-chathams-blue via-shakespeare to-blue-300 group-hover:h-2 transition-all" />

                  <div>
                    {/* Header de la carte */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className="inline-block rounded-xl bg-blue-50 px-3.5 py-1 text-[16px] font-black tracking-wide text-chathams-blue border border-blue-100">
                        {assoc.sigle}
                      </span>
                    </div>

                    <h3 className="text-[17px] font-bold text-slate-900 leading-snug group-hover:text-chathams-blue transition-colors">
                      {assoc.nomComplet}
                    </h3>

                    {/* Liste des informations de contact */}
                    <div className="mt-5 space-y-2.5 text-[13px] text-slate-600 border-t border-slate-100 pt-4">
                      {/* Président */}
                      <div className="flex items-start gap-2.5">
                        <UserCheck size={16} className="text-chathams-blue shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[11px] font-bold uppercase text-slate-400 block">Président / Représentant</span>
                          <span className="font-semibold text-slate-800">{assoc.president}</span>
                        </div>
                      </div>

                      {/* Adresse */}
                      {assoc.adresse && (
                        <div className="flex items-start gap-2.5">
                          <MapPin size={16} className="text-shakespeare shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[11px] font-bold uppercase text-slate-400 block">Adresse</span>
                            <span>{assoc.adresse}</span>
                          </div>
                        </div>
                      )}

                      {/* Téléphone */}
                      {assoc.telephone && (
                        <div className="flex items-start gap-2.5">
                          <Phone size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[11px] font-bold uppercase text-slate-400 block">Téléphone</span>
                            <a
                              href={`tel:${assoc.telephone.replace(/[^0-9+]/g, '')}`}
                              className="font-medium text-slate-700 hover:text-emerald-700 transition-colors"
                            >
                              {assoc.telephone}
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Email */}
                      {assoc.email && (
                        <div className="flex items-start gap-2.5">
                          <Mail size={16} className="text-blue-500 shrink-0 mt-0.5" />
                          <div className="overflow-hidden">
                            <span className="text-[11px] font-bold uppercase text-slate-400 block">Email</span>
                            <a
                              href={`mailto:${assoc.email}`}
                              className="text-chathams-blue font-medium hover:underline break-all"
                            >
                              {assoc.email}
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Site web */}
                      {assoc.siteWeb && (
                        <div className="flex items-start gap-2.5">
                          <Globe size={16} className="text-teal-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[11px] font-bold uppercase text-slate-400 block">Site internet</span>
                            <a
                              href={assoc.siteWeb}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-shakespeare font-semibold hover:underline"
                            >
                              <span>{assoc.siteWeb.replace('https://', '')}</span>
                              <ExternalLink size={12} />
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
              <Search className="mx-auto text-slate-300 mb-3" size={40} />
              <h4 className="text-[18px] font-bold text-slate-800">Aucune association trouvée</h4>
              <p className="text-[14px] text-slate-500 mt-1 max-w-md mx-auto">
                Aucun résultat ne correspond à votre recherche « {searchTerm} ». Vérifiez l'orthographe ou réinitialisez le filtre.
              </p>
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="mt-4 px-4 py-2 rounded-xl bg-chathams-blue text-white text-[13px] font-bold"
              >
                Réinitialiser la recherche
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
