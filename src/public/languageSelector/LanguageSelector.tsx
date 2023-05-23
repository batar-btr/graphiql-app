import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <select className="lang" onChange={changeLanguage} value={i18n.language}>
      <option value="en">EN</option>
      <option value="ru">РУ</option>
    </select>
  );
}

export default LanguageSelector;
