import React from 'react'
import { USER_TYPE } from '../../types'

type Props = {
    user: USER_TYPE | null
}
const ViewProfile = ({ user }: Props) => {
    return (
        <div>
            <h1>ViewProfile</h1>
            {user && <div>
                <p>Email: {user!!.email}</p>
                <p>Role: {user!!.role}</p>
            </div>}

        </div>
    )
}

export default ViewProfile