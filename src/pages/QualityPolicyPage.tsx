import { ExternalLink, FileDown, ShieldCheck } from 'lucide-react'
import { PageBanner } from '../components/shared/PageBanner'

const policyPdf = 'https://www.crse.sn/wp-content/uploads/2026/04/POLITIQUE-QUALITE-2026-1.pdf'

export function QualityPolicyPage() {
  return (
    <>
      <PageBanner eyebrow="La Commission" title="Politique qualité" description="Les engagements qualité de la CRSE pour une régulation fiable, transparente et tournée vers l’amélioration continue." />
      <section className="quality-page wrap">
        <div className="quality-intro">
          <span className="quality-icon"><ShieldCheck aria-hidden="true" size={26} /></span>
          <div><p className="eyebrow">Engagement institutionnel · 2026</p><h2>Une qualité de service au cœur de la régulation.</h2><p>Consultez la politique qualité officielle de la Commission dans le lecteur ci-dessous ou téléchargez le document PDF.</p></div>
        </div>
        <div className="quality-toolbar"><span>Politique qualité CRSE · PDF</span><div><a href={policyPdf} target="_blank" rel="noreferrer"><ExternalLink aria-hidden="true" size={16} /> Ouvrir</a><a href={policyPdf} download><FileDown aria-hidden="true" size={16} /> Télécharger</a></div></div>
        <div className="quality-viewer"><iframe src={`${policyPdf}#toolbar=1&navpanes=0&view=FitH`} title="Lecteur de la politique qualité CRSE 2026" loading="lazy" /><p>Le lecteur PDF ne s’affiche pas ? <a href={policyPdf} target="_blank" rel="noreferrer">Ouvrir le document dans un nouvel onglet</a>.</p></div>
      </section>
    </>
  )
}