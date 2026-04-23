import React, { useActionState, useEffect } from 'react'
import { USER_TYPE } from '../../types'
import Label from './Label'
import InputEmail from './inputs/InputEmail'
import { toast } from 'react-toastify'
import InputHidden from './inputs/InputHidden'

type Props = {
     action: (prev: any, formData: FormData) => Promise<any>
    user: USER_TYPE
    buttonTitle: string
    title: string
}
const ProfileForm = ({buttonTitle, title, user, action}: Props) => {
     const [state, formAction] = useActionState(action, null)

      useEffect(() => {
             if (state?.success) {
                 toast.success(state.message)
                
             } else if (state?.error) {
                 toast.error(state.message)
             }
         }, [state])

  return (
      <div className="w-full">
            <h1 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">{title}</h1>
            <form action={formAction} className="flex flex-col gap-5 mx-auto">
                {user && user.id && <InputHidden name="userId" value={user.id} />}
               <div className="flex flex-col gap-2">
                    <Label htmlFor="role" className="block text-sm font-medium text-start" title="Role" />
                    <select name="role" defaultValue={user.role} required className={`px-2 block w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 text-sm sm:text-base cursor-pointer`}>
                        {/*<option value="0">Choose</option>*/}
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="block text-sm font-medium text-start" title="Email" />
                    <InputEmail defaultValue={user.email || null} />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white rounded-lg px-4 py-2 
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                     dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800"
                >
                    {buttonTitle}
                </button>
            </form>

        </div>
  )
}

export default ProfileForm