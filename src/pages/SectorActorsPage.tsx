import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Building, FileText } from 'lucide-react'
import { PageBanner } from '../components/shared/PageBanner'
import { Button } from '../components/ui/button'
import type { SectorId } from '../lib/wordpress'

type Actor = { id: string; name: string; role: string; description: string }

type SectorActors = {
  title: string
  sectorLabel: string
  description: string
  documentsUrl: string
  actors: Actor[]
}

const actorsBySector: Record<SectorId, SectorActors> = {
  electricite: {
    title: 'Acteurs du secteur de l’électricité',
    sectorLabel: 'Électricité',
    description: 'Les activités de production, de transport, de distribution et de fourniture d’électricité sont exercées par des acteurs soumis au cadre de régulation de la CRSE.',
    documentsUrl: '/documents?secteur=electricite',
    actors: [
      { id: 'senelec', name: 'Senelec', role: 'Opérateur historique', description: 'Assure des activités de production, de transport, de distribution et de vente d’électricité sur le réseau national.' },
      { id: 'producteurs-independants', name: 'Producteurs indépendants', role: 'Production', description: 'Développent et exploitent des centrales électriques et vendent leur production dans le cadre des titres et contrats applicables.' },
      { id: 'concessionnaires-ruraux', name: 'Concessionnaires ruraux', role: 'Électrification rurale', description: 'Contribuent à l’accès à l’électricité dans les zones rurales dans le cadre de concessions dédiées.' },
      { id: 'electrification-decentralisee', name: 'Opérateurs décentralisés', role: 'Mini-réseaux et systèmes isolés', description: 'Exploitent des solutions autonomes ou des mini-réseaux pour desservir les localités non connectées au réseau interconnecté.' },
      { id: 'autoproducteurs', name: 'Autoproducteurs', role: 'Production pour usage propre', description: 'Produisent de l’électricité pour leurs propres besoins, dans le respect des dispositions applicables à l’injection ou à la vente des surplus.' },
      { id: 'clients-eligibles', name: 'Clients éligibles', role: 'Consommation', description: 'Grands consommateurs pouvant contracter leur approvisionnement selon les conditions réglementaires d’accès au marché.' },
    ],
  },
  hydrocarbures: {
    title: 'Acteurs du secteur aval des hydrocarbures',
    sectorLabel: 'Hydrocarbures',
    description: 'Le secteur aval couvre l’importation, le raffinage, le stockage, le transport, la distribution et la commercialisation des produits pétroliers.',
    documentsUrl: '/documents?secteur=hydrocarbures',
    actors: [
      { id: 'sar', name: 'Société Africaine de Raffinage (SAR)', role: 'Raffinage', description: 'Raffine le pétrole brut et contribue à l’approvisionnement national en produits pétroliers.' },
      { id: 'importateurs', name: 'Importateurs', role: 'Approvisionnement', description: 'Approvisionnent le marché national en produits pétroliers selon les autorisations et règles en vigueur.' },
      { id: 'stockistes', name: 'Stockistes et gestionnaires de dépôts', role: 'Stockage', description: 'Réceptionnent et stockent les produits pétroliers dans des infrastructures soumises aux exigences applicables.' },
      { id: 'transporteurs', name: 'Transporteurs agréés', role: 'Transport', description: 'Assurent le transport des produits pétroliers par route ou par voie maritime dans le respect des règles de sécurité.' },
      { id: 'distributeurs', name: 'Distributeurs', role: 'Distribution et commercialisation', description: 'Commercialisent les carburants et produits pétroliers auprès des consommateurs et des professionnels.' },
      { id: 'gpl', name: 'Opérateurs du gaz butane', role: 'Emplissage et distribution GPL', description: 'Assurent l’emplissage, le contrôle et la distribution des bouteilles de gaz butane.' },
    ],
  },
  gaz: {
    title: 'Acteurs des segments aval et intermédiaire gaziers',
    sectorLabel: 'Aval et intermédiaire gaziers',
    description: 'La chaîne gazière relie la production et l’importation aux infrastructures de transport, aux centrales et aux consommateurs industriels.',
    documentsUrl: '/documents?secteur=gaz',
    actors: [
      { id: 'rgs', name: 'Réseau Gazier du Sénégal (RGS SA)', role: 'Transport et réseau', description: 'Développe et exploite le réseau de transport gazier destiné à acheminer le gaz vers les centrales et les pôles industriels.' },
      { id: 'fournisseurs-gaz', name: 'Fournisseurs et agrégateurs', role: 'Approvisionnement', description: 'Organisent l’approvisionnement en gaz et la mise à disposition de la ressource pour les usages concernés.' },
      { id: 'centrales-gaz', name: 'Centrales électriques', role: 'Production d’électricité', description: 'Utilisent le gaz naturel comme combustible pour produire de l’électricité.' },
      { id: 'clients-industriels', name: 'Clients industriels', role: 'Consommation', description: 'Consomment le gaz naturel pour leurs procédés industriels et leurs besoins énergétiques.' },
    ],
  },
}

export function SectorActorsPage({ sector }: { sector: SectorId }) {
  const page = actorsBySector[sector]

  return (
    <>
      <PageBanner eyebrow={`Secteur régulé · ${page.sectorLabel}`} title={page.title} description={page.description} />
      <main className="mx-auto w-full max-w-[1200px] px-6 py-12 lg:px-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">Cartographie sectorielle</span>
            <h2 className="mt-1 text-2xl font-bold text-chathams-blue">Acteurs concernés</h2>
          </div>
          <Button asChild variant="outline" className="gap-2">
            <Link to={`/${sector}`}><ArrowLeft size={16} />Retour au secteur</Link>
          </Button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {page.actors.map((actor) => (
              <article id={actor.id} key={actor.id} className="scroll-mt-28 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-chathams-blue/10 text-chathams-blue">
                <Building size={20} />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-shakespeare">{actor.role}</p>
              <h3 className="mt-1 text-lg font-bold text-chathams-blue">{actor.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{actor.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
          <Link to={`/${sector}`} className="inline-flex items-center gap-2 font-semibold text-chathams-blue hover:text-shakespeare"><ArrowLeft size={16} />Présentation du secteur</Link>
          <Link to={page.documentsUrl} className="inline-flex items-center gap-2 font-semibold text-chathams-blue hover:text-shakespeare"><FileText size={16} />Documents du secteur<ArrowRight size={15} /></Link>
        </div>
      </main>
    </>
  )
}
