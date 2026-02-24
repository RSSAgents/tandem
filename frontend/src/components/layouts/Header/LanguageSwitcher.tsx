import { ActionIcon, Menu, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
];

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation('header');

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Menu shadow="md" width={100}>
      <Menu.Target>
        <ActionIcon variant="default" size="xl" radius="md" aria-label={t('selectLanguage')}>
          <Text>{i18n.resolvedLanguage?.toUpperCase()}</Text>
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {LANGUAGES.map((lang) => (
          <Menu.Item key={lang.code} onClick={() => changeLang(lang.code)}>
            {lang.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
