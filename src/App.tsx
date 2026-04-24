import { useEffect, useState } from 'react'
//import './App.css'
import Navbar from './components/layouts/Navbar'
import AppRoutes from './routes/AppRoutes'
import { Slide, ToastContainer } from 'react-toastify'
import { getToken } from './lib/token'
import { getID } from './lib/id'
import { getRole } from './lib/role'
import { useAppDispatch } from './store/store'
import { getUserProfileAPI } from './api_/user.api'
import { setAuth, setAuthToken, setRole, setUser } from './store/auth.reducer'
import { APP_ACCESS_TOKEN } from './key'
import { useTranslation } from 'react-i18next'

function App() {

  const token = getToken(APP_ACCESS_TOKEN)
  const id = getID()
  const role = getRole()

  console.log("app token:", token)
  console.log("app id:", id)
  console.log("app role:", role)

  const dispatch = useAppDispatch()

  const locale = localStorage.getItem("locale")
  const { i18n} = useTranslation()

  useEffect(() => {
      document.dir = locale === "ar" ? "rtl" : "ltr"
      i18n.changeLanguage(locale ?? "en")

  }, [ locale])
  if (locale) {
    
  }

  useEffect(() => {
    if (token && id && role) {
      dispatch(setAuthToken(token))
      dispatch(setRole(role))
      dispatch(setAuth(true))
      getUserProfileAPI(id).then((th) => {
        console.log("th:", th.data)
        dispatch(setUser(th.data))

      })
    }

  }, [token, id, role])

  return (
    <div className={`${locale === "ar" ? "ar-font" : ""}`}>
      <header>
        <Navbar />
      </header>

      <main>
        <AppRoutes />
      </main>

      <ToastContainer
        transition={Slide}
        position={"top-right"}
        className={""}
        autoClose={5000} // false
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"dark"}
      />

    </div>
  )
}

export default App
