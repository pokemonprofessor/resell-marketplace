import { createSlice } from "@reduxjs/toolkit";
import { getAccessToken } from "utils/auth";

interface State {
  isLoading: boolean;
  error: boolean;
  seller: any;
  documents: [];
  accessToken?: string | null;
}

const initialState: State = {
  isLoading: true,
  error: false,
  seller: {},
  documents: [],
  accessToken: getAccessToken() || null,
};

export const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    sellerStart: (state: State, action) => ({
      ...initialState,
      isLoading: true,
    }),
    sellerSuccess: (state: State) => ({
      ...state,
      isLoading: false,
      error: false,
    }),
    sellerFailure: (state: State) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
    sellerSigninStart: (state: State, action) => ({
      ...initialState,
      isLoading: true,
    }),
    sellerSigninSuccess: (state: State, action) => ({
      ...state,
      seller: action.payload.seller,
      accessToken: action.payload.token,
      isLoading: false,
    }),
    sellerSigninFailure: (state: State, action) => ({
      ...state,
      error: true,
      msg: action.payload.msg,
      isLoading: false,
    }),
    setSellerPasswordStart: (state: State, action) => ({
      ...initialState,
      isLoading: true,
    }),
    setSellerPasswordSuccess: (state: State) => ({
      ...state,
      isLoading: false,
    }),
    setSellerPasswordFailure: (state: State, action) => ({
      ...state,
      isLoading: false,
      error: true,
      msg: action.payload.msg,
    }),
    uploadDocumentsStart: (state: State, action) => ({
      ...initialState,
      isLoading: true,
    }),
    uploadDocumentsSuccess: (state: State, action) => ({
      ...state,
      isLoading: false,
      documents: action.payload.documents,
    }),
    uploadDocumentsFailure: (state: State, action) => ({
      ...state,
      isLoading: false,
      error: true,
      msg: action.payload.msg,
    }),
    resendEmail: (state: State, action) => ({
      ...state,
      isLoading: true,
    }),
    resendEmailSuccess: (state: State) => ({
      ...state,
      isLoading: false,
    }),
    resendEmailFailure: (state: State, action) => ({
      ...state,
      isLoading: false,
      error: true,
      msg: action.payload.msg,
    }),
    sellerLogoutStart: (state: State, action) => ({
      ...initialState,
      isLoading: true,
    }),
    sellerLogoutSuccess: (state: State) => ({
      ...state,
      isLoading: false,
      accessToken: "",
      seller: {},
    }),
    sellerLogoutFailure: (state: State, action) => ({
      ...state,
      isLoading: false,
      error: true,
      msg: action.payload.msg,
    }),
    getSellerStart: (state: State) => ({
      ...initialState,
    }),
    getSellerSuccess: (state: State, action) => ({
      ...state,
      isLoading: false,
      error: false,
      seller: action.payload.seller,
      accessToken: action.payload.seller.token
    }),
  },
});

export const {
  sellerStart,
  sellerFailure,
  sellerSuccess,
  sellerSigninStart,
  sellerSigninSuccess,
  sellerSigninFailure,
  setSellerPasswordStart,
  setSellerPasswordSuccess,
  setSellerPasswordFailure,
  uploadDocumentsFailure,
  uploadDocumentsStart,
  uploadDocumentsSuccess,
  resendEmail,
  resendEmailSuccess,
  resendEmailFailure,
  sellerLogoutStart,
  sellerLogoutSuccess,
  sellerLogoutFailure,
  getSellerStart,
  getSellerSuccess
} = sellerSlice.actions;
export default sellerSlice.reducer;
