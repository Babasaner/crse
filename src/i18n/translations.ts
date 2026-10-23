import fr from './locales/fr.json'
import en from './locales/en.json'
import wo from './locales/wo.json'
import type { SupportedLanguage } from './config'

export const translations = { fr, en, wo } satisfies Record<SupportedLanguage, Record<string, string>>