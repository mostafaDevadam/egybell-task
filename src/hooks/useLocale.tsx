"use client";

import React from 'react'
import { useLocation } from 'react-router';

const useLocale = () => {
   const location = useLocation()
   return location.pathname.split("/")[1] || "en"
}

export default useLocale