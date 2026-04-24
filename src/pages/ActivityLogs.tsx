import React, { useEffect, useState } from 'react'
import { LOG_TYPE } from '../types'
import { getLogsAPI } from '../api_/logs.api'
import Table from '../components/data-tables/Table'
import Spinner from '../components/Spinner'

const ActivityLogsPage = () => {
    const [logs, setLogs] = useState<LOG_TYPE[]>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)

    /*useEffect(() => {
        getLogsAPI().then(
            (th) => {
                setLogs(th.data)
                console.log("logs th:", th)
            })
        
    }, [logs])*/

    useEffect(() => {
        let mounted = true
        setIsLoading(true)
        const time = setTimeout(() => {
            getLogsAPI().then((th) => {
                // if (!mounted) return
                setIsLoading(false)
                console.log("users:", th)
                th.data && setLogs(th.data)
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
    }, [logs])


    return (
        <div>
            <p className='text-gray-500 text-2xl p-2'>Activity Logs</p>
            {!logs && isLoading && <div><Spinner title="Loading..." /> </div>}
            {logs && <Table fields={["id", "action", "user", "timestamp" ]} docs={logs} isActions={false} />}
        </div>
    )
}

export default ActivityLogsPage