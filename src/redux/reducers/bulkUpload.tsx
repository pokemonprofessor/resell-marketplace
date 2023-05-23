import { createSlice } from '@reduxjs/toolkit';

interface State {
  isLoading: boolean;
  error: boolean;
  bulkUploadResponse: any;
}

const initialState: State = {
  isLoading: false,
  error: false,
  bulkUploadResponse: {}
};

export const bulkUploadSlice = createSlice({
  name: 'bulkUpload',
  initialState,
  reducers: {
    bulkUploadStart: (state: State, action) => ({
      ...initialState,
      isLoading: true
    }),
    startLoading: (state: State) => ({
      ...initialState,
      isLoading: true
    }),
    bulkUploadSuccess: (state: State, action) => ({
      ...state,
      isLoading: false,
      bulkUploadResponse: action.payload.bulkUploadResponse
    }),
    bulkUploadFailure: (state: State) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
  }
});

export const {
    bulkUploadFailure,
    bulkUploadStart,
    startLoading,
    bulkUploadSuccess
} = bulkUploadSlice.actions;
export default bulkUploadSlice.reducer;
