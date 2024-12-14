import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { useSelector,useDispatch } from 'react-redux';
import { clearCart } from '../../store/cartSlice';
const apiUrl = import.meta.env.VITE_BACKEND_URL;

function Ordersuccess() {
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function clearCartFun(){
    try{
     const response = api.get(`${apiUrl}/cart/clear`);
      dispatch(clearCart());
    }catch(err){
      console.log('error in clearing cart',err);
    }
  }
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sessionId = queryParams.get('session_id');
    if (sessionId) {
      api.get(`${apiUrl}/verify-session`, {
        params: { session_id: sessionId },
      })
        .then((response) => {
          const { session } = response.data;
          if (session) {
            setSession(session);
            clearCartFun();
            console.log('Payment Session Details: ', session);
          }
        })
        .catch((err) => {
          setError('Error verifying payment session');
          console.error('Error in Ordersuccess:', err);
        });
    } else {
      setError('Session ID not found');
    }
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back to Home
        </button>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-gray-500 text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-green-600">Order Success</h1>
        <p className="mt-4 text-lg">Thank you for your purchase!</p>

        <div className="mt-6 text-left">
          <p className="text-gray-700 font-medium">Payment Status: 
            <span className={`ml-2 ${session.payment_status === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
              {session.payment_status === 'paid' ? 'Paid' : 'Not Paid'}
            </span>
          </p>
          <p className="mt-2 text-gray-700 font-medium">Amount Paid: 
            <span className="text-black">₹{(session.amount_total / 100).toFixed(2)}</span>
          </p>
          <p className="mt-2 text-gray-700 font-medium">Customer Email: 
            <span className="text-black">{session.customer_email}</span>
          </p>
        </div>

        <button
          onClick={() => navigate('/order')}
          className="mt-8 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to My Orders
        </button>
      </div>
    </div>
  );
}

export default Ordersuccess;
