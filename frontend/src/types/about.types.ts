import { useTranslation as useTranslationOriginal } from 'react-i18next';

interface TeamMember {
  name: string;
  role: string;
  desc: string;
  bio: string;
  github: string;
}

interface AboutTranslations {
  title: string;
  subtitle: string;
  githubButton: string;
  team: {
    shakhzod: TeamMember;
    diana: TeamMember;
    khayitbek: TeamMember;
    daria: TeamMember;
    fayzullo: TeamMember;
    ilia: TeamMember;
    margarita: TeamMember;
    marta: TeamMember;
    vika: TeamMember;
    margaritaMaletz: TeamMember;
  };
}

interface Translations {
  about: AboutTranslations;
}

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: Translations;
    };
  }
}

export const useTranslation = () => {
  return useTranslationOriginal();
};
