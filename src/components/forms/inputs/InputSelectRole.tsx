"use client";

import React from 'react'
import { useTranslation } from 'react-i18next';

const InputSelectRole = () => {
     const { t } = useTranslation()

  return (
    <select name="role" role="role" defaultValue={"admin"} className={`px-2 block w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 text-sm sm:text-base cursor-pointer`}>
                        {/*<option value="0">Choose</option>*/}
                        <option value="user">{t("form.user")}</option>
                        <option value="admin">{t("form.admin")}</option>
                    </select>
  )
}

export default InputSelectRole