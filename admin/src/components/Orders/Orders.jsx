// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { Navigate, useNavigate } from 'react-router-dom';
// import OrderDetails from './OrderDetails';

// function Orders() {
// const [list,setList] = useState([]);
// const [item,setItem] = useState();
//     async function fetchOrder(){
//         console.log('order called')
//         const response = await axios.get('api/v1/order/order_list');
//         setList(response.data.orders);
//         console.log('orderlist: ',response.data);
//     }
//     useEffect(()=>{
//         fetchOrder();
//     },[])
//     const navigate = useNavigate();
//     function handleClick(e,item){
//         e.preventDefault();
//         console.log('item is ',item);
//     //    navigate(`/order_details?orderId=${orderId}&itemId=${itemId}`);
//     }
//     async function handleStatus(e,orderId,itemId){
//         e.preventDefault();
//         console.log('select: ', e.target.value);
//         try{
//             const response = await axios.post('api/v1/order/update',{orderId,itemId,status:e.target.value});
//             console.log('order Updated: ',response.data)
//         }
//         catch(err){
//             console.log('error in updating ',err);
//         }
//     }
//   return (
//     <>
//     <div>
//         {

//             list.map((order)=>{
//                 return <div key={order._id}>
//                     {order.orderItems.map((item)=>{
//                         return <div key={item._id} className='flex justify-between' onClick={(e)=>{handleClick(e,item)}}>
//                             <h2>name: {item.name}</h2>
//                             <p>Quantity: {item.quantity}</p>
//                             <p>price: {item.price}</p>
//                             <select name="status" id="" onClick={(e)=>{handleStatus(e,order._id,item._id)}}>
//                                 <option value="processing">processing</option>
//                                 <option value="shipped">shipped</option>
//                                 <option value="delivered">delivered</option>
//                             </select>
//                         </div>
//                     })}
//                 </div>
//             })
//         }
//     </div>
//     </>
//   )
// }

// export default Orders


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Orders() {
  const [list, setList] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null); // To track which item's dropdown is open
  const navigate = useNavigate();

  // Fetch orders from backend
  async function fetchOrder() {
    console.log('lflas')
    const response = await axios.get('api/v1/order/order_list');
    setList(response.data.orders);
    console.log('cons',response.data)
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  // Handle click on an item
  function handleClick(e, item) {
    e.preventDefault();
    console.log('item is ', item);
  }

  // Handle status update
  async function handleStatusUpdate(orderId, itemId, newStatus) {
    try {
      const response = await axios.post('api/v1/order/update', {
        orderId,
        itemId,
        status: newStatus,
      });
      console.log('order Updated: ', response.data);

      // Update local list state to reflect the new status
      setList((prevList) =>
        prevList.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orderItems: order.orderItems.map((item) =>
                  item._id === itemId ? { ...item, status: newStatus } : item
                ),
              }
            : order
        )
      );

      setSelectedItemId(null); // Close the dropdown after selection
    } catch (err) {
      console.log('error in updating status', err);
    }
  }

  // Handle dropdown toggle
  function toggleDropdown(itemId) {
    setSelectedItemId((prevId) => (prevId === itemId ? null : itemId));
  }

  // Function to determine status color
  function getStatusColor(status) {
    switch (status) {
      case 'processing':
        return 'bg-yellow-500';
      case 'shipped':
        return 'bg-blue-500';
      case 'delivered':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  }

  return (
    <div className="p-6">
      {list.map((order) => (
        <div key={order._id} className="mb-8">
          {order.orderItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-gray-100 p-4 mb-4 rounded shadow-md"
            > 
             
              <div onClick={(e) => handleClick(e, item)} className="cursor-pointer">
                <h2 className="text-lg font-semibold">userName: {order.user.name}</h2>
                <h2 className="text-lg font-semibold">email: {order.user.email}</h2>
                <h2 className="text-lg font-semibold">Name: {item.name}</h2>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
              </div>

              {/* Custom Dropdown for status */}
              <div className="relative">
                {/* Current status (click to open dropdown) */}
                <div
                  className={`flex items-center justify-between px-4 py-2 rounded cursor-pointer text-white ${getStatusColor(
                    item.status
                  )}`}
                  onClick={() => toggleDropdown(item._id)}
                >
                  <span>{item.status}</span>
                  {/* Arrow icon to indicate dropdown */}
                  <svg
                    className={`w-4 h-4 ml-2 transform ${
                      selectedItemId === item._id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {/* Dropdown options (show when clicked) */}
                {selectedItemId === item._id && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
                    {['processing', 'shipped', 'delivered'].map((status) => (
                      <div
                        key={status}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${
                          status === item.status ? 'font-bold text-blue-500' : ''
                        }`}
                        onClick={() => {
                          handleStatusUpdate(order._id, item._id, status);
                        }}
                      >
                        {status}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Orders;
