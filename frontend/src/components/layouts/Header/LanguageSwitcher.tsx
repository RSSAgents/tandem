import { ActionIcon, Menu, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '../../../i18n/config';

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation('header');

  const currentLang = (i18n.resolvedLanguage || 'en').toUpperCase();

  return (
    <Menu shadow="md" width={100}>
      <Menu.Target>
        <ActionIcon
          variant="default"
          size="xl"
          radius="md"
          aria-label={`${t('selectLanguage')}: ${currentLang}`}
        >
          <Text aria-hidden="true"> {currentLang}</Text>
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {SUPPORTED_LANGUAGES.map((lang) => (
          <Menu.Item
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            aria-checked={i18n.resolvedLanguage === lang.code}
          >
            {lang.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
