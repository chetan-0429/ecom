import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import axios from 'axios'
import Header from './components/Layout/Header'
import Layout from './components/Layout'
import Home from './components/Pages/Home'
import { BrowserRouter,Navigate,Route, Routes } from 'react-router-dom'
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
import { fetchOrder } from './store/orderSlice'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSingle from './components/Order/OrderSingle'
import Review from './components/Order/Review'
import Ordersuccess from './components/Pages/Ordersuccess'
const stripePromise = loadStripe('pk_test_51PnLv805xbiBbr1lEkkaWn8nQiWafjzKEYJDAVFVPrblTOKYLfYI3UZdXdXJhss9KRd5PM4y0veeFjc0W4OdtYPa00lwRR9Fcx');


function App() {

  const isAuthenticated = useSelector(state => state.auth.status);
  const dispatch = useDispatch();
  useEffect(()=>{
    // console.log('check fo session')
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
    // console.log('called fetchPrducts')
      },[dispatch]);
    
    useEffect(() => {
      dispatch(fetchOrder());
      // console.log('called fetchOrders')
    }, [dispatch]);
  
  
function ProtectedRoute(props){
  if(isAuthenticated){
    return props.element;
  }
  else{
    return <Navigate to="/login" />
  }
}


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
        {/* <Route path='/cart' element={<Cart/>} /> */}
        <Route path='/cart' element={<ProtectedRoute element={<Cart/>} />} />
        <Route path='/order' element={<ProtectedRoute element={<Ordershow/>} />} />
        <Route path='/order_details' element={<ProtectedRoute element={<OrderSingle/>} />} />
        <Route path='/checkout' element={<ProtectedRoute element={<Checkout/>} />} />
        <Route path='/review/:productId/write-review' element={<Review/>} />
        <Route path='/checkout/shipping' element={<Shipping/>} />
        <Route path='/ordersuccess' element={<ProtectedRoute element= {<Ordersuccess/>}/>} />
        </Route>
     </Routes>
     </BrowserRouter>

    </>
  )
}

export default App

