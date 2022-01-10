//import React, { useState, useContext } from "react";
import LocalizedStrings from 'react-localization';
import localization from 'common/language';
import { useLanguageContext } from 'common/contexts/LanguageContext';

export default function useTranslation() {
  const { language } = useLanguageContext();
  let translation = new LocalizedStrings(localization);

  translation.setLanguage(language);
  return translation;
}
