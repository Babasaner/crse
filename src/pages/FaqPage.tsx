import { useState } from 'react'
import {
  HelpCircle,
  Search,
  ChevronDown,
  Zap,
  Flame,
  ShieldAlert,
  ArrowRight,
  Lightbulb,
  X
} from 'lucide-react'
import { PageBanner } from '../components/shared/PageBanner'
import { Button } from '../components/ui/button'

type FAQCategory = 'all' | 'electricite' | 'hydrocarbures' | 'gaz' | 'reclamations'

interface FAQItem {
  id: number
  question: string
  answer: string
  category: 'electricite' | 'hydrocarbures' | 'gaz' | 'reclamations'
  tag: string
  tip?: string
}

const faqList: FAQItem[] = [
  {
    id: 1,
    question: "Comment sont fixés les tarifs de l'électricité au Sénégal ?",
    answer: "Les tarifs de l'électricité sont fixés par la CRSE conformément aux dispositions de la loi n° 2021-32 et du contrat de concession conclu avec la Senelec. La Commission détermine le Revenu Maximum Autorisé (RMA) permettant à l'opérateur de couvrir ses coûts d'exploitation et d'investissement rigoureusement justifiés, puis arrête la structure des grilles tarifaires en veillant à protéger les ménages vulnérables via une tranche sociale.",
    category: 'electricite',
    tag: 'Tarification',
    tip: "Les grilles tarifaires applicables sont publiées sur ce site dans la rubrique Documents.",
  },
  {
    id: 2,
    question: "Comment fonctionne le système de prépaiement Woyofal ?",
    answer: "Le système Woyofal repose sur un tarif progressif mensuel découpé en 3 tranches : Tranche 1 (0 à 150 kWh au tarif social le plus bas), Tranche 2 (151 à 250 kWh au tarif intermédiaire) et Tranche 3 (au-delà de 250 kWh au tarif plein). Le compteur se réinitialise le premier jour de chaque mois calendaire. Si vous rechargez plusieurs fois au cours du même mois, vos achats cumulés progressent dans les tranches supérieures.",
    category: 'electricite',
    tag: 'Woyofal',
    tip: "Achetez votre crédit en fonction de votre consommation réelle sans surstocker en fin de mois pour profiter de la tranche 1 dès le 1er du mois suivant.",
  },
  {
    id: 3,
    question: "Qui contrôle et régule les prix des carburants (Super, Gasoil) et du gaz butane ?",
    answer: "Les prix plafond des produits pétroliers et du gaz butane sont fixés mensuellement par arrêté interministériel, sur proposition technique et contrôle rigoureux de la CRSE. La Commission s'assure de la conformité de la formule de parité d'importation (cours internationaux, fret, taxes) et du respect des marges de distribution et de stockage.",
    category: 'hydrocarbures',
    tag: 'Hydrocarbures',
  },
  {
    id: 4,
    question: "Dans quel cas et comment puis-je saisir la CRSE pour une réclamation ?",
    answer: "Vous pouvez saisir la CRSE si vous avez préalablement adressé une réclamation formelle à votre fournisseur d'électricité ou d'énergie et que : 1° Vous n'avez reçu aucune réponse dans un délai de 30 jours calendaires ; ou 2° La réponse reçue ne résout pas le litige de manière satisfaisante. La saisine de la CRSE est entièrement gratuite et s'effectue en ligne via notre formulaire dédié.",
    category: 'reclamations',
    tag: 'Litiges',
    tip: "Conservez précieusement le numéro d'enregistrement ou le récépissé de votre réclamation initiale auprès de l'opérateur.",
  },
  {
    id: 5,
    question: "Que faire en cas d'endommagement de mes appareils suite à une surtension ou variation de tension ?",
    answer: "Vous devez faire constater les dégâts dans un délai de 48 heures ouvrées auprès de l'agence commerciale de votre distributeur d'électricité en déposant une réclamation pour avarie réseau. Joignez un rapport technique d'un réparateur professionnel qualifié ainsi que les factures d'achat ou devis de réparation. En cas de refus ou de silence après 30 jours, saisissez la CRSE avec votre dossier complet.",
    category: 'reclamations',
    tag: 'Indemnisation',
  },
  {
    id: 6,
    question: "Quel est le rôle exact de la CRSE dans le secteur du gaz naturel ?",
    answer: "Avec la promulgation du Code Gazier et de la loi n° 2021-32, la CRSE assure la régulation des segments intermédiaire et aval du gaz naturel (transport par gazoduc, liquéfaction, stockage et distribution). Elle garantit un accès des tiers transparent et non discriminatoire aux gazoducs nationaux et fixe les tarifs de péage pour favoriser l'utilisation du gaz local produit au Sénégal (projets GTA et Yakaar-Teranga).",
    category: 'gaz',
    tag: 'Gaz Naturel',
  },
  {
    id: 7,
    question: "Une station-service a-t-elle le droit de vendre le carburant au-delà du prix officiel affiché ?",
    answer: "Absolument pas. Les prix des carburants fixés par l'arrêté sont des prix plafonds impératifs. Tout dépassement constitue une infraction de spéculation tarifaire passible de sanctions administratives et de poursuites judiciaires. Vous pouvez signaler toute station en infraction directement à la CRSE ou à la Direction du Commerce Intérieur.",
    category: 'hydrocarbures',
    tag: 'Contrôle des Prix',
  },
  {
    id: 8,
    question: "Quel est le délai légal accordé à un opérateur pour réaliser un raccordement ?",
    answer: "Selon le cahier des charges de la distribution d'électricité, le distributeur est tenu de réaliser les devis de raccordement dans un délai maximum de 15 jours ouvrables pour la basse tension. Après règlement du devis par l'usager, le branchement doit être effectué sous 21 jours ouvrables, sous réserve de la disponibilité du réseau basse tension.",
    category: 'electricite',
    tag: 'Branchement',
  },
  {
    id: 9,
    question: "Comment puis-je participer aux consultations publiques organisées par la CRSE ?",
    answer: "Toutes les consultations publiques sont annoncées sur le site officiel de la CRSE dans la section Agenda et publiées dans les quotidiens nationaux. Tout citoyen, association ou entreprise peut télécharger le dossier de consultation, formuler des observations écrites ou s'inscrire pour intervenir lors des audiences publiques.",
    category: 'reclamations',
    tag: 'Participation Citoyenne',
  },
  {
    id: 10,
    question: "Existe-t-il des tarifs réduits pour les familles nombreuses ou démunies ?",
    answer: "Oui, la structure tarifaire approuvée par la CRSE intègre une Tranche Sociale fortement soutenue pour les petites consommations (jusqu'à 150 kWh/mois pour le prépaiement et 250 kWh/bimestre pour le post-paiement). En outre, la puissance souscrite minimale (2A ou 5A) permet d'accéder au service avec des redevances fixes réduites.",
    category: 'electricite',
    tag: 'Tarif Social',
  },
]

