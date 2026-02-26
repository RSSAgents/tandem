import { useTranslation } from 'react-i18next';
import { AppLanguage } from '../i18n/config';
import { getLocalizedString } from '../utils/localize';

export type LocalizedString = Record<AppLanguage, string>;

export const useWidgetTranslation = () => {
  const { i18n } = useTranslation();

  const tw = (str: LocalizedString): string => {
    const currentLang = (i18n.resolvedLanguage || 'en') as AppLanguage;
    return getLocalizedString(str, currentLang);
  };

  return { tw };
};
