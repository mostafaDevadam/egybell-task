import React from 'react'
import { useAppSelector } from '../store/store'

const DashboardPage = () => {
    const { user, role } = useAppSelector((state) => state.auth) 

    console.log({user, role})
  return (
    <div>
      <h1>Dashboard</h1>

      <div>
        <p>Email: {user!!.email}</p>
        <p>Role: {role}</p>
      </div>
      
      
      </div>
  )
}

export default DashboardPage