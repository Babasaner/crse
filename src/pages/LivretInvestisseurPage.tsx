import { Link } from 'react-router-dom'
import { ArrowLeft, Download, Briefcase, HelpCircle } from 'lucide-react'
import { PageBanner } from '../components/shared/PageBanner'
import { PurePdfFlipViewer } from '../components/shared/PurePdfFlipViewer'
import { Button } from '../components/ui/button'

export function LivretInvestisseurPage() {
  const pdfUrl = "https://www.crse.sn/wp-content/uploads/2026/03/WEB-LivretInvestisseur-VFF.pdf"
  const coverImage = "https://www.crse.sn/wp-content/uploads/2026/03/livret-de-linvestisseur.jpg"

  return (
    <>
      <PageBanner
        eyebrow="Guide Économique & Réglementaire"
        title="Livret de l’Investisseur"
        description="Feuilletez le livret officiel de la CRSE dédié aux investisseurs et opérateurs économiques. Découvrez le cadre juridique, les garanties et les opportunités énergétiques au Sénégal."
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
              <Link to="/operateurs">
                <Briefcase size={16} />
                <span>Espace Opérateurs</span>
              </Link>
            </Button>
            <Button asChild className="rounded-full bg-chathams-blue text-white gap-2">
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" download>
                <Download size={16} />
                <span>Télécharger le Livret PDF</span>
              </a>
            </Button>
          </div>
        </div>

        {/* Visionneuse Flipbook pure */}
        <PurePdfFlipViewer
          title="Livret de l’Investisseur — CRSE Sénégal"
          pdfUrl={pdfUrl}
          coverImage={coverImage}
          totalEstimatePages={32}
        />

        {/* Bloc d'aide investisseurs */}
        <div className="mt-14 rounded-2xl bg-slate-50 p-8 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-50 p-3 text-chathams-blue shrink-0">
              <HelpCircle size={24} />
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-chathams-blue">
                Vous préparez un projet d'investissement dans l'énergie ?
              </h3>
              <p className="text-[14px] text-slate-600 mt-0.5">
                Prenez contact avec la direction de la régulation économique pour tout éclairage technique et contractuel.
              </p>
            </div>
          </div>
          <Button asChild className="rounded-full bg-chathams-blue text-white shrink-0">
            <Link to="/contact">Contacter le pôle investisseurs</Link>
          </Button>
        </div>
      </main>
    </>
  )
}
