import axios from 'axios';
import React, { useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {loginUser,logout} from '../../store/authSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link,useNavigate,Navigate} from 'react-router-dom'
import api from '../../api'
const apiUrl = import.meta.env.VITE_BACKEND_URL;

function Signup() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState(false)

    
    const { isAuthenticated } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    async function addUser(){
        try{
            console.log({email,password})
            const response = await api.post(`${apiUrl}/users/add`,{email,password});
            console.log('singupp::::::::',response.data)
            if(response.data.success){
              toast.success("user sucessfully created!", {
                position: "bottom-center",
                autoClose: 2000, 
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            dispatch(loginUser({ email, password }))
            .then(() => {
                toast.success('Login successful!');
            })
            .catch(() => {
                toast.error('Login failed. Please check your credentials.');
            });
          }
          setSuccess(true);
            setError(false);
        }catch(err){
            setError(true);
            setSuccess(false)
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        addUser();
    }

    if (isAuthenticated) {
      return <Navigate to="/" />;
  }
    return (
        <>
        <ToastContainer />
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
                <form className="space-y-6"  onSubmit={handleSubmit} >
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e)=>(setEmail(e.target.value))}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e)=>(setPassword(e.target.value))}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                       
                    >
                        Sign Up
                    </button>
                </form>
                {success && <h4>successfully created</h4> }
                {error && <h4>user already exist or error in creating</h4> }
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500 hover:text-blue-600">
                        Log In
                    </a>
                </p>
            </div>
        </div>
        </>
    );
}

export default Signup;

