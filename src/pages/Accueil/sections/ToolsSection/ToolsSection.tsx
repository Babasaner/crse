import { FileText, MessageSquareText, Scale } from 'lucide-react'
import { Link } from 'react-router-dom'

const tools = [
  {
    title: 'Consultation publique',
    description: "Dans le cadre de ses attributions, la CRSE organise des consultations publiques afin d'assurer une participation inclusive et transparente de toute personne intéressée dans le processus décisionnaire, conformément au Règlement d'Application n° 05/2024 relatif aux modalités de consultations publiques.",
    to: '/documents?cats=consultations',
    icon: MessageSquareText,
  },
  {
    title: 'Introduire une réclamation',
    description: "Si vous estimez que votre fournisseur d'énergie ne respecte pas vos droits (termes du contrat, qualité du service, etc.), vous pouvez déposer une réclamation auprès de la CRSE conformément au Règlement d'Application y relatif.",
    to: '/reclamations',
    icon: FileText,
    featured: true,
  },
  {
    title: 'Règlement des différends',
    description: "Mise en place d'un dispositif de règlement des différends portant sur les plaintes et recours déposés auprès de la CRSE.",
    to: '/contact',
    icon: Scale,
  },
]

export function ToolsSection() {
  return (
    <section className="crse-tools-section">
      <div className="crse-tools-inner">
        <h2>Nos outils</h2>
        <div className="crse-tools-grid">
          {tools.map(({ title, description, to, icon: Icon, featured }) => (
            <article className={`crse-tool${featured ? ' is-featured' : ''}`} key={title}>
              <Icon aria-hidden="true" className="crse-tool-icon" strokeWidth={1.5} />
              <h3>{title}</h3>
              <p>{description}</p>
              <Link to={to}>En savoir plus <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}