import React  from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrder } from '../../store/orderSlice';
import {useLocation,useNavigate} from 'react-router-dom'
import { useEffect } from 'react';

function OrderSingle() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('order_id');
    const itemId = queryParams.get('item_id');
    const unitId = queryParams.get('unit_id');

    const { orderDetails } = useSelector((state) => state.order); //the orders got dispatched while loged in and in the app section
  
    const order = orderDetails.find((order) => order.id === orderId);
    const product = order?.orderItems.find((item) => item._id === itemId);

    const navigate = useNavigate();
    function handleClickReview(){
      // window.location.href = `/review/${orderId}/${itemId}`
      navigate(`/review/${unitId}/write-review`);
      }
    
   
    if (!order || !product) {
      return <p>Order or Product not found</p>;
    }

    if(order.length ==0 ){
      return <p>you havenot order any item yet</p>
    }
  
    return (
        <div className="container mx-auto p-6">
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Details</h2>
    
            {/* Product Details Row */}
            <div className="flex flex-col md:flex-row mb-6 ">

              <div className=" p-4 ">
                <img src={product.image} alt={product.name} className="w-44 h-64 object-cover rounded-md" />
              </div>

              <div className='flex items-center justify-between w-80'>
              <div className="md:w-2/3 p-4 flex flex-col justify-center">
                <h3 className="text-lg font-medium text-gray-700 mb-3">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">Price: ₹{product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-600 mb-2">Quantity: {product.quantity}</p>
                {product.status == 'processing' && <p className="text-sm text-blue-400 mb-2"> {product.status}</p>}
                {product.status == 'shipped' && <p className="text-sm text-yellow-700 mb-2"> {product.status}</p>}
                {product.status === 'delivered' && <p className="text-sm mb-2 text-green-500"> {product.status}</p>}
              </div>
              {
                product.status == 'delivered' ?      <div className=''>
                <button className='text-blue-400' onClick={((e)=>handleClickReview(e,product._id))}>Rate & Review</button>
                <button className='text-blue-400'>Return</button>
              </div>
               :
               <div>
                </div>
              }
         
              </div>
            </div>
    
            {/* Address Row */}
            <div className="flex flex-col md:flex-row">
              <div className="w-full p-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Shipping Address:</h3>
                  <p className="text-sm text-gray-600">{order.shippingAddress.address}</p>
                  <p className="text-sm text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country}</p>
                  <p className="text-sm text-gray-600">Pin Code: {order.shippingAddress.pinCode}</p>
                  <p className="text-sm text-gray-600">Phone Number: {order.shippingAddress.phoneNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
  
export default OrderSingle