import { configureStore } from '@reduxjs/toolkit';
import walletSlicer from './walleSlice/walletSlicer';

export const store = configureStore({
  reducer: {
    cards: walletSlicer,
  },
});
