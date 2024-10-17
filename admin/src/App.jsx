import { useState } from 'react'
// import './App.css'
import axios from 'axios'
import Addproducts from './components/Products/Addproducts';
import Orders from './components/Orders/Orders';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import OrderDetails from './components/Orders/OrderDetails';
import Home from './components/Layout/Home';
import Layout from './components/Layout/Layout';
import Listproducts from './components/Products/Listproducts';
import Demo from './components/Products/Demo'
import Edit from './components/Products/Edit';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path="/add" element={<Addproducts/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/list" element={<Listproducts/>} />
        <Route path="/edit/:id" element={<Edit/>} />
        <Route path="/try" element={<Demo/>} />
        </Route>
        

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

