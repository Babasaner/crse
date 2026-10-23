export type SiteNavItem = {
  label: string
  to: string
  description?: string
}

export type SiteNavGroup = {
  label?: string
  items: SiteNavItem[]
}

export type SiteNavMenu = {
  label: string
  groups: SiteNavGroup[]
}

export const siteNavigation: SiteNavMenu[] = [
  {
    label: 'La CRSE',
    groups: [{ items: [
      { label: 'Mot du Président', to: '/mot-du-president' },
      { label: 'Présentation', to: '/presentation' },
      { label: 'Organisation', to: '/organisation' },
      { label: 'Politique qualité', to: '/politique-qualite' },
    ] }],
  },
  {
    label: 'Secteurs régulés',
    groups: [
      { label: 'Électricité', items: [
        { label: 'Vue du secteur', to: '/electricite' },
        { label: 'Présentation des acteurs', to: '/electricite/acteurs' },
        { label: 'Chiffres clés', to: '/electricite/chiffres-cles' },
        { label: 'Grilles tarifaires', to: '/electricite/grilles-tarifaires' },
      ] },
      { label: 'Aval des hydrocarbures', items: [
        { label: 'Vue du secteur', to: '/hydrocarbures' },
        { label: 'Présentation des acteurs', to: '/hydrocarbures/acteurs' },
        { label: 'Chiffres clés', to: '/hydrocarbures/chiffres-cles' },
        { label: 'Structures des prix', to: '/hydrocarbures/structures-des-prix' },
      ] },
      { label: 'Aval et intermédiaire gaziers', items: [
        { label: 'Vue du secteur', to: '/gaz' },
        { label: 'Présentation des acteurs', to: '/gaz/acteurs' },
      ] },
    ],
  },
  {
    label: 'Consommateurs',
    groups: [{ items: [
      { label: 'Associations de consommateurs', to: '/consommateurs/associations' },
      { label: 'Guide du consommateur', to: '/consommateurs/guide' },
      { label: 'Réclamations', to: '/reclamations' },
    ] }],
  },
  {
    label: 'Opérateurs',
    groups: [{ items: [
      { label: 'Opérateurs sur les marchés', to: '/operateurs/marches' },
      { label: 'Livret de l’investisseur', to: '/operateurs/livret-investisseur' },
    ] }],
  },
  {
    label: 'Textes et documents',
    groups: [{ items: [
      { label: 'Textes législatifs et réglementaires', to: '/documents?cats=textes' },
      { label: 'Décisions et avis', to: '/documents?cats=decisions,avis' },
      { label: 'Grilles tarifaires', to: '/documents?cats=grilles' },
      { label: 'Structures des prix des hydrocarbures', to: '/documents?cats=hydrocarbures&secteur=hydrocarbures' },
      { label: 'Bulletin officiel', to: '/documents?cats=bulletins' },
      { label: 'Consultations publiques', to: '/documents?cats=consultations' },
      { label: 'Rapports', to: '/documents?cats=rapports' },
    ] }],
  },
  {
    label: 'Médias',
    groups: [{ items: [
      { label: 'Agenda', to: '/agenda' },
      { label: 'Actualités', to: '/actualites' },
    ] }],
  },
]

export const utilityNavigation: SiteNavItem[] = [
  { label: 'Faire une réclamation', to: '/reclamations' },
  { label: 'Espace presse', to: '/actualites' },
  { label: 'Nous contacter', to: '/contact' },
  { label: 'Recrutement', to: '/recrutement' },
  { label: 'FAQ', to: '/ressources' },
]