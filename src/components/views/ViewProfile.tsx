import React, { useEffect, useState } from 'react'
import { USER_TYPE } from '../../types'

type Props = {
    user: USER_TYPE | null
}
const ViewProfile = ({ user }: Props) => {
    const [state, setState] = useState<USER_TYPE>()

    useEffect(() => {
        if(user){
            setState(user)
        }
    },[state, user])
    return (
        <div>
            <h1>ViewProfile</h1>
            {state && <div>
                <p>Email: {state!!.email}</p>
                <p>Role: {state!!.role}</p>
            </div>}

        </div>
    )
}

export default ViewProfile