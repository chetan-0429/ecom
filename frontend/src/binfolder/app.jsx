import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import axios from 'axios'
import Header from './components/Layout/Header'
import Layout from './components/Layout'
import Home from './components/Pages/Home'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import Search from './components/Pages/Search'
import SingleProduct from './components/Pages/SingleProduct'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import Logout from './components/Auth/Logout'
import { login, logout } from './store/authSlice'
import { setCart,clearCart } from './store/cartSlice'
import Cart from './components/Cart/Cart'
import Shipping from './components/Checkout/Shipping'
import Checkout from './components/Checkout/Checkout'
import Ordershow from './components/Order/Ordershow'
import { fetchCartProducts } from './store/cartSlice'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSingle from './components/Order/OrderSingle'
import Review from './components/Order/Review'
const stripePromise = loadStripe('pk_test_51PnLv805xbiBbr1lEkkaWn8nQiWafjzKEYJDAVFVPrblTOKYLfYI3UZdXdXJhss9KRd5PM4y0veeFjc0W4OdtYPa00lwRR9Fcx');


function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    // console.log('session checking:')
    async function checkSession() {
      try{
      const response =  await axios.get('/api/v1/users/session');
      if(response.data.loggedIn){
        dispatch(login(response.data.user));}
      else { dispatch(logout()) }
      }catch(err){
        console.log('err in checking session');
      }
    }
    checkSession()
  },[dispatch])


  useEffect(()=>{
    dispatch(fetchCartProducts());
      },[dispatch]);
  

  // useEffect(()=>{

  //   async function cartItems(){
  //     try{
  //       const response = await axios.get('/api/v1/cart/products');
  //       if(response.data.status){
  //         console.log('success: fullyu',response.data.products);
  //         dispatch(setCart(response.data.products))
  //       }
  //       else{
  //         dispatch(clearCart());
  //       }
  //     }catch(err){
  //       console.error('Error fetching cart items:', err);
  //     }
  //   }
  //   cartItems();
  // },[dispatch]);
 

  return (
    <>
    
     <BrowserRouter>
     <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/product/:id' element={<SingleProduct/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<Ordershow/>} />
        <Route path='/order_details' element={<OrderSingle/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/review/:productId/write-review' element={<Review/>} />
        {/* <Route path='/checkout' element={
              <Elements stripe={stripePromise}>
                  <Checkout />
              </Elements>} /> */}
        <Route path='/checkout/shipping' element={<Shipping/>} />
        </Route>
     </Routes>
     </BrowserRouter>

    </>
  )
}

export default App

