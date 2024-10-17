import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";


export const fetchAddress = createAsyncThunk(
    'address/fetchAddress',
    async(_, thunkAPI) =>{
        // console.log('called feth')
        try{
        const response = await axios.get('/api/v1/shipping/address');
        const {shippingInfo,status,shippingId} = response.data;
        // console.log(shippingInfo)

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
            // console.log('add address called reducer')
            state.savedAddress.push(action.payload)
            },
        removeAddress(state,action){
            state.savedAddress = state.savedAddress.filter((address) => address.id !== action.payload.id)   
             },
        selectAddress(state,action){
            state.selectedAddress = action.payload
            // console.log('selected address : ',state.selectedAddress)
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
