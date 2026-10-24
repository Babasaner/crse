import { useMemo, useState } from 'react'
import {
  Calendar as CalendarIcon,
  Clock,
  LoaderCircle,
  MapPin,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageBanner } from '../components/shared/PageBanner'
import { Button } from '../components/ui/button'
import { useWPAgenda } from '../hooks/useWordPress'
import { formatWPDate, stripHtml } from '../lib/wordpress'

type EventStatus = 'a-venir' | 'en-cours' | 'passe'
type EventFilter = 'all' | EventStatus

function localDateString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getEventType(title: string): string {
  const normalizedTitle = title.toLocaleLowerCase('fr')
  if (normalizedTitle.includes('consultation')) return 'Consultation publique'
  if (normalizedTitle.includes('audience')) return 'Audience publique'
  if (normalizedTitle.includes('formation')) return 'Formation'
  if (normalizedTitle.includes('atelier')) return 'Atelier'
  if (normalizedTitle.includes('réunion') || normalizedTitle.includes('reunion')) return 'Réunion'
  return 'Événement CRSE'
}

export function AgendaPage() {
  const [activeFilter, setActiveFilter] = useState<EventFilter>('all')
  const { events, loading, error } = useWPAgenda()
  const today = localDateString(new Date())

  const mappedEvents = useMemo(() => events.map((event) => {
    const startDate = event.meta?.crse_event_start_date || event.date.slice(0, 10)
    const endDate = event.meta?.crse_event_end_date || startDate
    const status: EventStatus = startDate > today
      ? 'a-venir'
      : endDate >= today
        ? 'en-cours'
        : 'passe'
    const title = stripHtml(event.title.rendered)
    const dateLabel = startDate === endDate
      ? formatWPDate(`${startDate}T12:00:00`)
      : `${formatWPDate(`${startDate}T12:00:00`)} – ${formatWPDate(`${endDate}T12:00:00`)}`

    return {
      id: event.id,
      slug: event.slug,
      title,
      typeLabel: getEventType(title),
      startDate,
      dateLabel,
      dayLabel: new Date(`${startDate}T12:00:00`).toLocaleDateString('fr-FR', { day: '2-digit' }),
      monthLabel: new Date(`${startDate}T12:00:00`).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
      location: event.meta?.crse_event_location?.trim() ?? '',
      description: stripHtml(event.excerpt?.rendered ?? event.content?.rendered ?? ''),
      status,
    }
  }).sort((left, right) => {
    const leftIsPast = left.status === 'passe'
    const rightIsPast = right.status === 'passe'
    if (leftIsPast !== rightIsPast) return leftIsPast ? 1 : -1
    return leftIsPast
      ? right.startDate.localeCompare(left.startDate)
      : left.startDate.localeCompare(right.startDate)
  }), [events, today])

  const filteredEvents = mappedEvents.filter((event) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'a-venir') return event.status === 'a-venir' || event.status === 'en-cours'
    return event.status === 'passe'
  })

  const tabs: Array<{ id: EventFilter; label: string }> = [
    { id: 'all', label: 'Tous les événements' },
    { id: 'a-venir', label: 'À venir' },
    { id: 'passe', label: 'Événements passés' },
  ]

  return (
    <>
      <PageBanner
        eyebrow="Événements & Rendez-vous"
        title="Agenda de la CRSE"
        description="Retrouvez les consultations publiques, audiences, ateliers et autres rendez-vous publiés par la Commission."
      />

      <main className="mx-auto w-full max-w-[1440px] px-6 py-14 lg:px-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                aria-pressed={activeFilter === tab.id}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition sm:px-5 ${
                  activeFilter === tab.id
                    ? 'bg-chathams-blue text-white shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {!loading && !error && (
            <span className="text-sm font-medium text-slate-500">
              <strong>{filteredEvents.length}</strong> rendez-vous
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-3 py-20 text-slate-500">
            <LoaderCircle size={21} className="animate-spin" /> Chargement de l’agenda officiel…
          </div>
        ) : error ? (
          <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
            L’agenda CRSE ne peut pas être chargé pour le moment. {error}
          </div>
        ) : filteredEvents.length ? (
          <div className="space-y-5">
            {filteredEvents.map((event) => {
              const statusLabel = event.status === 'a-venir'
                ? 'À venir'
                : event.status === 'en-cours'
                  ? 'En cours'
                  : 'Passé'
              return (
                <article
                  key={event.id}
                  className="flex flex-col items-start gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-shakespeare/70 sm:p-7 md:flex-row md:items-center"
                >
                  <div className="flex min-w-[130px] shrink-0 items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-chathams-blue md:flex-col md:gap-1 md:px-5 md:py-4">
                    <CalendarIcon size={21} className="shrink-0 text-shakespeare" />
                    <span className="text-lg font-bold leading-tight md:mt-1">{event.dayLabel}</span>
                    <span className="text-xs font-medium uppercase tracking-wider text-slate-600">{event.monthLabel}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-chathams-blue">{event.typeLabel}</span>
                      <span className={`rounded-md px-2 py-1 text-[11px] font-bold uppercase ${event.status === 'a-venir' ? 'bg-green-100 text-green-800' : event.status === 'en-cours' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'}`}>
                        {statusLabel}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold leading-snug text-chathams-blue sm:text-xl">{event.title}</h2>
                    <p className="mt-1 text-sm font-medium text-slate-500">{event.dateLabel}</p>
                    {event.description && <p className="mt-3 text-sm leading-relaxed text-slate-600">{event.description}</p>}
                    {event.location && (
                      <p className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
                        <MapPin size={15} className="shrink-0 text-slate-400" /> {event.location}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 self-end md:self-center">
                    <Button asChild variant="outline" className="rounded-full border-chathams-blue text-chathams-blue hover:bg-chathams-blue hover:text-white">
                      <Link to={`/agenda/${event.slug}`}>
                        <span>Voir le détail</span>
                      </Link>
                    </Button>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
            <Clock size={32} className="mx-auto text-slate-400" />
            <p className="mt-4 font-semibold text-slate-700">Aucun événement dans cette sélection.</p>
            <button type="button" onClick={() => setActiveFilter('all')} className="mt-3 text-sm font-semibold text-chathams-blue hover:underline">
              Afficher tous les événements
            </button>
          </div>
        )}
      </main>
    </>
  )
}
