import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { defaultLanguage, resources, supportedLanguages } from "@/i18n/resources";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    supportedLngs: supportedLanguages,
    returnNull: false,
    interpolation: {
      escapeValue: false,
    },
  });
}

export { i18n };