import { Link } from 'react-router-dom'
import { ArrowLeft, Download, ShieldCheck, HelpCircle } from 'lucide-react'
import { PageBanner } from '../components/shared/PageBanner'
import { PurePdfFlipViewer } from '../components/shared/PurePdfFlipViewer'
import { Button } from '../components/ui/button'

export function GuideConsommateurPage() {
  const pdfUrl = "https://www.crse.sn/wp-content/uploads/2026/03/WEB-GuideConsommateur-VFF.pdf"
  const coverImage = "https://www.crse.sn/wp-content/uploads/2026/03/Guide-du-consommateur.jpg"

  return (
    <>
      <PageBanner
        eyebrow="Publication Officielle"
        title="Guide du Consommateur d’Énergie"
        description="Feuilletez le guide officiel interactif de la CRSE. Découvrez vos droits, le fonctionnement de vos compteurs et comment défendre vos intérêts face aux opérateurs."
      />

      <main className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-12">
        {/* Barre d'action rapide */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Button asChild variant="outline" className="rounded-full gap-2">
            <Link to="/documents">
              <ArrowLeft size={16} />
              <span>Retour aux documents</span>
            </Link>
          </Button>

          <div className="flex items-center gap-3">
            <Button asChild variant="outline" className="rounded-full gap-2 border-chathams-blue text-chathams-blue hover:bg-chathams-blue hover:text-white">
              <Link to="/reclamations">
                <ShieldCheck size={16} />
                <span>Déposer une réclamation</span>
              </Link>
            </Button>
            <Button asChild className="rounded-full bg-chathams-blue text-white gap-2">
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" download>
                <Download size={16} />
                <span>Télécharger le PDF</span>
              </a>
            </Button>
          </div>
        </div>

        {/* Visionneuse Flipbook pure */}
        <PurePdfFlipViewer
          title="Guide du Consommateur — CRSE Sénégal"
          pdfUrl={pdfUrl}
          coverImage={coverImage}
          totalEstimatePages={28}
        />

        {/* Encadré d'assistance */}
        <div className="mt-14 rounded-2xl bg-slate-50 p-8 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-50 p-3 text-chathams-blue shrink-0">
              <HelpCircle size={24} />
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-chathams-blue">
                Une question sur la facturation ou vos droits ?
              </h3>
              <p className="text-[14px] text-slate-600 mt-0.5">
                Consultez notre foire aux questions ou faites une réclamation en ligne.
              </p>
            </div>
          </div>
          <Button asChild className="rounded-full bg-chathams-blue text-white shrink-0">
            <Link to="/faq">Consulter la FAQ</Link>
          </Button>
        </div>
      </main>
    </>
  )
}
