import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { fetchCartProducts,removeProductFromCart,quantityDecrease,quantityIncrease } from '../../store/cartSlice';
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api'
const apiUrl = import.meta.env.VITE_BACKEND_URL;
function Cart() {

  const [totalPrice,setTotalPrice] = useState(0);
  const {products,laoding,error,productCount} = useSelector(state => state.cart)
  const [priceInString,setPriceInString] = useState("");

  const dispatch = useDispatch();
useEffect(()=>{
      let total = 0;
      products.forEach(product => {
        total += product.price * product.quantity
        });
        setTotalPrice(total);
    },[products])

    useEffect(()=>{
      let price = totalPrice.toString();
      let priceInString = price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        setPriceInString(priceInString);
    },[totalPrice])

    function toastFun(message){
      toast.success(message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

function removeFromCart(id){
  async function removeFromDb() {
    try{
      const response =  await api.get(`${apiUrl}/cart/remove/${id}`);
      dispatch(removeProductFromCart(id));

      toastFun('Product removed from cart');

      }catch(err){}
    }
    removeFromDb();
}

//quantity increasing
  function quantityInc(id,quantity){
    async function addInCart() {
      try{
          const res = await api.post(`${apiUrl}/cart/add`,{productId:id,quantity:1});
          dispatch(quantityIncrease(id));
          
        toastFun(`You've changed the QUANTITY to  '${quantity+1}'`);
 
      }catch(err){
          console.log('error in adding to cart');
      }
  }
    if(id) addInCart();
  }

  //quantity decreasing
  function quantityDec(id,quantity){
    async function dec() {
      try{
          const res = await api.get(`${apiUrl}/cart/quantitydec/${id}`);
          dispatch(quantityDecrease(id));
          toastFun(`You've changed the QUANTITY to  '${quantity-1}'`);

      }catch(err){
          console.log('error in decreasing to cart');
      }
    }
  if(quantity==1){
    removeFromCart(id);
  } else{
    dec();
  }
}

//handle order
const navigate = useNavigate();
function handleOrder(){
  navigate('/checkout')
}

  return (
    <>
      <div className="p-4 flex justify-between w-full">
  <div className="w-4/5">
    {products.length > 0 ? (
      products.map((product) => (
        <div key={product._id} className="bg-white shadow-lg rounded-lg p-4 mb-4 flex">
          <div className="flex-shrink-0 mr-8">
            <img 
              className="w-full h-64 object-cover rounded-lg md:w-20 md:h-auto" 
              src={product.imageUrl} 
              alt={product.name} 
            />
          <div className='flex mt-4'>
           <button className='w-6 bg-slate-100 rounded-full mr-1' onClick={()=> quantityDec(product._id,product.quantity)}>-</button>
           <p className='w-8 border rounded-sm'>{product.quantity}</p>
          <button className='w-6 bg-slate-100 rounded-full ml-1' onClick={()=>{quantityInc(product._id,product.quantity)}}>+</button>
          </div>
          </div>
          <div>
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-700 mb-2">{product.description}</p>
          <p className="text-lg font-bold mb-4">Price: ₹{product.price}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => removeFromCart(product._id)}
              className=" text-black px-1 py-1 rounded-lg hover:bg-red-600"
            >
             Remove
            </button>
          </div>
        </div>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500">No products in the cart.</p>
    )}
  </div>
  <div className="w-2/5 h-full bg-white shadow-lg rounded-lg p-4">
    <p className="text-lg  mb-4">PRICE DETAILS</p>
    <div className='flex justify-between' >
       <p className="">Price ({productCount} items) </p>
       <p className="">₹{priceInString}</p>
    </div>
    <div className='flex justify-between mt-3' >
       <p className="">Discount</p>
       <p className=" text-green-500">-₹0</p>
    </div>
    <div className='flex justify-between mt-3' >
       <p className="">Buy more & save more</p>
       <p className=" text-green-500">-₹0</p>
    </div>
    <div className='flex justify-between mt-3' >
       <p className="">coupons for you</p>
       <p className=" text-green-500">-₹0</p>
    </div>
    <div className='flex justify-between mt-3' >
       <p className="">Delivery Charges</p>
       <p className=" text-green-500">free</p>
    </div>
    <div className='flex justify-between mt-5' >
       <p className="text-xl font-bold ">Total Amount</p>
       <p className="text-xl font-bold">₹{priceInString}</p>
    </div>
    <div className='flex justify-between mt-5' >
    <p className=" text-green-500">You will save ₹0 on this order</p>
    </div>
  <div>
    <button className='bg-orange-400 text-white h-10 w-44' onClick={handleOrder}>place order</button>
  </div>
  </div>
  
</div>

<ToastContainer />
    </>


  )
}

export default Cart;
