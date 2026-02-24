import { LocalizedString } from '../types/localizedString';

export function getLocalizedString(str: LocalizedString, lang: 'ru' | 'en' = 'en'): string {
  return str[lang] || str.en;
}
