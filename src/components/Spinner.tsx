import React from 'react'

const Spinner = ({title}: { title: string}) => {
  return (
     <div className="flex flex-col items-center justify-center py-6" role="status" aria-live="polite">
    <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
    <span className="mt-2 text-sm text-gray-600">{title}</span>
  </div>
  )
}

export default Spinner