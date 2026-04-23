import React, { Suspense, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import ViewProfile from '../components/views/ViewProfile'
import EditProfile from '../components/EditProfile'
import { useAppSelector } from '../store/store'
import { Role } from '../enums'
import { getUserProfileAPI } from '../api/user.api'
import { USER_TYPE } from '../types'

const ProfilePage = () => {
  const { id } = useParams()
  const { role, user: currentUser } = useAppSelector(state => state.auth)
  const { pathname } = useLocation()
  const [isView, setIsView] = useState<boolean>(false)
  const [user, setUser] = useState<USER_TYPE | null>(null)
    const [isOwn, setIsOwn] = useState<boolean>(false)


  useEffect(() => {
    if (pathname.includes("edit")) {
      setIsView(false)
    } else if (pathname.includes("view")) {
      setIsView(true)
    } else if (pathname.endsWith("profile")) {
      setIsView(false)

    }
  }, [pathname])


  useEffect(() => {
    if (id) {
      getUserProfileAPI(id).then((th) => {
        setUser(th.data)
      })
    } /*else if (role === Role.USER) {
      setUser(currentUser)
    }*/
  }, [id, role])

  useEffect(() => { 
    if(!id) {
      setIsOwn(true)
      setUser(currentUser)
    }
  }, [user, role])


   useEffect(() => { 
   console.log("currentUser:", currentUser)
   },[currentUser])

  console.log("profile:", id, pathname)
  return (
    <div>
      <h1></h1>
      <Suspense fallback={<div>Loading...</div>}></Suspense>
        {!isView && role === Role.ADMIN && user && id && <EditProfile user={user} />}
        {isView && role === Role.ADMIN && user && id && <ViewProfile user={user} />}
        {!id && <ViewProfile user={currentUser} />}
       
        {currentUser?.id}

      
    </div>
  )
}

export default ProfilePage