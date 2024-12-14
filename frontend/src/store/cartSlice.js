import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = import.meta.env.VITE_BACKEND_URL;
import api from '../api'

export const fetchCartProducts = createAsyncThunk(
    'cart/fetchCartProducts',
    async (_, thunkAPI) => {
        try {
            const response = await api.get(`${apiUrl}/cart/products`); 
            const {products,status} = response.data;
            if(!status){
                throw new Error('failed to fetch products');
            }
            const productIds = products.map((item)=> item.productId);
            
           const productsResponse = await api.post(`${apiUrl}/products/bulk`, { ids: productIds }); 
           const productsGot = productsResponse.data;
         
           const cartWithDetails = products.map(item => {
               const productDetail = productsGot.find(product => product._id === item.productId);
               return {
                   ...productDetail, 
                   quantity:item.quantity,
               };
           });
            return cartWithDetails;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    productCount: 0,
    products: [],
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart(state, action) {
            // state.products = action.payload;
            // state.productCount = action.payload.length;
        },
        clearCart(state) {
            state.products = [];
            state.productCount = 0;
        },
        addProductToCart(state, action) {
            state.products.push(action.payload);
            state.productCount = state.productCount + 1;
           
        },
        removeProductFromCart(state, action) {
            state.products = state.products.filter((pro) => action.payload !== pro._id);
            state.productCount = state.products.length;
        },
        quantityIncrease(state, action) {
            console.log('state products: ', state.products.length); 
            state.products = state.products.map((pro) => {
                if (pro._id === action.payload) {
                    return { ...pro, quantity: pro.quantity + 1 }; 
                }
                return pro; 
            });
        },    
        quantityDecrease(state,action){
            state.products = state.products.map((pro) => {
                if (pro._id === action.payload) {
                    return { ...pro, quantity: pro.quantity - 1 }; 
                }
                return pro; 
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCartProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.productCount = action.payload.length;
            })
            .addCase(fetchCartProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch cart products';
            });
    }
});

export const { setCart, clearCart, addProductToCart, removeProductFromCart ,quantityIncrease,quantityDecrease} = cartSlice.actions;
export default cartSlice.reducer;
