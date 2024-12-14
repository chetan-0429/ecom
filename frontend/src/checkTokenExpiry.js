import {jwtDecode} from 'jwt-decode';
import store from './store/store';
import { logout } from './store/authSlice';

const checkTokenExpiration = () => {
  try {
    const token = store.getState().auth.token; 

    if (!token) {
      return; 
    }

    const decoded = jwtDecode(token); 

    const currentTime = Date.now() / 1000; 
    if (decoded.exp < currentTime) {
      console.warn("Token has expired");
      store.dispatch(logout()); 
    } else {
    }
  } catch (error) {
    console.error("Error checking token expiration:", error);
  }
};

export default checkTokenExpiration;
