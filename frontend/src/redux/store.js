import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice.js"
import conversationsReducer from "./conversationSlice.js"
export const store = configureStore({
  reducer: {
    user:userReducer,
    conversation:conversationsReducer
  },
})
console.log(store.getState());
console.log(conversationsReducer);