import React, { Suspense, useEffect, useState } from 'react'
import { USER_TYPE } from '../types'
import { getUsersAPI } from '../api_/user.api'
import DataTable from '../components/data-tables/DataTable'
import Spinner from '../components/Spinner'
import Table from '../components/data-tables/Table'

const UsersPage = () => {

  const [users, setUsers] = useState<USER_TYPE[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  

  useEffect(() => {
    let mounted = true
    setIsLoading(true)
    const time = setTimeout(() => {
      getUsersAPI().then((th) => {
        // if (!mounted) return
        setIsLoading(false)
        console.log("users:", th)
        th.data && setUsers(th.data)
      }).catch((err) => {
        console.log("err:", err)
        // if (!mounted) return
        setIsError(true)
      }).finally(() => {
        //if (!mounted) return
        setIsLoading(false)
        setIsError(false)
      })
    }, 1000)
    return () => {
      clearTimeout(time)
      setIsLoading(false)
      mounted = false
    }
  }, [users])

  return (
    <div>
      <p className='text-gray-500 text-2xl p-2 dark:text-gray-100'>Users List</p>

      <div>
        {!users && isLoading && <div><Spinner title="Loading..." /> </div>}
        <Suspense fallback={<Spinner title="Loading..." />}>
           {users && <Table fields={["id", "email", "role", "actions"]} docs={users} isActions={true} />}
        </Suspense>
      </div>
    </div>
  )
}

export default UsersPage