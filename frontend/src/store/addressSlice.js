import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
import api from '../api'
const apiUrl = import.meta.env.VITE_BACKEND_URL;


export const fetchAddress = createAsyncThunk(
    'address/fetchAddress',
    async(_, thunkAPI) =>{
        try{
        const response = await api.get(`${apiUrl}/shipping/address`);
        if(response.data.success==false){
            return {shippingInfo:[],shippingId:null};
        }
        const {shippingInfo,status,shippingId} = response.data;

        return {shippingInfo,shippingId};

        }catch(err){
            console.log('returning error')
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

const initialState = {
    savedAddress: [],
    loading: false,
    error: null,
    selectedAddress:null,
    shippingId:null
};


export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers:{
        addAddress(state,action){
            state.savedAddress.push(action.payload)
            },
        removeAddress(state,action){
            state.savedAddress = state.savedAddress.filter((address) => address.id !== action.payload.id)   
             },
        selectAddress(state,action){
            state.selectedAddress = action.payload
            }
        
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchAddress.pending, (state)=>{
                // console.log('pending')
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAddress.fulfilled, (state,action)=>{
                // console.log('fulfiled')
                state.savedAddress = action.payload.shippingInfo;
                state.shippingId = action.payload.shippingId;
                state.loading = false;
                state.error = null;
                })
            .addCase(fetchAddress.rejected, (state,action)=>{
                // console.log('reject')
                state.loading = false;
                state.error = action.payload || "failed to fetch address from db";
                })
    }

})

export const {addAddress,removeAddress,selectAddress} = addressSlice.actions;
export default addressSlice.reducer;
