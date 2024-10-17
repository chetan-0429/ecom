// import React, { useEffect } from 'react'
// import axios from 'axios'
// import { useSelector,useDispatch } from 'react-redux'
// import { useState } from 'react'

// function Cart() {
//     const [productsId,setProductsId] = useState([]);
//     const [products,setProducts] = useState([]);

//     useEffect(()=>{
//         async function getCartItems() {
//             try{
//                 const response = await axios.get('/api/v1/cart/cart');
//                 console.log("res data;", response.data)
//                 if(response.data.status){ console.log('data :; ',response.data.products)
//                     const productsId = response.data.products.map((pro)=> pro.productId);
//                    console.log('productsId::',productsId);
//                      setProductsId(productsId); 
//                 }
//             }catch(err){
//                 console.log('error in fetching cart items');
//             }
//         }
//         getCartItems()
//     },[])

//     const fetchProduct = async (id)=>{
//         try{
//            const response = await axios.get(`/api/v1/products/product/${id}`);
//            console.log(response.data)
//            setProducts((prev)=>([...prev,response.data]));
//         }catch(err){
//             console.log('error in fetching products');
//         }
//     } 
//     useEffect(()=>{
//         console.log('second userefe',productsId.length)
//         productsId.forEach((id)=>{
//             console.log('calling for id',id)
//             fetchProduct(id);
//         })
//         console.log('fetchedd',products)
//     },[productsId])
   

//   return (
//     <>
// <h1>cart</h1>
// {products.length}
//     </>
//   )
// }

// export default Cart






import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';

function Cart() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart items and their details
  const fetchCartItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/v1/cart/cart');
      if (response.data.status) {
        const productIds = response.data.products.map((pro) => pro.productId);
        const productsData = await Promise.all(
          productIds.map((id) => axios.get(`/api/v1/products/product/${id}`))
        );
        setProducts(productsData.map((res) => res.data));
      }
    } catch (err) {
      setError('Error fetching cart items.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  // Add item to cart
  const addToCart = async (productId) => {
    try {
      await axios.post('/api/v1/cart/add', { productId });
      setProducts((prev) => [...prev, { _id: productId, name: 'New Product' }]); // Replace with actual product details
    } catch (err) {
      setError('Error adding to cart.');
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      await axios.post('/api/v1/cart/remove', { productId });
      setProducts((prev) => prev.filter((product) => product._id !== productId));
    } catch (err) {
      setError('Error removing from cart.');
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="bg-white shadow-lg rounded-lg p-4 mb-4">
              <div className="flex-shrink-0">
                    <img 
                        className="w-full h-64 object-cover rounded-lg md:w-80 md:h-auto" 
                        src={product.imageUrl} 
                        alt={product.name} 
                    />
                </div>
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-lg font-bold mb-4">Price: ${product.price}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => addToCart(product._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Add to Cart
              </button>
              <button
                onClick={() => removeFromCart(product._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Remove from Cart
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No products in the cart.</p>
      )}
    </div>
  );
}

export default Cart;











// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Cart() {
//   const [productIds, setProductIds] = useState([]);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     async function getCartItems() {
//       try {
//         const response = await axios.get('/api/v1/cart/cart');
//         if (response.data.status) {
//           const productIds = response.data.products.map((pro) => pro.productId);
//           setProductIds(productIds);
//         }
//       } catch (err) {
//         console.log('Error fetching cart items:', err);
//       }
//     }
//     getCartItems();
//   }, []);

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const productsData = await Promise.all(
//           productIds.map(async (id) => {
//             const response = await axios.get(`/api/v1/products/product/${id}`);
//             return response.data;
//           })
//         );
//         setProducts(productsData);
//       } catch (err) {
//         console.log('Error fetching products:', err);
//       }
//     }
//     if (productIds.length > 0) {
//       fetchProducts();
//     }
//   }, [productIds]);

//   return (
//     <div>
//       {products.length > 0 ? (
//         products.map((product) => (
//           <div key={product._id}>
//             <h3>{product.name}</h3>
//             <p>{product.description}</p>
//             <p>Price: ${product.price}</p>
//           </div>
//         ))
//       ) : (
//         <p>No products in the cart.</p>
//       )}
//     </div>
//   );
// }

// export default Cart;
