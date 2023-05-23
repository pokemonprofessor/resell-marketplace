import { createSlice } from '@reduxjs/toolkit';

interface State {
  isLoading: boolean;
  error: boolean;
  categories: any;
}

const initialState: State = {
  isLoading: true,
  error: false,
  categories: []
};

export const onboardingSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoriesStart: (state: State) => ({
      ...initialState,
      isLoading: true
    }),
    categoriesSuccess: (state: State, action) => ({
      ...state,
      isLoading: false,
      error: false,
      categories: action.payload.categories
    }),
    categoriesFailure: (state: State) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
  }
});

export const {
    categoriesFailure,
    categoriesStart,
    categoriesSuccess
} = onboardingSlice.actions;
export default onboardingSlice.reducer;
