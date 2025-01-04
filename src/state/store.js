import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import { authApiSlice } from "./slices/auth/authApiSlice";
import { templatesApi } from "./slices/templates/templatesApiSlice";
import { formsApi } from "./slices/forms/formApiSlice";
import { topicsApi } from "./slices/topics/topicsApiSlice";
import authModalReducer from "./slices/auth/authModalSlice";
import { responseApi } from "./slices/forms/responseApiSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [templatesApi.reducerPath]: templatesApi.reducer,
    [formsApi.reducerPath]: formsApi.reducer,
    [responseApi.reducerPath]: responseApi.reducer,
    [topicsApi.reducerPath]: topicsApi.reducer,
    authModal: authModalReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authApiSlice.middleware)
    .concat(templatesApi.middleware)
    .concat(formsApi.middleware)
    .concat(responseApi.middleware)
    .concat(topicsApi.middleware),
  devTools: true
})

export default store