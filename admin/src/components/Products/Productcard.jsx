
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hello from './Hello';
import axios from 'axios'

function ProductCard({ name = "unknown", image = "url", price = 0, stock = 0, id = null ,description ,company,category,onRemove}) {
  const [currentStock, setCurrentStock] = useState(stock); // Handle stock

  const navigate = useNavigate();
  function onEdit() {
    const product = {name,image,price,stock,id,company,category,description}
    navigate(`/edit/${id}`,{state:{product:product}})
  }

  function incrementStock() {
    setCurrentStock((prevStock) => prevStock + 1);
  }

  function decrementStock() {
    if (currentStock > 0) {
      setCurrentStock((prevStock) => prevStock - 1);
    }
  }

  return (
    <div className="grid grid-cols-5 gap-4 bg-white shadow-md rounded-lg mb-4 items-center">

      <img src={image} className="h-14 w-14 object-contain rounded-md" alt={name} />
      
      <div className="font-semibold text-gray-800">{name}</div>

      <div className="text-gray-600">₹{price.toFixed(2)}</div>
      <div className="text-gray-600 flex items-center space-x-2">
        <button className='w-6 border' onClick={incrementStock}>+</button> 
        {currentStock} 
        <button className='w-6 border' onClick={decrementStock} disabled={currentStock === 0}>-</button>
      </div>

      <div className="flex">
        <button
          onClick={onEdit}
          className="py-1 px-3 rounded-md hover:bg-blue-300 transition duration-300">
          <img src="https://cdn-icons-png.flaticon.com/128/1828/1828918.png" className='w-5' alt="Edit" />
        </button>
        <button
          onClick={()=>{onRemove(id)}}
          className="text-white py-1 px-3 rounded-md hover:bg-red-400 transition duration-300"
        >
          <img src="https://cdn-icons-png.flaticon.com/128/4387/4387288.png" className='w-5' alt="Remove" />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
