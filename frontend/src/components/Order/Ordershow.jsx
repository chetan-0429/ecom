import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrder } from '../../store/orderSlice';
import OrderSingle from './OrderSingle'
import {useNavigate} from 'react-router-dom'

function Ordershow() {
  const { orderDetails } = useSelector((state) => state.order);

  const navigate = useNavigate();
  function handleClick(e,orderId,itemId,productId){
    // e.preventDefault();
    navigate(`/order_details?order_id=${orderId}&item_id=${itemId}&unit_id=${productId}`);
  }

  return (
    <div className="container mx-auto p-6">
      
{orderDetails.length === 0 && (
  <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg shadow-md text-center text-gray-600">
    <div>
      <h2 className="text-xl font-semibold">No Orders Placed</h2>
      <p className="mt-2">It seems you haven't placed any orders yet. Start shopping now!</p>
    </div>
  </div>
)}
      {orderDetails.map((order) => (
        <div key={order.id} className="bg-white shadow-md rounded-lg  mb-2">
          <div className="order-items mb-4 ">
            {order.orderItems.map((product) => (
              <div key={`${order.id}-${product._id}`} className="product-item border-b border-gray-200 pb-4 mb-4 last:mb-0 last:border-b-0 w-4/5 "  onClick={(e)=>{handleClick(e,order.id,product._id,product.productId)}}>
                <div className='flex justify-evenly '>
                   <img src={product.image} className='h-28' alt="" />
                <h4 className="text-md font-semibold text-gray-800">{product.name}</h4>
                <p className="text-sm text-gray-600">Price: ₹{product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                {product.status == 'processing' && <p className="text-sm text-blue-300 mb-2"> {product.status}</p>}
                {product.status == 'shipped' && <p className="text-sm text-yellow-700 mb-2"> {product.status}</p>}
                {product.status === 'delivered' && <p className="text-sm mb-2 text-green-500"> {product.status}</p>}
  
                </div>
              </div>
            ))}
            {/* <h3 className="text-lg font-medium text-gray-700 mb-3">{order.orderStatus}</h3> */}
          </div>
          <div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Ordershow;
