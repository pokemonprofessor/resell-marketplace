import { createSlice } from "@reduxjs/toolkit";

interface State {
  isLoading: boolean;
  error: boolean;
  taxCodes: any;
}

const initialState: State = {
  isLoading: true,
  error: false,
  taxCodes: [],
};

export const taxCodesSlice = createSlice({
  name: "taxCodes",
  initialState,
  reducers: {
    taxCodesStart: (state: State) => ({
      ...initialState,
      isLoading: true,
    }),
    taxCodesSuccess: (state: State, action) => ({
      ...state,
      isLoading: false,
      error: false,
      taxCodes: action.payload.taxCodes,
    }),
    taxCodesFailure: (state: State) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
  },
});

export const { taxCodesFailure, taxCodesStart, taxCodesSuccess } =
  taxCodesSlice.actions;
export default taxCodesSlice.reducer;
