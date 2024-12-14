import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddressForm from './AddressForm';
import { fetchAddress, selectAddress } from '../../store/addressSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Shipping({ setAddressId, addressId, changeCurrentSection,addressDone, setAddressDone }) {
  const { savedAddress } = useSelector((state) => state.address);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAddress());
  }, [dispatch]);

  const [newAddress, setNewAddress] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  function handleNewAddressClick() {
    setNewAddress(true);
    setIsChecked((prev) => !prev);
  }

  function handleClick(e, id) {
    setAddressId(id);
    setNewAddress(false);
    setAddressDone(true);
    savedAddress.forEach((address) => {
      if (id === address._id) dispatch(selectAddress(address));
    });
  }

  return (
    <>
      <ToastContainer />
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Select Shipping Address</h2>
        <div className="space-y-4">
          {savedAddress &&
            savedAddress.map((address) => (
              <div
                key={address._id}
                className={`p-4 border rounded-lg ${
                  address._id === addressId ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'
                }`}
              >
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="address"
                    checked={address._id === addressId}
                    onChange={(e) => handleClick(e, address._id)}
                    className="mr-3"
                  />
                  <div>
                    <div className="text-gray-800 font-medium">{address.address}</div>
                    <div className="text-gray-600">
                      <span>{address.city}, </span>
                      <span>{address.state}, </span>
                      <span>{address.country} </span>
                      <span>({address.pinCode})</span>
                    </div>
                    <div className="text-gray-600">Phone: {address.phoneNo}</div>
                  </div>
                </label>
              </div>
            ))}
        </div>

        <div className="mt-6">
          <label htmlFor="inputNew" className="flex items-center text-gray-700 font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={isChecked}
              id="inputNew"
              onChange={handleNewAddressClick}
              className="mr-3"
            />
            Add a new address
          </label>
          {isChecked && newAddress && (
            <div className="mt-4">
              <AddressForm setNewAddress={setNewAddress} setIsChecked={setIsChecked} setAddressId={setAddressId} setAddressDone={setAddressDone} />
            </div>
          )}
        </div>
        <button
        onClick={()=> changeCurrentSection('payment')}
        className={`mt-6 w-full py-2 px-4 bg-indigo-600 text-white font-medium text-lg rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
           ${!addressDone ? 'cursor-not-allowed opacity-50' : 'hover:cursor-pointer'} `}
       >
        Proceed
      </button>
      </div>
    </>
  );
}

export default Shipping;
