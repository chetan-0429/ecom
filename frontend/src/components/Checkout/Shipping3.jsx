import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddressForm from './AddressForm';
 function Shipping({setAddressId,addressId,changeCurrentSection,setAddressDone}){

const [savedAddress,setSavedAddress] = useState([]);
const [newAddress,setNewAddress] = useState(false);
const [selected,setSelected] = useState(addressId);
async function fetchAddress() {
  try{
    const response = await axios.get('/api/v1/shipping/address');
    console.log('saved address: ',response.data);
    if(response.data.success){    
    setSavedAddress(response.data.shippingInfo);
    if(!addressId) {
      setAddressId(response.data.shippingInfo[0]._id);
    }
  }

  }catch(err){
    console.log('error in getting address');
  }
}

useEffect(()=>{
  fetchAddress();
},[])

function handleClick(e,id){
  // e.preventDefault();
  setAddressId(id);
  setNewAddress(false);
  setAddressDone(true);
}


  return (
    <>
      <div>
        <div>
          { savedAddress && savedAddress.map((address) =>(
            <div key={address._id}>
              <input type="radio" name='address' checked = {address._id === addressId} onChange={(e)=> handleClick(e,address._id)}/>
              <div className='bg-gray-300 mt-4'>
                    <div>{address.address}</div>
                    <div> 
                      <span>{address.city}</span>,
                      <span>{address.state}</span>,
                      <span>{address.country}</span>,
                      <span>{address.pinCode}</span>,
                      <span>{address.phoneNo}</span>
                      </div>
               </div>
               </div>
          ))}
        </div>
        <div className='mt-4'>
        <label htmlFor="inputNew">Add a new address </label>
       <input type="radio" name='address' id='inputNew'onClick={()=> setNewAddress(true)}/> 
          <div>
            { newAddress ? <AddressForm/> :null }
            </div>
            </div>
         </div>

    </>
  )
};

export default Shipping;
