import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, ExternalLink, LoaderCircle, MapPin } from 'lucide-react'
import { Breadcrumb } from '../components/shared/Breadcrumb'
import { Button } from '../components/ui/button'
import { useWPAgendaEvent } from '../hooks/useWordPress'
import { formatWPDate, stripHtml } from '../lib/wordpress'

export function AgendaDetailPage() {
  const { slug = '' } = useParams()
  const { event, loading, error } = useWPAgendaEvent(slug)

  if (loading) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center gap-3 text-slate-500">
        <LoaderCircle size={20} className="animate-spin" /> Chargement de l’événement…
      </main>
    )
  }

  if (error || !event) {
    return (
      <main className="mx-auto max-w-[900px] px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-chathams-blue">Événement introuvable</h1>
        <p className="mt-3 text-slate-600">
          {error ? 'Le détail de cet événement ne peut pas être chargé pour le moment.' : 'Cette publication n’est pas disponible ou a été retirée.'}
        </p>
        <Button asChild variant="outline" className="mt-6 rounded-full">
          <Link to="/agenda"><ArrowLeft size={16} className="mr-2" />Retour à l’agenda</Link>
        </Button>
      </main>
    )
  }

  const title = stripHtml(event.title.rendered)
  const startDate = event.meta?.crse_event_start_date || event.date.slice(0, 10)
  const endDate = event.meta?.crse_event_end_date || startDate
  const dateLabel = startDate === endDate
    ? formatWPDate(`${startDate}T12:00:00`)
    : `${formatWPDate(`${startDate}T12:00:00`)} – ${formatWPDate(`${endDate}T12:00:00`)}`
  const media = event._embedded?.['wp:featuredmedia']?.[0]
  const image = media?.media_details?.sizes?.large?.source_url
    ?? media?.media_details?.sizes?.full?.source_url
    ?? media?.source_url
  const content = event.content?.rendered || event.excerpt?.rendered || ''

  return (
    <article className="min-h-screen bg-white">
      <div className="border-b border-slate-200 bg-slate-50 py-4">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Breadcrumb items={[{ label: 'Médias', to: '/medias' }, { label: 'Agenda', to: '/agenda' }, { label: title }]} />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1000px] px-6 py-10 sm:py-14">
        <Button asChild variant="outline" className="mb-8 gap-2 rounded-full">
          <Link to="/agenda"><ArrowLeft size={16} />Retour à l’agenda</Link>
        </Button>

        <header className="mb-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-shakespeare">Agenda de la CRSE</p>
          <h1 className="text-[clamp(28px,4vw,46px)] font-bold leading-tight text-chathams-blue">{title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-slate-200 py-4 text-sm text-slate-600">
            <span className="flex items-center gap-2"><CalendarDays size={17} className="text-shakespeare" />{dateLabel}</span>
            {event.meta?.crse_event_location && (
              <span className="flex items-center gap-2"><MapPin size={17} className="text-shakespeare" />{event.meta.crse_event_location}</span>
            )}
          </div>
        </header>

        {image && (
          <div className="mb-9 overflow-hidden rounded-2xl bg-slate-100">
            <img src={image} alt={media?.alt_text || title} className="max-h-[560px] w-full object-cover" />
          </div>
        )}

        {content ? (
          <div className="prose prose-slate max-w-none text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          <p className="rounded-xl bg-slate-50 p-6 text-slate-600">
            Aucun contenu détaillé n’a été publié pour cet événement.
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
          <Button asChild variant="outline" className="gap-2 rounded-full">
            <Link to="/agenda"><ArrowLeft size={16} />Tous les événements</Link>
          </Button>
          <Button asChild className="gap-2 rounded-full bg-chathams-blue text-white">
            <a href={event.link} target="_blank" rel="noopener noreferrer">
              Publication sur crse.sn <ExternalLink size={15} />
            </a>
          </Button>
        </div>
      </div>
    </article>
  )
}
