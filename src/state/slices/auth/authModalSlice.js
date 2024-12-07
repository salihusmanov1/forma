import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isRegistrationModalOpen: false,
  isLoginModalOpen: false,
};

export const authModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openRegistrationModal: (state) => {
      state.isRegistrationModalOpen = true;
    },
    closeRegistrationModal: (state) => {
      state.isRegistrationModalOpen = false;
    },
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
    },
  },
});

export const {
  openRegistrationModal,
  closeRegistrationModal,
  openLoginModal,
  closeLoginModal,
} = authModalSlice.actions;

export default authModalSlice.reducer;