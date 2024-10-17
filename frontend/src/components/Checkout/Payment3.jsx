// import React from 'react'

// function Payment() {
//   return (
//     <>
//     <div className="p-6">
//             <h2 className="text-xl font-semibold mb-4">Payment</h2>
//             <form>
//               <div className="mb-4">
//                 <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
//                 <input
//                   type="text"
//                   id="cardNumber"
//                   name="cardNumber"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
//                 <input
//                   type="text"
//                   id="expiryDate"
//                   name="expiryDate"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
//                 <input
//                   type="text"
//                   id="cvv"
//                   name="cvv"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </form>
//           </div>
        
//     </>
//   )
// }

// export default Payment

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setPaymentProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error('[error]', error);
      setPaymentProcessing(false);
    } else {
      // Send paymentMethod.id to your backend
      try {
        console.log('hello go pay')
        const response = await axios.post('/api/v1/pay', {
          amount: 5000, // Amount in cents (e.g., $50.00)
          paymentMethodId: paymentMethod.id,
        });

        console.log('[Payment Intent]', response.data);
        if (response.data.success) {
          alert('Payment Successful!');
        }
      } catch (error) {
        console.error('Payment failed:', error);
      }
      setPaymentProcessing(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Card Details</label>
          <CardElement
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#32325d',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#fa755a',
                  iconColor: '#fa755a',
                },
              },
            }}
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm"
          disabled={!stripe || paymentProcessing}
        >
          {paymentProcessing ? 'Processing...' : 'Pay'}
        </button>
      </form>
    </div>
  );
}

export default Payment;
