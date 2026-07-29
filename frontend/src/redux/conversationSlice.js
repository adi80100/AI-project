import { createSlice } from "@reduxjs/toolkit";

const conversationSlice=createSlice({
    name:"conversation",
    initialState:{
        conversations:[],
        selectedConversation:null
    },
    reducers:{
        setConversations:(state,action)=>{
            state.conversations=action.payload
        },
        addConversation:(state,action)=>{
            state.conversations.unshift(action.payload)

        },
        setSelectedConversation:(state,action)=>{
            state.selectedConversation = action.payload

        }
    }

})

// we will first export setUsrData i.e is basically the reducers 
// from the reducers

// and then we will export userSlice from it as userSlice.reducers

export const {setConversations,addConversation,setSelectedConversation} = conversationSlice.actions
export default conversationSlice.reducer 