import React from 'react';

function ProductCard({ name='unknown', image='url', price=0, quantity=0, id, onRemove, onEdit }) {
  return (
    <div className="w-full">
        
      <div className="bg-white shadow-md rounded-lg mb-4 ">
        
        <div className="product-item border-b border-gray-200 pb-4 mb-4 w-full">
          <div className="flex justify-between items-center w-full">
            <img src={image} className="h-16 w-16 object-cover rounded-md" alt={name} />


            {/* <div className="flex-1 ml-4"> */}
            <div className="flex ml-4">
              <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
              <p className="text-sm text-gray-600">Price: ₹{price.toFixed(2)}</p>
              <p className="text-sm text-gray-600">Quantity: {quantity}</p>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(id)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => onRemove(id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default ProductCard;
