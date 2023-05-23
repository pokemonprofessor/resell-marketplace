import { createSlice } from '@reduxjs/toolkit';

interface State {
    isLoading: boolean;
    error: boolean;
    orders: any;
    orderCount: number;
}

const initialState: State = {
    isLoading: true,
    error: false,
    orders: [],
    orderCount: 0,
};

export const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState,
    reducers: {
        ordersStart: (state: State, action) => ({
            ...initialState,
            isLoading: true
        }),
        ordersSuccess: (state: State, action) => ({
            ...state,
            isLoading: false,
            error: false,
            orders: action.payload.orders,
            orderCount: action.payload.orderCount
        }),
        ordersFailure: (state: State) => ({
            ...state,
            error: true,
            isLoading: false,
        }),
    }
});

export const {
    ordersFailure,
    ordersStart,
    ordersSuccess
} = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
