import { ActionIcon, Menu, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '../../../i18n/config';

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation('header');

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Menu shadow="md" width={100}>
      <Menu.Target>
        <ActionIcon
          variant="default"
          size="xl"
          radius="md"
          aria-label={`${t('selectLanguage')}. ${i18n.resolvedLanguage?.toUpperCase()}`}
        >
          <Text aria-hidden="true">{i18n.resolvedLanguage?.toUpperCase()}</Text>
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {SUPPORTED_LANGUAGES.map((lang) => (
          <Menu.Item
            key={lang.code}
            onClick={() => changeLang(lang.code)}
            role="menuitemradio"
            aria-checked={i18n.resolvedLanguage === lang.code}
          >
            {lang.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
