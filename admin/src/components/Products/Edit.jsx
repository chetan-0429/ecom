// import React from 'react'
// import { useNavigate ,useLocation, useParams} from 'react-router-dom'

// // function Edit() {
// //    const params = useParams();
// //    console.log('params: ', params)
// //    const location = useLocation();
// //    const product = location.state.product;
// //    console.log(location.state)
// //    console.log(product)
// //    async function fetchProduct(){
// //     try{
// //         const res = await fetch('api/v1/products/update',{
// //             method:"POST",
// //             headers:{'content-type':'application/json'},
// //             body:JSON.stringify(product) })
// //             if(!res.ok){
// //                 console.log('error')
// //             }
// //             else{
// //                 const result = res.json();
// //                 console.log(result);
// //             }
// //         }catch(err){
// //             console.log('error in fetching',err);
// //         }
// //     }
   
// //   return (
// //     <>
// //     <div>{params.id}</div>
// //     <div>

// //     </div>
// //     </>
// //   )
// // }

// // export default Edit;

// import axios from 'axios'

// function Edit() {
//     // const params = useParams();
//     const location = useLocation();
//     // const product = location.state.product;
//     // console.log('product',product)
//     // console.log('product',product.name)

//     const api = `/api/v1/products/update`;
//     const [name,setName] = useState('');
//     // const [name,setName] = useState(product.name);
//     // const [description,setDescription] = useState(product.description);
//     const [description,setDescription] = useState('');
//     // const [price,setPrice] = useState(product.price);
//     const [price,setPrice] = useState(0);
//     const [imageUrl,setImageUrl] = useState('');
//     // const [imageUrl,setImageUrl] = useState(product.image);
//     // const [category,setCategory] = useState(product.category);
//     // const [company,setCompany] = useState(product.company);
//     const [category,setCategory] = useState('');
//     const [company,setCompany] = useState('');
//     const id = '12'
//    async function handleSubmit(e){
//     e.preventDefault();
//       try{
//         console.log('sumit called: ');
//         console.log('name:',name)
//         console.log('des:',description)
//         console.log('urlimages:',imageUrl)
//         const response = await axios.post(api,{
//             name:name,
//             description:description,
//             price:price,
//             imageUrl:imageUrl,
//             category:category,
//             company:company,
//             // id:id,
//             });
//             console.log('submitted',response.data);
//       }catch(err){
//         console.log(err);
//       }
//     }
//   return (
//     <>
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
//       <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
//         <h2 className="text-2xl font-bold mb-6">Update New Product</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex flex-col">
//             <label htmlFor="name" className="text-gray-700 font-medium mb-2">Product Name:</label>
//             <input
//               id="name"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="description" className="text-gray-700 font-medium mb-2">Product Description:</label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               rows="4"
              
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="price" className="text-gray-700 font-medium mb-2">Product Price:</label>
//             <input
//               id="price"
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="imageUrl" className="text-gray-700 font-medium mb-2">Image URL:</label>
//             <input
//               id="imageUrl"
//               type="text"
//               value={imageUrl}
//               onChange={(e) => setImageUrl(e.target.value)}
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="category" className="text-gray-700 font-medium mb-2">Category:</label>
//             <input
//               id="category"
//               type="text"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="company" className="text-gray-700 font-medium mb-2">Company:</label>
//             <input
//               id="company"
//               type="text"
//               value={company}
//               onChange={(e) => setCompany(e.target.value)}
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             Update Product
//           </button>
//         </form>
//       </div>
//     </div>
//     </>
//   )
// }

// export default Edit
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate ,useLocation, useParams} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Edit() {
    const api = `/api/v1/products/update`;
    const location = useLocation();
    const pro = location.state.product;
    console.log(pro)
    console.log(pro.des)
    const [name,setName] = useState(pro.name);
    const [description,setDescription] = useState(pro.description || '');
    const [price,setPrice] = useState(pro.price || 0);
    const [imageUrl,setImageUrl] = useState(pro.image || '');
    const [category,setCategory] = useState(pro.category || '');
    const [company,setCompany] = useState( pro.company || '');

    const showMessage = () => {
        console.log('message show')
        toast.success('Product Updated')
        // toast.success('product updated', {
        //   position: toast.POSITION.TOP_CENTER,
        //   autoClose: 3000, // The message will disappear after 3 seconds
        // });
      };
   async function handleSubmit(e){
    e.preventDefault();
      try{
        const response = await axios.post(api,{
            name:name,
            description:description,
            price:price,
            imageUrl:imageUrl,
            category:category,
            company:company,
            id:pro.id
            });
            console.log('res: ',response)
            console.log('submitted',response.data);
            showMessage();
      }catch(err){
        console.log(err);
      }
    }
  return (
    <>
    <ToastContainer />
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Update Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 font-medium mb-2">Product Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-gray-700 font-medium mb-2">Product Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="4"
              
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="price" className="text-gray-700 font-medium mb-2">Product Price:</label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="imageUrl" className="text-gray-700 font-medium mb-2">Image URL:</label>
            <input
              id="imageUrl"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="category" className="text-gray-700 font-medium mb-2">Category:</label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="company" className="text-gray-700 font-medium mb-2">Company:</label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
    {/* <form>
    product name:<input type="text" onChange={(e)=>setName(e.value)}/>
    product description <textarea  onChange={(e)=>setDescription(e.value)}></textarea>
    product price:<input type="number" onChange={(e)=>setPrice(e.value)}/>
    image url:<input type="text" onChange={(e)=>setImageUrl(e.value)}/>
    image url:<input type="text" onChange={(e)=>setCategory(e.value)}/>
    image url:<input type="text" onChange={(e)=>setCompany(e.value)}/>
    <button type="submit" onClick={handleSubmit}>Update product</button>
    </form> */}
    </>
  )
}

export default Edit