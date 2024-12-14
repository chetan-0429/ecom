import Shipping from './Shipping'
import OrderSummary from './OrderSummary'
import Payment from './Payment'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import React, { useState } from 'react';
import tick from '../../images/tick.png'
import { useDispatch,useSelector } from 'react-redux'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import api from '../../api'
const apiUrl = import.meta.env.VITE_BACKEND_URL;


const CheckoutPage = () => {
  const [currentSection, setCurrentSection] = useState('orderSummary');
  const [addressId,setAddressId] = useState(null);
  const [paymentDetails,setIsPaymetDetails] = useState([]);
  const [addressDone,setAddressDone] = useState(false);
  const [orderSummaryDone,setOrderSummaryDone] = useState(false);
  const [paymentDone,setPaymentDone] = useState(false);
  const [isOrderSuccess,setIsOrderSuccess] = useState(false)

  const {products} = useSelector(state => state.cart);
  const {selectedAddress} = useSelector(state=>state.address)

  const handleSectionChange = (section) => {
    setOrderSummaryDone(true);
    setCurrentSection(section);
  };
function handleSubmit(e){
  e.preventDefault();
  async function postOrder(){

    let itemsPrice = 0;
    const orderItems = products.map((pro)=> {
      itemsPrice += pro.price * pro.quantity;
      return {name:pro.name,price:pro.price,quantity:pro.quantity,image:pro.imageUrl,productId:pro._id}
    })
    
    try{
     const response = await api.post(`${apiUrl}/order/add`,{addressId:selectedAddress._id,itemsPrice,orderItems});
      setIsOrderSuccess(true)
    }catch(err){
      console.log('errr in order')
    }
  }
  if(selectedAddress){
  postOrder();}
  else console.log('plz select address')
}
if(isOrderSuccess){
  return <>
  <h1>Order Success</h1>
  <p>Thank you for your order</p>
  <p>keep shopping</p>
  </>
}
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <div className="flex justify-between px-4 py-2 bg-gray-50">

          <button
              onClick={() => handleSectionChange('orderSummary')}
              className={`py-2 px-4 ${currentSection === 'orderSummary' ? 'bg-indigo-600 text-white' : 'text-gray-600'}` } >
              Order Summary
              {orderSummaryDone ? <img src={tick} className='h-5'/>: null}
            </button>


            <button
              onClick={() => handleSectionChange('address')}
              className={`py-2 px-4 rounded-t-lg ${currentSection === 'address' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}
            >
              Address
            {addressDone ? <img src={tick} className='h-5'/>: null}
            </button>
            
            <button
              onClick={() => handleSectionChange('payment')}
              className={`py-2 px-4 rounded-tr-lg ${currentSection === 'payment' ? 'bg-indigo-600 text-white' : 'text-gray-600'}  ${!addressDone ? 'cursor-not-allowed opacity-50' : 'hover:cursor-pointer'}` }
            >
              Payment
            </button>
          </div>
        </div>
    
        {currentSection === 'orderSummary' && <OrderSummary changeCurrentSection={setCurrentSection} setOrderSummaryDone={setOrderSummaryDone}/>}
        {currentSection === 'address' && <Shipping setAddressId = {setAddressId} addressId={addressId} changeCurrentSection={setCurrentSection} addressDone={addressDone} setAddressDone={setAddressDone}/>}
        {currentSection === 'payment' && <Payment/>}
        

      </div>
    </div>
  );
};

export default CheckoutPage;
