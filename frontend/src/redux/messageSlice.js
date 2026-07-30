import { createSlice } from "@reduxjs/toolkit";

const messageSlice=createSlice({
    name:"message",
    initialState:{
        messages:[],

    },
    reducers:{
        setMessages:(state,action)=>{
            state.messages=action.payload
        },
        addMessages:(state,action)=>{
            state.messages.push(action.payload)
        },
        
    }

})

// we will first export setUsrData i.e is basically the reducers 
// from the reducers

// and then we will export userSlice from it as userSlice.reducers

export const {setMessages,addMessages} = messageSlice.actions
export default messageSlice.reducer 