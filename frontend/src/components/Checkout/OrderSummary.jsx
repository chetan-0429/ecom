import React from 'react';
import { useSelector } from 'react-redux';

function OrderSummary({ changeCurrentSection, setOrderSummaryDone }) {
  const orderItems = useSelector((state) => state.cart.products);

  const totalAmount = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  function handleClick(e) {
    e.preventDefault();
    setOrderSummaryDone(true);
    changeCurrentSection('address');
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-600">Order Summary</h2>
      <div className="space-y-4">
        {orderItems.map((pro) => (
          <div key={pro._id} className="flex items-center justify-between border-b pb-4">
            <img
              src={pro.imageUrl}
              alt={pro.name}
              className="h-24 w-24 object-contain rounded-md"
            />
            <div className="ml-4 flex-1">
              <p className="text-lg font-medium text-gray-800">{pro.name}</p>
              <p className="text-gray-600">
                Quantity: <span className="font-semibold">{pro.quantity}</span>
              </p>
              <p className="text-gray-600">
                Price: <span className="font-semibold">₹{pro.price.toFixed(2)}</span>
              </p>
            </div>
            <div className="text-gray-700 font-medium">
              ₹{(pro.price * pro.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-4">
        <p className="text-xl font-semibold text-gray-700">
          Total: <span className="text-indigo-600">₹{totalAmount.toFixed(2)}</span>
        </p>
      </div>
      <button
        onClick={handleClick}
        className="mt-6 w-full py-2 px-4 bg-indigo-600 text-white font-medium text-lg rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Proceed
      </button>
    </div>
  );
}

export default OrderSummary;
