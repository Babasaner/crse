import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SiteLayout } from '../components/layout/SiteLayout'
import { HomePage } from '../pages/HomePage'
import { ContentPage } from '../pages/ContentPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { SearchResultsPage } from '../pages/SearchResultsPage'
import { DocumentsPage } from '../pages/DocumentsPage'
import { NewsListingPage } from '../pages/NewsListingPage'
import { NewsDetailPage } from '../pages/NewsDetailPage'
import { ReclamationsPage } from '../pages/ReclamationsPage'
import { ContactPage } from '../pages/ContactPage'
import { FaqPage } from '../pages/FaqPage'
import { RecrutementPage } from '../pages/RecrutementPage'
import { AgendaPage } from '../pages/AgendaPage'
import { HubPage } from '../pages/HubPage'
import { GuideConsommateurPage } from '../pages/GuideConsommateurPage'
import { LivretInvestisseurPage } from '../pages/LivretInvestisseurPage'
import { MotDuPresidentPage } from '../pages/MotDuPresidentPage'
import { PresentationPage } from '../pages/PresentationPage'
import { OrganisationPage } from '../pages/OrganisationPage'
import { AssociationsConsommateursPage } from '../pages/AssociationsConsommateursPage'
import { SecteursPage } from '../pages/SecteursPage'
import { SectorActorsPage } from '../pages/SectorActorsPage'
import { OperateursMarchePage } from '../pages/OperateursMarchePage'
import { QualityPolicyPage } from '../pages/QualityPolicyPage'
import { pages } from '../data/pages'
import { siteNavigation } from '../data/siteNavigation'
import type { PageInfo } from '../types/page'

const navigationPageDetails: Record<string, { description: string; body: string }> = {
  '/mot-du-president': { description: 'Le mot du Président de la Commission de régulation du secteur de l’énergie.', body: 'La CRSE accompagne les évolutions du secteur de l’énergie avec indépendance, transparence et sens de l’intérêt général. Retrouvez ici le message du Président et les priorités portées par la Commission.' },
  '/presentation': { description: 'Découvrez le rôle, le cadre légal et les missions de la CRSE.', body: 'La Commission de régulation du secteur de l’énergie est une autorité administrative indépendante chargée de la régulation du secteur de l’électricité et des segments aval des hydrocarbures et du gaz au Sénégal.' },
  '/organisation': { description: 'Découvrez les instances, les comités et les directions de la Commission.', body: 'La gouvernance de la CRSE s’appuie sur des instances de décision, des comités consultatifs et des équipes spécialisées couvrant les différents secteurs régulés.' },
  '/electricite/acteurs': { description: 'Présentation des acteurs et du fonctionnement du secteur de l’électricité.', body: 'Explorez les rôles des acteurs de la production, du transport, de la distribution et de la fourniture d’électricité au Sénégal.' },
  '/electricite/chiffres-cles': { description: 'Les indicateurs essentiels du secteur de l’électricité.', body: 'Retrouvez les données clés du secteur et les publications de référence de la Commission. Les indicateurs seront actualisés à partir des sources officielles de la CRSE.' },
  '/electricite/grilles-tarifaires': { description: 'Consultez les grilles tarifaires et décisions applicables à l’électricité.', body: 'Les grilles tarifaires et décisions correspondantes sont publiées dans la bibliothèque documentaire de la Commission.' },
  '/hydrocarbures/acteurs': { description: 'Présentation des acteurs du secteur aval des hydrocarbures.', body: 'Le secteur aval couvre notamment l’importation, le raffinage, le stockage, le transport, la distribution et la commercialisation des produits pétroliers.' },
  '/hydrocarbures/chiffres-cles': { description: 'Les données de référence du secteur aval des hydrocarbures.', body: 'Cette rubrique rassemble les statistiques et publications officielles portant sur les activités aval des hydrocarbures.' },
  '/hydrocarbures/structures-des-prix': { description: 'Comprendre la structure des prix des produits pétroliers.', body: 'Consultez les composantes et les publications officielles relatives aux structures de prix des hydrocarbures.' },
  '/gaz/acteurs': { description: 'Les acteurs du secteur aval et intermédiaire gazier.', body: 'Découvrez les activités gazières régulées et les rôles des acteurs du secteur au Sénégal.' },
  '/consommateurs/associations': { description: 'Les associations de consommateurs et leur participation au secteur.', body: 'La CRSE favorise le dialogue avec les associations de consommateurs et leur participation aux consultations publiques.' },
  '/consommateurs/guide': { description: 'Le guide pour connaître vos droits et mieux comprendre le secteur.', body: 'Retrouvez les informations pratiques, les démarches et les repères utiles aux consommateurs d’énergie.' },
  '/operateurs/marches': { description: 'Informations et démarches destinées aux opérateurs des marchés régulés.', body: 'Retrouvez les obligations, procédures et publications destinées aux opérateurs intervenant sur les marchés régulés par la CRSE.' },
  '/operateurs/livret-investisseur': { description: 'Les repères utiles aux investisseurs du secteur de l’énergie.', body: 'Le livret de l’investisseur présente les secteurs régulés, le cadre institutionnel et les principales étapes d’investissement.' },
  '/documents/textes': { description: 'Textes législatifs et réglementaires applicables aux secteurs régulés.', body: 'Accédez aux lois, décrets et textes réglementaires relatifs au secteur de l’énergie et aux compétences de la CRSE.' },
  '/documents/decisions-avis': { description: 'Les décisions et avis publiés par la Commission.', body: 'La bibliothèque documentaire rassemble les décisions et avis adoptés par la CRSE, classés par date et par secteur.' },
  '/documents/grilles-tarifaires': { description: 'Les grilles tarifaires applicables aux secteurs régulés.', body: 'Consultez les grilles et décisions tarifaires publiées par la Commission.' },
  '/documents/structures-prix': { description: 'Les structures des prix des hydrocarbures publiées par la CRSE.', body: 'Retrouvez les éléments de structure et les publications tarifaires relatives aux produits pétroliers.' },
  '/documents/bulletin-officiel': { description: 'Les bulletins officiels de la Commission.', body: 'Consultez les bulletins officiels et les principales publications institutionnelles de la CRSE.' },
  '/documents/consultations': { description: 'Les consultations publiques ouvertes ou clôturées.', body: 'La CRSE invite les acteurs et le public à contribuer à ses consultations. Consultez les avis, les documents associés et les modalités de participation.' },
  '/documents/rapports': { description: 'Rapports et études sur les secteurs régulés.', body: 'Accédez aux rapports d’activité, études sectorielles et publications de référence de la Commission.' },
}

