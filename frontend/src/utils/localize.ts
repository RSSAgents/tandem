import { AppLanguage } from '../i18n/config';
import { LocalizedString } from '../types/localizedString';

export function getLocalizedString(str: LocalizedString, lang: AppLanguage = 'en'): string {
  if (!str) return '';
  return str[lang] || str.en || '';
}
