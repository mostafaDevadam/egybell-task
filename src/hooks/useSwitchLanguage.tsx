
import React from 'react'
import { useLocation, useNavigate } from 'react-router'

const useSwitchLanguage = () => {
    const navigate = useNavigate()
    const location = useLocation()

    return (newLng: "en" | "ar") => {
        const seg = location.pathname.split("/")
        seg[1] = newLng
        navigate(seg.join("/"))
    }
  
}

export default useSwitchLanguage