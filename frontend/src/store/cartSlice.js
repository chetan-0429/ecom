import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching cart products
export const fetchCartProducts = createAsyncThunk(
    'cart/fetchCartProducts',
    async (_, thunkAPI) => {
        // console.log('int ht thunk')
        try {
            const response = await axios.get('/api/v1/cart/products'); // Replace with your actual API endpoint
            const {products,status} = response.data;
            if(!status){
                throw new Error('failed to fetch products');
            }
            const productIds = products.map((item)=> item.productId);

            
           // Fetch product details for all product IDs in one request
           const productsResponse = await axios.post('/api/v1/products/bulk', { ids: productIds }); // Adjust endpoint
           const productsGot = productsResponse.data;
        //    console.log('products got:',productsGot)
         
           // Combine cart items with product details
           const cartWithDetails = products.map(item => {
               const productDetail = productsGot.find(product => product._id === item.productId);
               return {
                   ...productDetail, 
                   quantity:item.quantity,
               };
           });
        //    console.log('cartwdi',cartWithDetails)
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
            // console.log('state products: ', state.products.length); 

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










// import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//     productCount:0,
//     products:[],
// };

// const cartSlice = createSlice({
//     name:'cart',
//     initialState,
//     reducers:{
//         setCart(state,action){
//             state.products = action.payload;
//             state.productCount = action.payload.length;
//         },
//         clearCart(state,action){
//             state.products = [];
//             state.productCount=0;
//         },
//         addProductToCart(state,action){
//             state.products.push(action.payload)
//             state.productCount = state.productCount + 1;
//         },
//         removeProductFromCart(state,action){
//             state.products = state.products.filter((pro)=> (action.payload != pro))
//             state.productCount = state.products.length;
//         },

        
//     }
// })

// export const {setCart,clearCart,addProductToCart,removeProductFromCart} = cartSlice.actions;
// export default cartSlice.reducer;