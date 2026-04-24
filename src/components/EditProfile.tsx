import React from 'react'
import ProfileForm from './forms/ProfileForm'
import { USER_TYPE } from '../types'
import { updateUserAction } from '../actions/user.actions'

type Props = {
    user: USER_TYPE

}
const EditProfile = ({user}: Props) => {
  return (
     <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="text-center pb-5">
    
      </div>

      <div className="w-full max-w-md bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
         {user && <ProfileForm action={updateUserAction} buttonTitle='Update' title="edit-profile" user={user} />}
      </div>

    </div>
  )
}

export default EditProfile