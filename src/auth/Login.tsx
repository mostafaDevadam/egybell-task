import React from 'react'
import AuthForm from '../components/forms/AuthForm'
import { loginAction } from '../actions/auth.actions'

const Login = () => {
  return (

     <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="text-center pb-5">
        {/*<h1 className="text-center text-3xl font-bold text-gray-800 dark:text-white">Login</h1>*/}
      </div>

      <div className="w-full max-w-md bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <AuthForm action={loginAction} buttonTitle="Login" formtitle="Login" isRole={false} />
      </div>

    </div>
  )
}

export default Login