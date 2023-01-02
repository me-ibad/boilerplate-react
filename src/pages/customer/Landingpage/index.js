import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useTranslation from 'common/customHooks/translations';
import { useLanguageContext } from 'common/contexts/LanguageContext';

function LandingPage() {
  let navigate = useNavigate();
  const t = useTranslation();
  const { language, changeLanguage } = useLanguageContext();
  return (
    <div>
     abc
    </div>
  );
}

export default LandingPage;
