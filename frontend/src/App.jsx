import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartProducts } from './store/cartSlice';
import { fetchOrder } from './store/orderSlice';
import Layout from './components/Layout';
import Home from './components/Pages/Home';
import Search from './components/Pages/Search';
import SingleProduct from './components/Pages/SingleProduct';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Logout from './components/Auth/Logout';
import Cart from './components/Cart/Cart';
import Ordershow from './components/Order/Ordershow';
import OrderSingle from './components/Order/OrderSingle';
import Checkout from './components/Checkout/Checkout';
import Shipping from './components/Checkout/Shipping';
import Review from './components/Order/Review';
import Ordersuccess from './components/Pages/Ordersuccess';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import checkTokenExpiration from './checkTokenExpiry';
const apiUrl = import.meta.env.VITE_BACKEND_URL;
import api from './api';
import Profile from './components/Auth/Profile';
import Ordercancel from './components/Pages/Ordercancel';

function App() {
  const { isAuthenticated,user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCartProducts());
      dispatch(fetchOrder());
    }
  }, [isAuthenticated, dispatch]);
  
  useEffect(()=>{
    checkTokenExpiration();
  },[])

  function ProtectedRoute({ element }) {
    return isAuthenticated ? element : <Navigate to="/login" />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />

          {/* Protected Routes */}
          <Route
            path="/cart"
            element={isAuthenticated ? <Cart /> : <Navigate to="/login" />}
            />
            {/* <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} /> */}
            <Route path="/profile" element={ < ProtectedRoute element={< Profile/>} /> } />
          <Route path="/order" element={<ProtectedRoute element={<Ordershow />} />} />
          <Route path="/order_details" element={<ProtectedRoute element={<OrderSingle />} />} />
          <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />
          <Route path="/review/:productId/write-review" element={<ProtectedRoute element={<Review />} />} />
          <Route path="/checkout/shipping" element={<ProtectedRoute element={<Shipping />} />} />
          <Route path="/ordersuccess" element={<ProtectedRoute element={<Ordersuccess />} />} />
          <Route path="/ordercancel" element={<ProtectedRoute element={<Ordercancel />} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
