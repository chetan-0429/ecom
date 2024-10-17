// // import React from 'react';

// // function ProductCard({ name='unknown', image='url', price=0, quantity=0, id, onRemove, onEdit }) {
// //   return (
// //     <div className="w-full">

// //       <div className="bg-white shadow-md rounded-lg mb-4 ">
// //         <div className="product-item border-b border-gray-200 mb-4 w-full">
// //           <div className="flex justify-between items-center w-full">
// //             <img src={image} className="h-16 w-16 object-contain rounded-md" alt={name} />
// //               <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
// //               <p className="text-sm text-gray-600">Price: ₹{price.toFixed(2)}</p>
// //               <p className="text-sm text-gray-600">Quantity: {quantity}</p>
// //             <div className="flex space-x-2">
// //               <button
// //                 onClick={() => onEdit(id)}
// //                 className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
// //               >
// //                 Edit
// //               </button>
// //               <button
// //                 onClick={() => onRemove(id)}
// //                 className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
// //               >
// //                 Remove
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// // export default ProductCard;


// import React from 'react';
// import { useState } from 'react';

// function ProductCard({ name = "unknown", image = "url", price = 0, stock = 0, id = null }) {
//   // console.log('isEditable : ',isEditable)
//   const [isEditable, setIsEditable] = useState(false);


//   function onRemove(id) {

//   }
//   function onEdit(id) {
//     // e.preventDefault();
//     console.log('isEditable', isEditable)
//     setIsEditable(!isEditable);
//   }

//   const [updateName, setUpdatedName] = useState('');
//   function handleChange(e){
//     console.log(e.target.value);
//     setUpdatedName(e.target.value);
//   }

//   function Editable() {

//     return (
//       <><img src={image} className="h-14 w-14 object-contain rounded-md" alt={name} />
//         <div className="font-semibold bg-yellow-50 text-gray-800 border">
//     <input
//       type="text"
//       value={updateName} // This binds the input to the state
//       className="text-black"
//       placeholder="Enter your name" // Placeholder can be a static hint when the input is empty
//       onChange={handleChange}
//     />
//   </div>
//         {/* <div className="font-semibold bg-yellow-50 text-gray-800 border"><input type="text" value={updateName} className='text-black' placeholder={updateName} onChange={handleChange} /></div> */}
//         <div className="text-gray-600">₹{price.toFixed(2)}</div>
//         <div className="text-gray-600"><button className='w-6 border'>+</button> {stock} <button className='w-6 border'>-</button></div> </>

//     )
//   }
//   return (
//     <div className="grid grid-cols-5 gap-4 bg-white shadow-md rounded-lg mb-4 items-center">

//       {isEditable ? <Editable /> : <><img src={image} className="h-14 w-14 object-contain rounded-md" alt={name} />
//         <div className="font-semibold text-gray-800">{name}</div>
//         <div className="text-gray-600">₹{price.toFixed(2)}</div>
//         <div className="text-gray-600"><button className='w-6 border'>+</button> {stock} <button className='w-6 border'>-</button></div> </>
//       }

//       <div className="flex">
//         <button
//           onClick={onEdit}
//           className="py-1 px-3 rounded-md hover:bg-blue-300 transition duration-300"
//         >
//           {isEditable ?
//             <img src="https://as2.ftcdn.net/v2/jpg/09/16/60/79/1000_F_916607927_J6p85wk3tRMXS3CnlFy5sWzUFaT5w2lx.jpg" className='w-5' alt="" /> :
//             <img src="https://cdn-icons-png.flaticon.com/128/1828/1828918.png" className='w-5' alt="" />
//           }
//         </button>
//         <button
//           onClick={() => onRemove(id)}
//           className=" text-white py-1 px-3 rounded-md hover:bg-red-400 transition duration-300"
//         >
//           <img src="https://cdn-icons-png.flaticon.com/128/4387/4387288.png" className='w-5' alt="" />

//         </button>
//       </div>
//     </div>
//   );
// }

// export default ProductCard;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hello from './Hello';

function ProductCard({ name = "unknown", image = "url", price = 0, stock = 0, id = null }) {
  const [isEditable, setIsEditable] = useState(false);
  const [updateName, setUpdatedName] = useState(name); // Initialize with the product's name
  const [currentStock, setCurrentStock] = useState(stock); // Handle stock

  function onRemove(id) {
    console.log(`Remove product with ID: ${id}`);
  }
  const navigate = useNavigate();
  function onEdit() {
    setIsEditable(!isEditable);
    navigate(`/edit/${id}`)
    // return <Edit/>
   
  }

  function handleChange(e) {
    setUpdatedName(e.target.value);
  }

  // Handle stock increment and decrement
  function incrementStock() {
    setCurrentStock((prevStock) => prevStock + 1);
  }

  function decrementStock() {
    if (currentStock > 0) {
      setCurrentStock((prevStock) => prevStock - 1);
    }
  }

  return (
    <div className="grid grid-cols-5 gap-4 bg-white shadow-md rounded-lg mb-4 items-center">

      <img src={image} className="h-14 w-14 object-contain rounded-md" alt={name} />
      
      {/* Toggle between editable name input and static text */}
      {isEditable ? (
        <input
          type="text"
          value={updateName}
          className="font-semibold bg-yellow-50 text-gray-800 border"
          placeholder="Enter your name"
          onChange={handleChange}
        />
      ) : (
        <div className="font-semibold text-gray-800">{name}</div>
      )}

      <div className="text-gray-600">₹{price.toFixed(2)}</div>
      <div className="text-gray-600 flex items-center space-x-2">
        <button className='w-6 border' onClick={incrementStock}>+</button> 
        {currentStock} 
        <button className='w-6 border' onClick={decrementStock} disabled={currentStock === 0}>-</button>
      </div>

      <div className="flex">
        <button
          onClick={onEdit}
          className="py-1 px-3 rounded-md hover:bg-blue-300 transition duration-300"
        >
          {isEditable ? (
            <img src="https://as2.ftcdn.net/v2/jpg/09/16/60/79/1000_F_916607927_J6p85wk3tRMXS3CnlFy5sWzUFaT5w2lx.jpg" className='w-5' alt="Save" />
          ) : (
            <img src="https://cdn-icons-png.flaticon.com/128/1828/1828918.png" className='w-5' alt="Edit" />
          )}
        </button>
        <button
          onClick={() => onRemove(id)}
          className="text-white py-1 px-3 rounded-md hover:bg-red-400 transition duration-300"
        >
          <img src="https://cdn-icons-png.flaticon.com/128/4387/4387288.png" className='w-5' alt="Remove" />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
