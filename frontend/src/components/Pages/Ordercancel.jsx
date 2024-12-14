import React from 'react'

function Ordercancel() {
  return (
   <div>
        <div className="flex flex-col items-center justify-center h-screen p-6 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-red-600">Order Failed</h1>
        <p className="mt-4 text-lg">Please Try Again</p>
        </div>
        </div>
   </div>
  )
}

export default Ordercancel