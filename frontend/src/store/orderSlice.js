import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching order products
export const fetchOrder = createAsyncThunk(
    'cart/fetchOrder',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/api/v1/order'); 
            const {orderDetails,success} = response.data;
            // console.log('called for fetch: ',orderDetails)
            if(!success){
                throw new Error('failed to fetch order');
            }
           
            return orderDetails;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    orderDetails: [],
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder(state, action) {
            state.orderDetails.push(action.payload)
        },
        getOrder(state,action){
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orderDetails = action.payload;
            })
            .addCase(fetchOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch order';
            });
    }
});

export const { setOrder} = orderSlice.actions;
export default orderSlice.reducer;