const customRoutes = [
  '/',
  '/politique-qualite',
  '/mot-du-president',
  '/presentation',
  '/organisation',
  '/consommateurs/associations',
  '/operateurs/marches',
  '/operateurs/pour-les-operateurs',
  '/operateurs/livret-investisseur',
  '/documents',
  '/guide-du-consommateur',
  '/livret-de-linvestisseur',
  '/actualites',
  '/reclamations',
  '/contact',
  '/faq',
  '/recrutement',
  '/agenda',
  '/recherche',
  '/la-crse',
  '/secteurs',
  '/electricite',
  '/hydrocarbures',
  '/gaz',
  '/electricite/acteurs',
  '/hydrocarbures/acteurs',
  '/gaz/acteurs',
  '/consommateurs',
  '/operateurs',
  '/medias',
]

const navigationPages: PageInfo[] = siteNavigation.flatMap((menu, menuIndex) =>
  menu.groups.flatMap((group) =>
    group.items
      .filter((item) => !customRoutes.includes(item.to) && !pages.some((page) => page.path === item.to))
      .filter((item) => !item.to.startsWith('/documents?'))
      .map((item, itemIndex) => {
        const details = navigationPageDetails[item.to] ?? {
          description: `${item.label} : informations, documents et démarches publiés par la CRSE.`,
          body: `Consultez les informations officielles de la CRSE concernant « ${item.label} », ainsi que les documents, procédures et contacts associés.`,
        }
        return {
          path: item.to,
          title: item.label,
          eyebrow: menu.label,
          number: `${menuIndex + 1}.${itemIndex + 1}`,
          ...details,
        }
      })
  )
)

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          {/* Page d'Accueil */}
          <Route path="/" element={<HomePage />} />

          {/* Hubs des rubriques principales (Onglets du menu) */}
          <Route path="/la-crse" element={<HubPage hubKey="la-crse" />} />
          <Route path="/secteurs" element={<SecteursPage />} />
          <Route path="/secteur-electricite" element={<SecteursPage />} />
          <Route path="/electricite" element={<SecteursPage secteur="electricite" />} />
          <Route path="/hydrocarbures" element={<SecteursPage secteur="hydrocarbures" />} />
          <Route path="/gaz" element={<SecteursPage secteur="gaz" />} />
          <Route path="/electricite/acteurs" element={<SectorActorsPage sector="electricite" />} />
          <Route path="/hydrocarbures/acteurs" element={<SectorActorsPage sector="hydrocarbures" />} />
          <Route path="/gaz/acteurs" element={<SectorActorsPage sector="gaz" />} />
          <Route path="/consommateurs" element={<HubPage hubKey="consommateurs" />} />
          <Route path="/operateurs" element={<HubPage hubKey="operateurs" />} />
          <Route path="/operateurs/marches" element={<OperateursMarchePage />} />
          <Route path="/operateurs/pour-les-operateurs" element={<OperateursMarchePage />} />
          <Route path="/operateurs/livret-investisseur" element={<LivretInvestisseurPage />} />
          <Route path="/medias" element={<HubPage hubKey="medias" />} />

          {/* Documents avec prévisualisation et téléchargement */}
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/guide-du-consommateur" element={<GuideConsommateurPage />} />
          <Route path="/livret-de-linvestisseur" element={<LivretInvestisseurPage />} />

          {/* Actualités : listing complet avec filtres et vue détaillée */}
          <Route path="/actualites" element={<NewsListingPage />} />
          <Route path="/actualites/:slug" element={<NewsDetailPage />} />

          {/* Nouvelles pages spécialisées */}
          <Route path="/reclamations" element={<ReclamationsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/recrutement" element={<RecrutementPage />} />
          <Route path="/agenda" element={<AgendaPage />} />

          {/* Pages institutionnelles spécialisées */}
          <Route path="/mot-du-president" element={<MotDuPresidentPage />} />
          <Route path="/presentation" element={<PresentationPage />} />
          <Route path="/organisation" element={<OrganisationPage />} />
          <Route path="/consommateurs/associations" element={<AssociationsConsommateursPage />} />
          <Route path="/politique-qualite" element={<QualityPolicyPage />} />
          <Route path="/recherche" element={<SearchResultsPage />} />

          {/* Pages de contenu dynamique */}
          {pages.map((page) => (
            <Route key={page.path} path={page.path} element={<ContentPage page={page} />} />
          ))}
          {navigationPages.map((page) => (
            <Route key={page.path} path={page.path} element={<ContentPage page={page} />} />
          ))}

          {/* Page 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}