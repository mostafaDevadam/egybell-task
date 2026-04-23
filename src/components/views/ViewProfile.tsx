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
            <p className='text-gray-500 text-2xl p-2'>Profile</p>
            {state &&
                <div className='text-start px-4 flex flex-col gap-5'>
                    <p className='bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700'>Email: {state!!.email}</p>
                    <p className='bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 sm:mt-10'>Role: {state!!.role}</p>
                    <div className='bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 sm:mt-10'>
                        <p>Bio</p>
                        <p>{bio}</p>


                    </div>
                </div>

            }

        </div>
    )
}

export default ViewProfile