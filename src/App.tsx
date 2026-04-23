import { useEffect, useState } from 'react'
//import './App.css'
import Navbar from './components/layouts/Navbar'
import AppRoutes from './routes/AppRoutes'
import { Slide, ToastContainer } from 'react-toastify'
import { getToken } from './lib/token'
import { getID } from './lib/id'
import { getRole } from './lib/role'
import { useAppDispatch } from './store/store'
import { getUserProfileAPI } from './api/user.api'
import { setAuth, setAuthToken, setRole, setUser } from './store/auth.reducer'

function App() {

  const token = getToken()
  const id = getID()
  const role = getRole()

  console.log("app token:", token)
  console.log("app id:", id)
  console.log("app role:", role)

  const dispatch = useAppDispatch()

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
    <div>
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
