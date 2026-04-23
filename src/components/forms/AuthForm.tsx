

import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputPassword from "./inputs/InputPassword";
import InputEmail from "./inputs/InputEmail";
import Label from "./Label";
import { useNavigate } from "react-router";


type Props = {
    action: (prev: any, formData: FormData) => Promise<any>
    buttonTitle: string
    formTitle: string
    isRole: boolean
    isConfirm: boolean
    //locale: string
    //session?: string | null
}

const AuthForm = ({ action, buttonTitle, formTitle, isConfirm = false, isRole = true }: Props) => {

    const [state, formAction] = useActionState(action, null)
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [isMatched, setIsMatched] = useState<boolean>(false)
    const [showError, setShowError] = useState<boolean>(false);
    const [showEmailError, setShowEmailError] = useState<boolean>(false);
    const [showPasswordError, setShowPasswordError] = useState<boolean>(false);
    const [showConfirmPasswordError, setShowConfirmPasswordError] = useState<boolean>(false);
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(false)

    const navigate = useNavigate()

    useEffect(() => {

    }, [])

    useEffect(() => {
        if (state?.success) {
            toast.success(state.message)
            if (state?.message.startsWith("Registration")) { navigate("/login") }
            if (state?.data?.access_token!!) {
                navigate("/")
            }
        } else if (state?.error) {
            toast.error(state.message)
        }
    }, [state])




    

    const handleChangeEmail = (e: any) => {
        const value = e.target.value
        setShowEmailError(value.length === 0 || !value.includes("@"));
    }

    const handleChangePassword = (e: any) => {
        const value = e.target.value
        setPassword(value);
        setShowPasswordError(value.length < 6 || value.length === 0)
    }

    const handleChangeConfirmPassword = (e: any) => {
        const value = e.target.value
        setConfirmPassword(value);
        setShowConfirmPasswordError(value.length > 0 && value !== password);
        setIsMatched(value.length > 0 && value !== password ? false : true);
    }

    useEffect(() => {
        setIsEmpty(password && !confirmPassword ? true : false)
    }, [isEmpty, password, confirmPassword])


    return (
        <div className="w-full" id="main">
            <h1 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100" data-testid="form-title">{formTitle}</h1>
            <form action={formAction} className="flex flex-col gap-5 mx-auto">
                {isRole && <div className="flex flex-col gap-2">
                    <Label htmlFor="role" className="block text-sm font-medium text-start" title="Role" />
                    <select name="role" role="role" defaultValue={"admin"} className={`px-2 block w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 text-sm sm:text-base cursor-pointer`}>
                        {/*<option value="0">Choose</option>*/}
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>}
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="block text-sm font-medium text-start" title="Email" />
                    <InputEmail onChange={handleChangeEmail} />
                </div>
                {showEmailError && <div>
                    <p className="text-red-500 px-2 py-1 rounded-lg">Email is required and Enter your  email,please!</p>
                </div>}
                <div className="flex flex-col gap-1.5 sm:gap-2">
                    <Label htmlFor="password" className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-100 text-start" title={"Password"} />
                    <InputPassword value={password} onChange={handleChangePassword} minLength={6} />
                </div>

                {showPasswordError && <div>
                    <p className="text-red-500 px-2 py-1 rounded-lg hover:bg-red-400 hover:text-gray-100">Password is required</p>
                    <p className="text-red-500 px-2 py-1 rounded-lg hover:bg-red-400 hover:text-gray-100">Password must be at least 6 characters long </p>
                </div>}

                {isConfirm &&
                    (
                        <>
                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                <Label htmlFor="confirmPassword" className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-100 text-start" title={"Confirm Password"} />
                                <InputPassword value={confirmPassword} name="confirmPassword" onChange={handleChangeConfirmPassword} />
                            </div>
                            {!isMatched && <div>
                                <p className="text-red-500 px-2 py-1 rounded-lg hover:bg-red-400 hover:text-gray-100">Password is not matched</p>
                            </div>}
                            {showConfirmPasswordError && <div>
                                <p className="text-red-500 px-2 py-1 rounded-lg hover:bg-red-400 hover:text-gray-100">Confirm Password is required</p>
                            </div>}
                        </>
                    )
                }

                <button
                    type="submit"
                    role="button"
                    data-testid="submit-button"
                    className={`bg-blue-600 text-white rounded-lg px-4 py-2 
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                     dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800 
                     ${showError || showEmailError || showPasswordError || showConfirmPasswordError ? 'cursor-not-allowed' : ''} `}
                    disabled={showEmailError || showPasswordError || showConfirmPasswordError}
                >
                    {buttonTitle}
                </button>
            </form>

        </div>
    )
}

export default AuthForm
