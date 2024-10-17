import React, { useState } from 'react'
import axios from 'axios'

function Addproducts() {
    const api = `/api/v1/products/add`;
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState(0);
    const [imageUrl,setImageUrl] = useState('');
    const [category,setCategory] = useState('');
    const [company,setCompany] = useState('');
   async function handleSubmit(e){
    e.preventDefault();
      try{
        console.log('sumit called: ');
        // const {name,description,price,imageUrl,category,company} = req.body;
        console.log('name:',name)
        console.log('des:',description)
        console.log('urliamages:',imageUrl)
        const response = await axios.post(api,{
            name:name,
            description:description,
            price:price,
            imageUrl:imageUrl,
            category:category,
            company:company
            });
            console.log('submitted',response.data);
      }catch(err){
        console.log(err);
      }
    }
  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
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
            Add Product
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
    <button type="submit" onClick={handleSubmit}>Add product</button>
    </form> */}
    </>
  )
}

export default Addproducts