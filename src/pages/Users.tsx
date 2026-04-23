import React, { Suspense, useEffect, useState } from 'react'
import { USER_TYPE } from '../types'
import { getUsersAPI } from '../api/user.api'
import DataTable from '../components/data-tables/DataTable'
import { truncate } from 'node:fs'
import Spinner from '../components/Spinner'

const UsersPage = () => {

  const [users, setUsers] = useState<USER_TYPE[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  //const [isMounted, setIsMounted] = useState<boolean>()
  const [isFinished, setIsFinished] = useState<boolean>(false)

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
    }, 5000)
    return () => {
      clearTimeout(time)
      setIsFinished(true)
      setIsLoading(false)
      mounted = false
    }
  }, [users])

  return (
    <div>
      <h1>Users</h1>
      <div>
        {!isFinished || !users && isLoading && <div><Spinner title="Loading..." /> </div>}

        <Suspense fallback={<Spinner title="Loading..." />}>
          {users &&
            <DataTable users={users!!} />
          }
        </Suspense>

      </div>
    </div>
  )
}

export default UsersPage