import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import axios from 'axios'
function Try() {
 
  const [data,setData] = useState([]);
  const [products,setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/data')
      .then(response => {
        // console.log('res: ',response)
        // console.log('res: data: ',response.data)
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      axios.get('/api/v1/products/products')
      .then(res=>{
        console.log(res.data)
        setProducts(res.data);
      })
      .catch(err=>{
        console.log(err)
      })
  }, []);

  return (
    <>
     <h1>hello</h1>
     <h1>data is</h1>
     {
      data.map(d=>(
        <div key={d.id}>{d.name}</div>
      ))
     }
     <h1>products</h1>
     {
      products.map((p)=>(
        <li key={p._id}>
          <p>name: {p.name}</p>
          <p>description: {p.description}</p>
          <p>price: {p.price}</p>
            
          </li>
      ))
     }
    </>
  )
}

export default Try
