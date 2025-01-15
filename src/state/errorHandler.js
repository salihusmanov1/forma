import { isRejectedWithValue } from '@reduxjs/toolkit'
import { clearCredentials } from './slices/auth/authSlice'
import { openLoginModal } from './slices/auth/authModalSlice'

export const rtkQueryErrorLogger = (api) => (next) => (action) => {

  if (isRejectedWithValue(action)) {
    if (action.payload.data.status == 401) {
      api.dispatch(clearCredentials())
      api.dispatch(openLoginModal())
    }
  }
  return next(action)
}