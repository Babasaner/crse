import type { ReactElement } from "react";
import { Button } from "../../../../components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";

type Sector = "electricite" | "hydrocarbures" | "gaz";

const documentCategories = [
  { label: "Textes législatifs et réglementaires", categories: "textes" },
  { label: "Décisions et avis", categories: "decisions,avis" },
  { label: "Grilles tarifaires et structures des prix", categories: "grilles,hydrocarbures" },
  { label: "Bulletin officiel", categories: "bulletins" },
  { label: "Consultations publiques", categories: "consultations" },
  { label: "Rapports d'activité", categories: "rapports" },
];

const documentCards = [
  {
    image: "https://www.crse.sn/wp-content/uploads/2026/03/Guide-du-consommateur.jpg",
    title: "Guide du Consommateur",
    action: "Consultez le Guide du Consommateur",
    to: "/guide-du-consommateur",
    pdfUrl: "https://www.crse.sn/wp-content/uploads/2026/03/WEB-GuideConsommateur-VFF.pdf",
    badge: "Droits des Usagers",
    description: "Tout savoir sur vos droits, la facturation de l'électricité, le système Woyofal et la procédure de réclamation auprès de la CRSE.",
  },
  {
    image: "https://www.crse.sn/wp-content/uploads/2026/03/livret-de-linvestisseur.jpg",
    title: "Livret de l’Investisseur",
    action: "Consultez le Livret de l’Investisseur",
    to: "/livret-de-linvestisseur",
    pdfUrl: "https://www.crse.sn/wp-content/uploads/2026/03/WEB-LivretInvestisseur-VFF.pdf",
    badge: "Guide Économique",
    description: "Le cadre réglementaire, les licences d'exploitation, les opportunités d'investissement dans l'électricité, le gaz et les hydrocarbures au Sénégal.",
  },
];

const sectorDocuments: Record<Sector, Array<{ title: string; description: string; categories: string; badge: string }>> = {
  electricite: [
    { title: "Décisions & avis", description: "Décisions de la CRSE et avis relatifs au secteur de l’électricité.", categories: "decisions,avis", badge: "Régulation" },
    { title: "Grilles tarifaires", description: "Barèmes et décisions tarifaires applicables aux usagers et opérateurs électriques.", categories: "grilles", badge: "Tarification" },
    { title: "Textes & rapports", description: "Cadre légal, rapports et études consacrés au secteur électrique.", categories: "textes,rapports", badge: "Références" },
  ],
  hydrocarbures: [
    { title: "Décisions & avis", description: "Décisions et avis relatifs aux activités aval des hydrocarbures.", categories: "decisions,avis", badge: "Régulation" },
    { title: "Structures des prix", description: "Structures de prix et barèmes officiels des produits pétroliers.", categories: "hydrocarbures", badge: "Tarification" },
    { title: "Textes & rapports", description: "Cadre légal, rapports et études du secteur aval des hydrocarbures.", categories: "textes,rapports", badge: "Références" },
  ],
  gaz: [
    { title: "Décisions & avis", description: "Décisions et avis relatifs aux segments aval et intermédiaire gaziers.", categories: "decisions,avis", badge: "Régulation" },
    { title: "Grilles & tarifs", description: "Documents tarifaires disponibles pour les activités et infrastructures gazières.", categories: "grilles", badge: "Tarification" },
    { title: "Textes & rapports", description: "Code gazier, textes d’application, rapports et études du secteur.", categories: "textes,rapports", badge: "Références" },
  ],
};

