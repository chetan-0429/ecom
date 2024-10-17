
import React from 'react';
import {logout} from '../../store/authSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../store/cartSlice';

import axios from 'axios';
function Logout() {
   const navigate = useNavigate();
const dispatch = useDispatch();
async function userLogout() {
    try{
     const response = await axios.get('/api/v1/users/logout');
     if(response.data.success){
         dispatch(logout());
         dispatch(clearCart());
         navigate('/login');
     }
     else{
        console.log('logout failed');
     }
    }catch(err){
        console.log('error in destroying');
    }
}
function handleSubmit(e){
    e.preventDefault();
    userLogout();

}


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Logout</h1>
                <p className="text-gray-600 mb-6">Are you sure you want to log out? Any unsaved changes will be lost.</p>
                <div className="flex justify-between">
                    <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={handleSubmit}>
                        Logout
                    </button>
                    <button className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Logout;