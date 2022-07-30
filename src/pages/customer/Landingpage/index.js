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
      <div>
        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
        >
          <option value='' disabled selected>
            {t.lang}
          </option>
          <option value='en'>English</option>
          <option value='ar'>عربى</option>
        </select>
      </div>
      <button onClick={() => navigate('/home')} className='text-emerald-700	'>
        {/* {t.hello} */}
        <i class='fa-thin fa-treasure-chest'></i>
      </button>
      &nbsp;
      <input type='checkbox' class='accent-pink-500' checked />
      <button onClick={() => toast('Welcome!')}> {t.welcome}</button>
    </div>
  );
}

export default LandingPage;