export const DocumentsSection = ({ sector }: { sector?: Sector }): ReactElement => {
  const sectorParam = sector ? `&secteur=${sector}` : "";
  const allDocumentsUrl = sector ? `/documents?secteur=${sector}` : "/documents";

  return (
    <section className="crse-documents-section w-full bg-white py-20" aria-label="Publications de référence">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <span className="text-[13px] font-bold tracking-wider text-shakespeare uppercase">
              Publications officielles
            </span>
            <h2 className="mt-1 text-[clamp(30px,3.2vw,42px)] font-bold text-chathams-blue">
              {sector ? "Documents" : "Documents & Guides"}
            </h2>
          </div>
          <Link
            to={allDocumentsUrl}
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-chathams-blue hover:text-shakespeare transition-colors"
          >
            <span>Consulter tous les documents</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_minmax(0,1fr)] gap-12 items-start">
          {/* Menu des rubriques documentaires */}
          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h3 className="text-[16px] font-bold text-chathams-blue mb-4 pb-3 border-b border-slate-200">
              {sector ? "Documents du secteur" : "Bibliothèque réglementaire"}
            </h3>
            <nav aria-label="Catégories de documents">
              <ul className="flex flex-col gap-2">
                {documentCategories.map((category) => (
                  <li key={category.label}>
                    <Link
                      to={`/documents?cats=${category.categories}${sectorParam}`}
                      className="flex items-center justify-between rounded-xl p-3 text-[14px] font-semibold text-slate-700 bg-white border border-slate-200/70 hover:border-chathams-blue hover:text-chathams-blue transition-all"
                    >
                      <span className="flex items-center gap-2.5">
                        <BookOpen size={16} className="text-shakespeare shrink-0" />
                        <span>{category.label}</span>
                      </span>
                      <span className="text-slate-400 text-[13px]">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Button
              asChild
              className="mt-6 w-full rounded-full bg-chathams-blue text-white shadow-sm hover:bg-chathams-blue/90 font-semibold"
            >
              <Link to={allDocumentsUrl}>
                <span>Accéder à la bibliothèque complète</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </aside>

          {/* Cartes interactives des 2 guides avec nouvelles images et redirection */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {sector
              ? sectorDocuments[sector].map((doc) => (
                <article
                  key={doc.title}
                  className="group flex min-h-56 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-chathams-blue hover:shadow-xl"
                >
                  <div>
                    <span className="rounded-md bg-shakespeare/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-shakespeare">{doc.badge}</span>
                    <h3 className="mt-4 text-[21px] font-bold leading-snug text-chathams-blue group-hover:text-shakespeare">{doc.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{doc.description}</p>
                  </div>
                  <Link
                    to={`/documents?cats=${doc.categories}&secteur=${sector}`}
                    className="mt-5 inline-flex items-center gap-2 border-t border-slate-100 pt-4 text-sm font-bold text-chathams-blue hover:text-shakespeare"
                  >
                    Consulter les documents <ArrowRight size={15} />
                  </Link>
                </article>
              ))
              : documentCards.map((doc) => (
              <article
                key={doc.title}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-chathams-blue hover:shadow-xl transition-all"
              >
                <div>
                  <Link to={doc.to} className="block overflow-hidden rounded-xl bg-slate-100 shadow-inner aspect-[3/4] mb-5">
                    <img
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={doc.image}
                      alt={doc.title}
                      loading="lazy"
                    />
                  </Link>

                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="rounded-md bg-shakespeare/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-shakespeare">
                      {doc.badge}
                    </span>
                    <span className="text-[12px] text-slate-400 font-medium">Édition Officielle</span>
                  </div>

                  <h3 className="text-[21px] font-bold text-chathams-blue group-hover:text-shakespeare transition-colors leading-snug">
                    <Link to={doc.to}>{doc.title}</Link>
                  </h3>

                  <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                    {doc.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
                  <Button
                    asChild
                    className="w-full rounded-full bg-chathams-blue py-3 font-semibold text-white hover:bg-shakespeare transition-colors gap-2"
                  >
                    <Link to={doc.to}>
                      <BookOpen size={16} />
                      <span>{doc.action}</span>
                    </Link>
                  </Button>

                  <a
                    href={doc.pdfUrl}
                    download
                    className="text-center text-[12px] font-semibold text-slate-500 hover:text-chathams-blue hover:underline py-1"
                  >
                    Télécharger la version PDF imprimable
                  </a>
                </div>
              </article>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
