
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

   const orderItems = useSelector((state) => state.cart.products);
  
    const totalAmount = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
<div className="flex items-center justify-center h-40 shadow-lg bg-white">
  <div>
    <div
      className="bg-white font-semibold py-3 px-8 rounded-md transition-all duration-300"
      onClick={makePayment}
    >
      Total Amount to be paid : <span className="text-indigo-600">₹{totalAmount.toFixed(2)}</span>
    </div>
    <button
        onClick={makePayment}
        className="mt-6 w-full py-2 px-4 bg-orange-500 text-white font-medium text-lg rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Proceed Payment
      </button>
  </div>
</div>
  );
}

export default Payment;


