import { useEffect } from "react"
import { Navigate, Outlet, useParams } from "react-router"
import i18n from "./i18n/i18n"


const langs = ["en", "ar"]

export const LocaleLayout = () => {

    const { lng } = useParams<{lng: string}>()

    if(!lng || !langs.includes(lng)) return <Navigate to="/en" replace />

    useEffect(() => {
        i18n.changeLanguage(lng)
        document.dir = lng === "ar" ? "rtl" : "ltr"
    }, [lng])

    return <Outlet />
 }