import React, { useActionState, useEffect } from 'react'
import { USER_TYPE } from '../../types'
import Label from './Label'
import InputEmail from './inputs/InputEmail'
import { toast } from 'react-toastify'
import InputHidden from './inputs/InputHidden'
import { useTranslation } from 'react-i18next'
import InputSelectRole from './inputs/InputSelectRole'

type Props = {
     action: (prev: any, formData: FormData) => Promise<any>
    user: USER_TYPE
    buttonTitle: string
    title: string
}
const ProfileForm = ({buttonTitle, title, user, action}: Props) => {
     const [state, formAction] = useActionState(action, null)
       const { t } = useTranslation()

      useEffect(() => {
             if (state?.success) {
                 toast.success(state.message)
                
             } else if (state?.error) {
                 toast.error(state.message)
             }
         }, [state])

  return (
      <div className="w-full">
            <h1 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">{t(`form.${title.toLowerCase()}`)}</h1>
            <form action={formAction} className="flex flex-col gap-5 mx-auto">
                {user && user.id && <InputHidden name="userId" value={user.id} />}
               <div className="flex flex-col gap-2">
                    <Label htmlFor="role" className="block text-sm font-medium text-start" title={t("form.role")} />
                    <InputSelectRole />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="block text-sm font-medium text-start" title={t("form.email")} />
                    <InputEmail defaultValue={user.email || null} />
                </div>

                <button
                    type="submit"
                    data-testid="submit-button"
                    className="bg-blue-600 text-white rounded-lg px-4 py-2 
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                     dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800"
                >
                    {t(`form.${buttonTitle.toLowerCase()}`)}
                </button>
            </form>

        </div>
  )
}

export default ProfileForm