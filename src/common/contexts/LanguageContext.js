import React, { useState, useEffect, useContext } from 'react';

const LanguageContext = React.createContext();
export const useLanguageContext = () => useContext(LanguageContext);

const rtlLanguages = [];
function setPageDirection(language) {
  const dir = rtlLanguages.includes(language) ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
}
export default function LanguageContextProvider({ children }) {
  const [language, changeLanguage] = useState('en');
  // setPageDirection("ar");
  useEffect(() => {
    // Update the document title using the browser API
    setPageDirection('en');
  }, []);
  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
