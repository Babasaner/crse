import { useState } from 'react'
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react'
import { PageBanner } from '../components/shared/PageBanner'
import { Button } from '../components/ui/button'

type EventType = 'consultation' | 'audience' | 'formation' | 'reunion' | 'atelier'

interface EventItem {
  id: number
  title: string
  type: EventType
  typeLabel: string
  date: string
  time: string
  location: string
  status: 'a-venir' | 'en-cours' | 'passe'
  statusLabel: string
  description: string
  link?: string
}

const eventsList: EventItem[] = [
  {
    id: 1,
    title: 'Consultation Publique Nationale : Code de Réseau de Transport Gazier (RAG)',
    type: 'consultation',
    typeLabel: 'Consultation Publique',
    date: '15 Mars 2025',
    time: '09h00 – 16h30',
    location: 'Hôtel King Fahd Palace, Dakar',
    status: 'a-venir',
    statusLabel: 'À venir',
    description: 'Séance plénière de recueil des observations des industriels, producteurs indépendants et associations de consommateurs sur les principes tarifaires d’accès aux gazoducs nationaux.',
  },
  {
    id: 2,
    title: 'Atelier Régional de concertation sur la qualité de fourniture électrique',
    type: 'atelier',
    typeLabel: 'Atelier Régional',
    date: '28 Mars 2025',
    time: '10h00 – 15h00',
    location: 'Gouvernance de Kaolack, Région de Kaolack',
    status: 'a-venir',
    statusLabel: 'À venir',
    description: 'Échanges avec les associations d’usagers, chefs de quartier et opérateurs d’électrification rurale de la zone centre du Sénégal.',
  },
  {
    id: 3,
    title: 'Session annuelle du programme de formation en régulation de l’énergie (BADGE)',
    type: 'formation',
    typeLabel: 'Formation & Renforcement',
    date: '09 Février 2025',
    time: '08h30 – 17h00',
    location: 'Centre de Conférence CRSE, Dakar',
    status: 'passe',
    statusLabel: 'Clôturé',
    description: '8e édition de la session de perfectionnement des cadres de la régulation en partenariat avec les universités et instituts spécialisés.',
  },
  {
    id: 4,
    title: 'Audience foraine du Comité de Règlement des Différends (CRD)',
    type: 'audience',
    typeLabel: 'Audience Publique',
    date: '12 Janvier 2025',
    time: '09h30 – 14h00',
    location: 'Chambre de Commerce de Saint-Louis',
    status: 'passe',
    statusLabel: 'Clôturé',
    description: 'Examen public et conciliation contradictoire portant sur les litiges d’indemnisation suite à des perturbations sur les réseaux moyenne tension.',
  },
]

export function AgendaPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'a-venir' | 'passe'>('all')

  const filteredEvents = eventsList.filter((e) => {
    if (activeFilter === 'all') return true
    return e.status === activeFilter
  })

  return (
    <>
      <PageBanner
        eyebrow="Événements & Rendez-vous"
        title="Agenda de la CRSE"
        description="Retrouvez les prochaines consultations publiques, audiences foraines du comité de règlement des différends, ateliers régionaux et sessions d’information de la Commission."
      />

      <main className="mx-auto w-full max-w-[1440px] px-6 py-14 lg:px-12">
        {/* Filtres par statut */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-5 mb-10 flex-wrap gap-4">
          <div className="flex gap-2">
            {[
              { id: 'all', label: 'Tous les événements' },
              { id: 'a-venir', label: 'Événements à venir' },
              { id: 'passe', label: 'Événements passés' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as any)}
                className={`rounded-full px-5 py-2 text-[14px] font-semibold transition-all ${
                  activeFilter === tab.id
                    ? 'bg-chathams-blue text-white shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-[13px] text-slate-500 font-medium">
            <strong>{filteredEvents.length}</strong> rendez-vous répertorié{filteredEvents.length > 1 ? 's' : ''}
          </span>
        </div>

        {/* Liste des événements */}
        <div className="space-y-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 lg:p-8 shadow-sm hover:border-shakespeare/70 transition-all gap-6"
            >
              {/* Date Box */}
              <div className="flex md:flex-col items-center justify-center rounded-xl bg-blue-50 px-5 py-4 text-center text-chathams-blue shrink-0 min-w-[130px] border border-blue-100">
                <CalendarIcon size={22} className="mb-1 text-shakespeare" />
                <span className="text-[18px] font-bold leading-tight mt-1">{evt.date.split(' ')[0]}</span>
                <span className="text-[13px] font-medium text-slate-600 uppercase tracking-wider">{evt.date.split(' ').slice(1).join(' ')}</span>
              </div>

              {/* Détails de l'événement */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-[12px] font-bold text-chathams-blue uppercase tracking-wide">
                    {evt.typeLabel}
                  </span>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[11px] font-bold uppercase ${
                      evt.status === 'a-venir'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {evt.statusLabel}
                  </span>
                </div>

                <h3 className="text-[20px] font-bold text-chathams-blue mb-2 leading-snug">
                  {evt.title}
                </h3>
                <p className="text-[14px] text-slate-600 leading-relaxed mb-3">
                  {evt.description}
                </p>

                <div className="flex flex-wrap items-center gap-5 text-[13px] text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-slate-400" /> {evt.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-slate-400" /> {evt.location}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="shrink-0 self-end md:self-center">
                <Button asChild variant="outline" className="rounded-full border-chathams-blue text-chathams-blue hover:bg-chathams-blue hover:text-white">
                  <a href="/contact">
                    <span>Participer / Informations</span>
                    <ArrowRight size={14} className="ml-1.5" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
