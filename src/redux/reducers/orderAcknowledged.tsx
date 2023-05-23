import { createSlice } from '@reduxjs/toolkit';

interface State {
    isLoading: boolean;
    error: boolean;
    success:boolean,
}

const initialState: State = {
    isLoading: true,
    error: false,
    success:false
};

export const acknowledgedSlice = createSlice({
    name: 'orderDetails',
    initialState,
    reducers: {
        acknowledgeStart: (state: State, action) => ({
            ...initialState,
            isLoading: true,
            success:false
        }),
        acknowledgeSuccess: (state: State, action) => ({
            ...state,
            isLoading: false,
            error: false,
            success:true

        }),
        acknowledgeFailure: (state: State) => ({
            ...state,
            error: true,
            isLoading: false,
            success:false
        }),
    }
});

export const {
    acknowledgeFailure,
    acknowledgeStart,
    acknowledgeSuccess
} = acknowledgedSlice.actions;
export default acknowledgedSlice.reducer;
