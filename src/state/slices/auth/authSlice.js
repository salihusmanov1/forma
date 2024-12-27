import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    clearCredentials: (state) => {
      state.user = null
      localStorage.removeItem('user')
    }
  }
})

export default authSlice.reducer
export const { setCredentials, clearCredentials } = authSlice.actions 