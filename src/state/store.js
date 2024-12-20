import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import { authApiSlice } from "./slices/auth/authApiSlice";
import { templatesApi } from "./slices/templates/templatesApiSlice";
import authModalReducer from "./slices/auth/authModalSlice";



const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [templatesApi.reducerPath]: templatesApi.reducer,
    authModal: authModalReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authApiSlice.middleware)
    .concat(templatesApi.middleware),
  devTools: true
})

export default store