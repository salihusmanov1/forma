import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import { authApiSlice } from "./slices/auth/authApiSlice";
import { templatesApi } from "./slices/templates/templatesApiSlice";
import { formsApi } from "./slices/forms/formApiSlice";
import { topicsApi } from "./slices/topics/topicsApiSlice";
import authModalReducer from "./slices/auth/authModalSlice";
import { responseApi } from "./slices/forms/responseApiSlice";
import { tagsApi } from "./slices/tags/tagsApiSlice";
import { sfApi } from "./slices/salesforce/sfApiSlice";
import { rtkQueryErrorLogger } from "./errorHandler";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [templatesApi.reducerPath]: templatesApi.reducer,
    [formsApi.reducerPath]: formsApi.reducer,
    [responseApi.reducerPath]: responseApi.reducer,
    [topicsApi.reducerPath]: topicsApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    [sfApi.reducerPath]: sfApi.reducer,
    authModal: authModalReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authApiSlice.middleware)
    .concat(templatesApi.middleware)
    .concat(formsApi.middleware)
    .concat(responseApi.middleware)
    .concat(topicsApi.middleware)
    .concat(tagsApi.middleware)
    .concat(sfApi.middleware)
    .concat(rtkQueryErrorLogger),
  devTools: true
})

export default store