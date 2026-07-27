import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null
    },
    reducers:{
        setUserData :(state,action)=>{
            state.userData = action.payload
        }
    }

})

// we will first export setUsrData i.e is basically the reducers 
// from the reducers

// and then we will export userSlice from it as userSlice.reducers

export const {setUserData} = userSlice.actions
export default userSlice.reducer 