"use client";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSwitchLanguage from '../../hooks/useSwitchLanguage';

export default function LanguageSwitcher() {


  const [state, setState] = useState<string>();

  const { t, i18n } = useTranslation()

  const sw = useSwitchLanguage()

  useEffect(() => {
    // setState();
  }, []);


  const handleChange = (newLocale: string) => {
    console.log("newLocale", newLocale)
    //if (newLocale === currentLocale) return;
    setState(newLocale);
    i18n.changeLanguage(newLocale);
    document.dir = newLocale === "ar" ? "rtl" : "ltr"
    localStorage.setItem("locale", newLocale);
    sw(newLocale as "en" | "ar")

  };


  function cutLocale(path: string) {
    return path.replace(/^\/?(ar|en|de|fr)(?=\/|$)/, "");
  }



  return (
    <div className="relative w-full sm:w-48 md:w-64 custom-700:w-90" dir={state === 'ar' ? 'rtl' : 'ltr'}>

      <select
        id="locale"
        value={state}
        onChange={(e) => handleChange(e.target.value)}
        className={`
      block w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 text-sm sm:text-base cursor-pointer
      ${state === 'ar' ? 'pr-4 pl-8 text-right' : 'px-4 pr-8 text-left'} custom-700:w-90
    `}
      >
        <option value="en">English</option>
        <option value="ar">العربية</option>
      </select>

      {<div className={`pointer-events-none absolute inset-y-0 flex items-center px-2 text-gray-700 ${state === 'ar' ? 'left-0' : 'right-0'}`}>
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>}
    </div>
  );
}