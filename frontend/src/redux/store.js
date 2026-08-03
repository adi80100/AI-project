import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice.js"
import conversationsReducer from "./conversationSlice.js"
import messageReducer from "./messageSlice.js"

export const store = configureStore({
  reducer: {
    user:userReducer,
    conversation:conversationsReducer,
    message:messageReducer
  },
  // enable Redux DevTools in non-production (Vite exposes import.meta.env.MODE)
  devTools: import.meta.env ? import.meta.env.MODE !== 'production' : true,
})
// console.log(store.getState());
// console.log(conversationsReducer);
// console.log(messageReducer)