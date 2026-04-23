import React from 'react'
import { useAppSelector } from '../store/store'

const DashboardPage = () => {
  const { user, role } = useAppSelector((state) => state.auth)

  console.log({ user, role })
  const lorem = `
  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est exercitationem illo architecto blanditiis culpa quod neque assumenda sapiente nemo, tempora, incidunt et saepe aperiam accusantium rerum! Reprehenderit eaque aperiam sapiente!
  
  `
  return (
    <div>
      <p className='text-gray-500 text-2xl p-2'>Dashboard</p>

      <div className='text-start px-4 flex flex-col gap-5'>
        <p className='bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700'>Email: {user!!.email}</p>
        <p className='bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 sm:mt-10'>Role: {role}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 px-4 mt-5">
        <div className="w-full max-w-md bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 md:col-span-2 col-span-1 hover:border-blue-600">{lorem}</div>
        <div className="w-full max-w-md bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 md:col-span-2 col-span-1 hover:border-blue-600">{lorem}</div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-5 px-4 mt-5">
        <div className="w-full max-w-md bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 md:col-span-2 col-span-1 hover:border-blue-600">{lorem}</div>
        <div className="w-full max-w-md bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 md:col-span-2 col-span-1 hover:border-blue-600">{lorem}</div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-5 px-4 mt-5">
        <div className="w-full max-w-md bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 md:col-span-2 col-span-1 hover:border-blue-600">{lorem}</div>
        <div className="w-full max-w-md bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 md:col-span-2 col-span-1 hover:border-blue-600">{lorem}</div>
      </div>



    </div>
  )
}

export default DashboardPage