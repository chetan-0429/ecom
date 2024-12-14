
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { fetchCartProducts } from '../../store/cartSlice';
import {toast,ToastContainer} from 'react-toastify'
import {loadStripe} from '@stripe/stripe-js';
import api from '../../api';
const apiUrl = import.meta.env.VITE_BACKEND_URL;
const stripeKey = import.meta.env.VITE_STRIPE_KEY

function Payment() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cart);
  const { selectedAddress } = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(fetchCartProducts());
  }, [dispatch]);

  const makePayment = async () => {
    if (!selectedAddress) {
      console.error('No address selected!');
      return;
    }

    const stripe = await loadStripe(stripeKey);

    try {
      const body = {
        products,
        shippingAddress: selectedAddress,
      };

      const response = await api.post('/pay', body);
      const session = response.data;

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
    } catch (error) {
      console.error('Error during payment:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-yellow-50 h-16 shadow-lg">
  <div>
    <button
      className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-md transition-all duration-300"
      onClick={makePayment}
    >
      MAKE PAYMENT
    </button>
  </div>
</div>

  );
}

export default Payment;











// import React, { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
// import { useSelector,useDispatch } from 'react-redux';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { fetchCartProducts,removeProductFromCart,quantityDecrease,quantityIncrease } from '../../store/cartSlice';
// import {toast,ToastContainer} from 'react-toastify'
// import {loadStripe} from '@stripe/stripe-js';
// import api from '../../api';
// const apiUrl = import.meta.env.VITE_BACKEND_URL;
// const stripeKey = import.meta.env.VITE_STRIPE_KEY

// function Payment() {
//   const dispatch = useDispatch();
//   const {products,laoding,error,productCount} = useSelector(state => state.cart)
//   const {selectedAddress,shippingId} = useSelector(state=>state.address);

//   useEffect(()=>{
//     dispatch(fetchCartProducts());
//       },[dispatch]);

//       const makePayment = async ()=>{
//         if(!selectedAddress) return;
//         const stripe = await loadStripe(stripeKey);
//         console.log('products in cart is',products)
//     const body = {
//       products:products,
//       shippingAddress:selectedAddress,
//     }
//     console.log('fetch called and shipping ad',body.shippingAddress)
    
//     const headers = {"Content-type":"application/json"};
//     const response = await fetch(`${apiUrl}/pay`,{
//       method:'POST',
//       headers:headers,
//       body:JSON.stringify(body),
//       });
//       const session = await response.json();
//       console.log('session is ',session);
      
//     if (session.id) {
//       const result = await stripe.redirectToCheckout({
//         sessionId: session.id,
//       });

//       if (result.error) {
//         console.error('Stripe error:', result.error);
//       }
//     } else {
//       console.error('Session ID not found in the response');
//     }

//   }
//   return (
//     <>
//     <div className='flex items-center justify-center bg-yellow-50 h-13'>
//       <div>
//          <button className='bg-orange-500 p-2 text-white' onClick={makePayment}>MAKE PAYMENT</button>
//       </div>
//     </div>
    
//     </>
//   )
// }

// export default Payment