import React, { useEffect, useState } from 'react'
import { USER_TYPE } from '../types'
import { getUsersAPI } from '../api/user.api'
import DataTable from '../components/data-tables/DataTable'

const UsersPage = () => {

  const [users, setUsers] = useState<USER_TYPE[]>()

  useEffect(() => {
     getUsersAPI().then((th) => {
      console.log("users:", th)
      th.data && setUsers(th.data)
     })
  }, [users])

  return (
    <div>
      <h1>Users</h1>
      <div>
        <DataTable  users={users!!} />
      </div>
    </div>
  )
}

export default UsersPage