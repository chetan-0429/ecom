import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddressForm from './AddressForm';
import { fetchAddress ,selectAddress} from '../../store/addressSlice';
import { useDispatch,useSelector } from 'react-redux';

function Shipping({setAddressId,addressId,changeCurrentSection,setAddressDone}){

const {savedAddress} = useSelector(state => state.address);

const dispatch = useDispatch();

useEffect(()=>{
  dispatch(fetchAddress())
},[dispatch])

const [newAddress,setNewAddress] = useState(false);
const [selected,setSelected] = useState(addressId);
const [isChecked,setIsChecked] = useState(false);

// console.log('address fetched: ',savedAddress);
function handleNewAddressClick(){
  setNewAddress(true);
  setIsChecked((prev)=> !prev);;
}

function handleClick(e,id){
  setAddressId(id);
  setNewAddress(false);
  setAddressDone(true);
  savedAddress.forEach((address)=> {if(id == address._id) dispatch(selectAddress(address))} );
}


  return (
    <>
      <div>
        <div>
          { savedAddress && savedAddress.map((address) =>(
            <div key={address._id}>
              {console.log('id: ',address._id)}
              <input type="radio" name='address' checked = {address._id === addressId} onChange={(e)=> handleClick(e,address._id)}/>
              <div className='bg-gray-300 mt-4'>
                    <div>{address._id}</div>
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
       <input type="checkbox" name='address' id='inputNew'onClick={handleNewAddressClick}/> 
          <div>
            { isChecked & newAddress ? <AddressForm setNewAddress = {setNewAddress}/> :null }
            </div>
            </div>
         </div>

    </>
  )
};

export default Shipping;
