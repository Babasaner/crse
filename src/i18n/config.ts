export const supportedLanguages = ['fr', 'en', 'wo'] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]
export const defaultLanguage: SupportedLanguage = 'fr'