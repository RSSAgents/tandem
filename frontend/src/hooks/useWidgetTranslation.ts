import { useTranslation } from 'react-i18next';
import { LocalizedString } from '../types/localizedString';
import { getLocalizedString } from '../utils/localize';

export const useWidgetTranslation = () => {
  const { i18n } = useTranslation();

  const tw = (str: LocalizedString): string => {
    const currentLang = (i18n.resolvedLanguage || 'en') as 'ru' | 'en';
    return getLocalizedString(str, currentLang);
  };

  return { tw };
};
