import { createSlice } from '@reduxjs/toolkit';

interface State {
  isLoading: boolean;
  error: boolean;
}

const initialState: State = {
  isLoading: false,
  error: false,
};

export const onboardingSlice = createSlice({
  name: 'bankOnboarding',
  initialState,
  reducers: {
    stripeOnboardingStart: (state: State, action) => ({
      ...initialState,
      isLoading: true
    }),
    stripeOnboardingSuccess: (state: State) => ({
      ...state,
      isLoading: false,
      error: false,
    }),
    stripeOnboardingFailure: (state: State) => ({
      ...state,
      error: true,
      isLoading: false,
    }),

  }
});

export const {
  stripeOnboardingFailure,
  stripeOnboardingStart,
  stripeOnboardingSuccess
} = onboardingSlice.actions;
export default onboardingSlice.reducer;
