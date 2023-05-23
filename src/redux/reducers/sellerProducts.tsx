import { createSlice } from '@reduxjs/toolkit';

interface State {
  isLoading: boolean;
  error: boolean;
  sellerProducts: any;
}

const initialState: State = {
  isLoading: true,
  error: false,
  sellerProducts: []
};

export const sellerProductsSlice = createSlice({
  name: 'sellerProducts',
  initialState,
  reducers: {
    sellerProductsStart: (state: State, action) => ({
      ...initialState,
      isLoading: true
    }),
    sellerProductsSuccess: (state: State, action) => ({
      ...state,
      isLoading: false,
      sellerProducts: action.payload
    }),
    sellerProductsFailure: (state: State) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
  }
});

export const {
    sellerProductsStart,
    sellerProductsSuccess,
    sellerProductsFailure
} = sellerProductsSlice.actions;
export default sellerProductsSlice.reducer;
