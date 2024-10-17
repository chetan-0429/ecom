import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import cartReducer from './cartSlice'
import addressReducer from './addressSlice'
import orderReducer from './orderSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        address:addressReducer,
        order:orderReducer,
    }
})

export default store