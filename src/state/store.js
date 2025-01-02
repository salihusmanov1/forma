import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import { authApiSlice } from "./slices/auth/authApiSlice";
import { templatesApi } from "./slices/templates/templatesApiSlice";
import { formsApi } from "./slices/forms/formApiSlice";
import { topicsApi } from "./slices/topics/topicsApiSlice";
import authModalReducer from "./slices/auth/authModalSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [templatesApi.reducerPath]: templatesApi.reducer,
    [formsApi.reducerPath]: formsApi.reducer,
    [topicsApi.reducerPath]: topicsApi.reducer,
    authModal: authModalReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authApiSlice.middleware)
    .concat(templatesApi.middleware)
    .concat(formsApi.middleware)
    .concat(topicsApi.middleware),
  devTools: true
})

export default store