import React, { useEffect, useState } from 'react'
import { USER_TYPE } from '../../types'

type Props = {
    user: USER_TYPE | null
}
const ViewProfile = ({ user }: Props) => {
    const [state, setState] = useState<USER_TYPE>()

    const bio = `
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti a ipsum esse voluptate dolorem quasi! Libero assumenda maiores reiciendis quod veniam? Vel, modi? Modi similique expedita quasi quo vero. Voluptate?`

    useEffect(() => {
        if (user) {
            setState(user)
        }
    }, [state, user])
    return (
        <div>
            <p className='text-gray-500 text-2xl p-2' data-testid="title">Profile</p>
            {state &&
                <div className='text-start px-4 flex flex-col gap-5'>
                    <p className='bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700' data-testid="email">Email: {state!!.email}</p>
                    <p className='bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 sm:mt-10' data-testid="role">Role: {state!!.role}</p>
                    <div className='bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 sm:mt-10'>
                        <p data-testid="bio">Bio</p>
                        <p data-testid="bio-content">{bio}</p>


                    </div>
                </div>

            }

        </div>
    )
}

export default ViewProfile