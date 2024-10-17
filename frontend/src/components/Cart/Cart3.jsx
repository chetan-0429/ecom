import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';

function Cart() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const productsId = useSelector((state)=> state.cart.products)

const fetchProduct = async (id)=>{
  try{
    const response = await axios.get(`/api/v1/products/product/${id}`);
    console.log('cart::',response.data)
    setProducts((prev)=> ([...prev,response.data]))
  }catch(err){
    console.log('error in fetching in cart from db');
  }
}

useEffect(()=>{
  console.log('in the cart')
  productsId.forEach((id)=> (fetchProduct(id)));
},[productsId])


function removeFromCart(){

}
  
  

  return (
    <div className="max-w-4xl mx-auto p-4">
      {products.length}
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
