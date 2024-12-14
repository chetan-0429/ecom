import axios from 'axios';
import React, { useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {loginUser,logout} from '../../store/authSlice'
import { useNavigate , Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCart ,fetchCartProducts} from '../../store/cartSlice';
import { fetchOrder } from '../../store/orderSlice';
const apiUrl = import.meta.env.VITE_BACKEND_URL;


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { isAuthenticated } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }))
            .then((response) => {
                if (response.payload && response.payload.token) {
                    toast.success('Login successful!');
                } else {
                    toast.error('Login failed. Please check your credentials.');
                }
            })
            .catch((error) => {
                toast.error(error.message || 'Login failed. Please check your credentials.');
            });
    };

    if(isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login Page</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Dont't have an account?{' '}
                    <a href="/signup" className="text-blue-500 hover:text-blue-600">
                        SignUp
                    </a>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
