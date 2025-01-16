import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import cartIcon2 from '../../images/cart_icon2.png'
import profile_icon from '../../images/profile_icon.png'
import { fetchCartProducts } from '../../store/cartSlice';
import ProductHeader from './ProductHeader';
import { ColorRing } from 'react-loader-spinner';
const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated } = useSelector(state => state.auth);
  const productCount = useSelector(state => state.cart.productCount);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    navigate(`/search?keyword=${searchTerm}`);
  };

  const location = useLocation();
  useEffect(() => {
    if (location.pathname == '/')  //for removing the searched in the home page
      setSearchTerm('');
  }, [location.pathname])
  function handleClick() {
    navigate('/');
  }
  return (
    <>
      <header className="bg-blue-500 text-white p-4 flex justify-between items-center mb-5">
        <button onClick={handleClick}>

          <div className="text-xl font-bold">Classy <span className='text-yellow-200'>cart</span></div>
        </button>
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-2 py-1 rounded text-black"
            placeholder="Search..."

          />
          <button type="submit" className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600"></button>
        </form>
        <nav>

          <ul className="flex space-x-4">
            <li className="relative group">
              <div className=''>
                <img src={`${profile_icon}`} className='w-7 rounded-full' alt="" />
              </div>
              <ul className="hidden group-hover:block absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg py-2 w-40 text-gray-700">
                <li>
                  <Link
                    to="/profile"
                    className="block px-6 py-3 hover:bg-blue-200 rounded-t-lg transition-colors duration-200 ease-in-out"
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/order"
                    className="block px-6 py-3 hover:bg-blue-200 transition-colors duration-200 ease-in-out"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/logout"
                    className="block px-6 py-3 hover:bg-red-100 hover:text-red-600 rounded-b-lg transition-colors duration-200 ease-in-out"
                  >
                    Logout
                  </Link>
                </li>
              </ul>

            </li>
            <li><Link to="/" className="hover:underline">Home</Link></li>
            {isAuthenticated ?
              <li><Link to="/order" className="hover:underline">Orders</Link></li>
              :
              <li><Link to="/login" className="hover:underline">Login</Link></li>
            }
            <li><Link to='/cart'>
              <div className=' relative'>
                <img src={cartIcon2} alt="" className='w-9 h-8' />
                {
                  isAuthenticated ? <div className='absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs'>{productCount}</div>
                    :
                    <div className='absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs'>0</div>
                }
              </div>
            </Link></li>

          </ul>


        </nav>
      </header>
    </>
  );
};

export default Header;