export function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('all')
  const [search, setSearch] = useState('')
  const [openIds, setOpenIds] = useState<number[]>([1, 2, 4])

  const toggleAccordion = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const categoryStats = {
    all: faqList.length,
    electricite: faqList.filter((f) => f.category === 'electricite').length,
    hydrocarbures: faqList.filter((f) => f.category === 'hydrocarbures').length,
    gaz: faqList.filter((f) => f.category === 'gaz').length,
    reclamations: faqList.filter((f) => f.category === 'reclamations').length,
  }

  const filtered = faqList.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory
    const q = search.toLowerCase().trim()
    const matchesSearch =
      !q ||
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q)

    return matchesCat && matchesSearch
  })

  return (
    <>
      <PageBanner
        eyebrow="Espace Réponses & Conseils"
        title="Foire Aux Questions (FAQ)"
        description="Trouvez des réponses claires, juridiquement fondées et immédiates sur vos droits d’usagers, la tarification de l’électricité, le prépaiement Woyofal, les hydrocarbures et les voies de recours."
      />

      <main className="mx-auto w-full max-w-[1440px] px-6 py-14 lg:px-12">
        {/* Barre de recherche instantanée */}
        <div className="relative mb-12 max-w-[850px] mx-auto">
          <div className="flex items-center rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm focus-within:border-chathams-blue focus-within:ring-2 focus-within:ring-chathams-blue/10">
            <Search className="ml-3 text-slate-400" size={22} />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tapez un mot-clé (ex. Woyofal, surtension, prix gaz, réclamation...)"
              className="w-full bg-transparent px-4 py-2 text-[16px] text-slate-800 placeholder-slate-400 focus:outline-none"
              aria-label="Rechercher une question dans la FAQ"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="mr-2 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Effacer la recherche"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Onglets thématiques avec icônes et compteurs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { id: 'all', label: 'Toutes les questions', icon: HelpCircle, count: categoryStats.all },
            { id: 'electricite', label: 'Électricité & Woyofal', icon: Zap, count: categoryStats.electricite },
            { id: 'hydrocarbures', label: 'Carburants & Hydrocarbures', icon: Flame, count: categoryStats.hydrocarbures },
            { id: 'gaz', label: 'Gaz naturel', icon: Flame, count: categoryStats.gaz },
            { id: 'reclamations', label: 'Réclamations & Litiges', icon: ShieldAlert, count: categoryStats.reclamations },
          ].map((cat) => {
            const Icon = cat.icon
            const isSelected = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as FAQCategory)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-semibold transition-all ${
                  isSelected
                    ? 'bg-chathams-blue text-white shadow-md ring-2 ring-chathams-blue/20'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
                aria-pressed={isSelected}
              >
                <Icon size={16} />
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Liste des accordéons FAQ */}
        <div className="max-w-[1000px] mx-auto space-y-4">
          <div className="flex items-center justify-between text-[13px] text-slate-500 mb-2 px-2">
            <span>
              <strong>{filtered.length}</strong> question{filtered.length > 1 ? 's' : ''} trouvée{filtered.length > 1 ? 's' : ''}
            </span>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setOpenIds(filtered.map((f) => f.id))}
                className="hover:text-chathams-blue hover:underline"
              >
                Tout déplier
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setOpenIds([])}
                className="hover:text-chathams-blue hover:underline"
              >
                Tout replier
              </button>
            </div>
          </div>

          {filtered.length > 0 ? (
            filtered.map((item) => {
              const isOpen = openIds.includes(item.id)
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'border-chathams-blue bg-white shadow-md ring-1 ring-chathams-blue/15'
                      : 'border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    className="flex w-full items-center justify-between p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3.5 pr-4">
                      <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-chathams-blue uppercase tracking-wider shrink-0 mt-0.5">
                        {item.tag}
                      </span>
                      <h3 className={`text-[17px] font-bold leading-snug transition-colors ${
                        isOpen ? 'text-chathams-blue' : 'text-slate-800'
                      }`}>
                        {item.question}
                      </h3>
                    </div>
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-chathams-blue text-white' : 'text-slate-500'
                    }`}>
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 bg-slate-50/70 p-6 pt-5 text-[15px] leading-relaxed text-slate-700 space-y-3 animate-fade-in">
                      <p>{item.answer}</p>
                      {item.tip && (
                        <div className="flex items-start gap-2.5 rounded-xl bg-amber-50 p-3.5 border border-amber-200/80 text-[13px] text-amber-900">
                          <Lightbulb size={18} className="text-amber-600 shrink-0 mt-0.5" />
                          <span><strong>Bon à savoir :</strong> {item.tip}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center bg-slate-50">
              <HelpCircle className="mx-auto h-12 w-12 text-slate-400 mb-3" />
              <h3 className="text-[18px] font-bold text-slate-700">Aucune question ne correspond à votre recherche</h3>
              <p className="mt-1 text-[14px] text-slate-500 max-w-md mx-auto">
                Modifiez vos mots-clés ou réinitialisez les filtres pour afficher l’ensemble des réponses.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setActiveCategory('all')
                  setSearch('')
                }}
                className="mt-4 rounded-full"
              >
                Réinitialiser la recherche
              </Button>
            </div>
          )}
        </div>

        {/* Bloc d'orientation et de contact */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-blue-900 to-chathams-blue p-8 lg:p-10 text-white shadow-xl max-w-[1000px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[12px] font-bold uppercase tracking-widest text-shakespeare block mb-1">
                Besoin d'un accompagnement personnalisé ?
              </span>
              <h3 className="text-[22px] font-bold">
                Vous n'avez pas trouvé la réponse à votre situation ?
              </h3>
              <p className="text-[14px] text-white/80 mt-1 max-w-xl">
                Nos juristes et conseillers de la protection des usagers sont à votre écoute pour instruire vos demandes et réclamations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Button asChild className="rounded-full bg-white text-chathams-blue font-bold hover:bg-white/95 px-6">
                <a href="/reclamations">
                  <span>Introduire une réclamation</span>
                  <ArrowRight size={15} className="ml-1.5" />
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white text-white hover:bg-white/10 px-6">
                <a href="/contact">Nous contacter</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
