import { createSlice } from '@reduxjs/toolkit';

interface State {
  isLoading: boolean;
  error: boolean;
  bulkUploadResponse: any;
}

const initialState: State = {
  isLoading: true,
  error: false,
  bulkUploadResponse: {}
};

export const updateProductQtySlice = createSlice({
  name: 'bulkUpload',
  initialState,
  reducers: {
    updateProductQtyStart: (state: State, action) => ({
      ...initialState,
      isLoading: true
    }),
    updateProductQtySuccess: (state: State, action) => ({
      ...state,
      isLoading: false,
      bulkUploadResponse: action.payload.bulkUploadResponse
    }),
    updateProductQtyFailure: (state: State) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
  }
});

export const {
    updateProductQtyFailure,
    updateProductQtyStart,
    updateProductQtySuccess
} = updateProductQtySlice.actions;
export default updateProductQtySlice.reducer;
