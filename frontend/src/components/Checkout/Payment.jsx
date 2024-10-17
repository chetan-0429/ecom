import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { fetchCartProducts,removeProductFromCart,quantityDecrease,quantityIncrease } from '../../store/cartSlice';
import {toast,ToastContainer} from 'react-toastify'
import {loadStripe} from '@stripe/stripe-js';

function Payment() {
  const dispatch = useDispatch();
  const {products,laoding,error,productCount} = useSelector(state => state.cart)
  const {selectedAddress,shippingId} = useSelector(state=>state.address);

  console.log('selecredAd: ',selectedAddress)
  console.log('shippingId: ',shippingId)
  useEffect(()=>{
    dispatch(fetchCartProducts());
      },[dispatch]);

      const makePayment = async ()=>{
        if(!selectedAddress) return;
        const stripe = await loadStripe('pk_test_51PnLv805xbiBbr1lEkkaWn8nQiWafjzKEYJDAVFVPrblTOKYLfYI3UZdXdXJhss9KRd5PM4y0veeFjc0W4OdtYPa00lwRR9Fcx');
        console.log('products in cart is',products)
    const body = {
      products:products,
      shippingAddress:selectedAddress,
    }
    const headers = {"Content-type":"application/json"};
    console.log('fetch called and shipping ad',body.shippingAddress)
    const response = await fetch('api/v1/pay',{
      method:'POST',
      headers:headers,
      body:JSON.stringify(body),
      });
      const session = await response.json();
      console.log('session is ',session);
      
    if (session.id) {
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error('Stripe error:', result.error);
      }
    } else {
      console.error('Session ID not found in the response');
    }

  }
  return (
    <>
    <div className='flex items-center justify-center bg-yellow-50 h-13'>
      <div>
         <button className='bg-orange-500 p-2 text-white' onClick={makePayment}>MAKE PAYMENT</button>
      </div>
    </div>
    
    </>
  )
}

export default Payment