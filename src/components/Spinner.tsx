import React from 'react'

const Spinner = ({ title }: { title: string }) => {
  return (
    <div id="container-spinner" data-testid="container-spinner" className="flex flex-col items-center justify-center py-6" role="spinner" aria-live="polite">
      <div id="sub-spinner" data-testid="sub-spinner" className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
      <span id="title-spinner" data-testid="title-spinner" className="mt-2 text-sm text-gray-600">{title}</span>
    </div>
  )
}

export default Spinner