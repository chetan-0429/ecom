import React from 'react'
import { Link } from 'react-router-dom'

function LeftPanel() {
  return (
    <div className="bg-grey-100 h-full p-4">
      <div className="mb-4">
        <Link
          to="/add"
          className="block border border-gray-300 rounded-lg shadow-md text-lg font-semibold text-gray-700 hover:text-blue-600 p-4 hover:bg-blue-100 transition duration-300"
        >
          Add
        </Link>
      </div>
      <div className="mb-4">
        <Link
          to="/orders"
          className="block border border-gray-300 rounded-lg shadow-md text-lg font-semibold text-gray-700 hover:text-blue-600 p-4 hover:bg-blue-100 transition duration-300"
        >
          Orders
        </Link>
      </div>
      <div className="mb-4">
        <Link
          to="/list"
          className="block border border-gray-300 rounded-lg shadow-md text-lg font-semibold text-gray-700 hover:text-blue-600 p-4 hover:bg-blue-100 transition duration-300"
        >
          List Items
        </Link>
      </div>
    </div>
  )
}

export default LeftPanel
