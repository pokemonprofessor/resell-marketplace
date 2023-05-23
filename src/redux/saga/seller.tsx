import { call, put, takeLatest } from "redux-saga/effects";
import snack from "components/wrapper/snack";
import {
  sellerStart,
  sellerSuccess,
  sellerFailure,
  sellerSigninStart,
  sellerSigninSuccess,
  sellerSigninFailure,
  setSellerPasswordStart,
  setSellerPasswordSuccess,
  setSellerPasswordFailure,
  uploadDocumentsStart,
  uploadDocumentsSuccess,
  uploadDocumentsFailure,
  resendEmail,
  resendEmailSuccess,
  resendEmailFailure,
  sellerLogoutStart,
  sellerLogoutSuccess,
  sellerLogoutFailure,
  getSellerStart,
  getSellerSuccess,
} from "redux/reducers/seller";
import {
  onBoardSeller,
  signinSeller,
  uploadDocs,
  setSellerPassword,
  resendSetPasswordEmail,
} from "redux/services/seller";
import {
  clearAccessToken,
  clearRefreshToken,
  getAccessToken,
  getUser,
  setAccessToken,
  setRefreshToken,
} from "utils/auth";

function* sellerOnboardingSagaWatcher() {
  yield takeLatest(
    [
      sellerStart.type,
      sellerSigninStart.type,
      setSellerPasswordStart.type,
      uploadDocumentsStart.type,
      resendEmail.type,
      getSellerStart.type,
      sellerLogoutStart.type
    ],
    sellerOnboardingWorker
  );
}

function* sellerOnboardingWorker(action: any): any {
  try {
    switch (action.type) {
      case sellerStart.type:
        {
          const response: any = yield call(onBoardSeller, action.payload);
          yield put(sellerSuccess());
        }
        break;
      case sellerSigninStart.type:
        {
          const {sellerData, navigate} = action.payload;
          const response: any = yield call(signinSeller, sellerData);
          setAccessToken(response.ResponseBody.token);
          setRefreshToken(response.ResponseBody.refreshToken);
          let seller: any = getUser(getAccessToken());
          yield put(
            sellerSigninSuccess({ seller, token: response.ResponseBody.token })
          );
          snack.success("Seller Logged in successfully");
          navigate ('/seller-dashboard');
        }
        break;
      case getSellerStart.type:
        {
          if (getAccessToken()) {
            const accessToken = getAccessToken();
            let seller: any = getUser(accessToken);
            seller.token = accessToken;
            yield put(getSellerSuccess({ seller }));
          }
        }
        break;
      case setSellerPasswordStart.type:
        {
          const { navigate, sellerData } = action.payload;
          const response: any = yield call(
            setSellerPassword,
            action.payload.sellerData
          );
          yield put(setSellerPasswordSuccess());
          console.log(response);
          navigate("/seller/add-banking-details", { state: sellerData });
          snack.success("Password set successfully");
        }
        break;
      case uploadDocumentsStart.type:
        {
          const response: any = yield call(uploadDocs, action.payload);
          yield put(
            uploadDocumentsSuccess({ documents: response.ResponseBody })
          );
          snack.success("Document uploaded successfully");
        }
        break;
      case resendEmail.type:
        {
          const response: any = yield call(
            resendSetPasswordEmail,
            action.payload
          );
          yield put(resendEmailSuccess());
          snack.success(response);
        }
        break;
      case sellerLogoutStart.type:
        {
          const {navigate} = action.payload;
          clearAccessToken();
          clearRefreshToken();
          yield put(sellerLogoutSuccess());
          snack.success("Logged out successfully");
          navigate('/');
        }
        break;
      default:
        break;
    }
  } catch (err: any) {
    console.error(`Error occuring while calling an action ${action.type}`, err);

    if (action.type === sellerStart.type) {
      snack.error(err?.response?.data?.msg);
      yield put(sellerFailure());
    }

    if (action.type === sellerSigninStart.type) {
      snack.error(err?.response?.data?.message);
      yield put(sellerSigninFailure({ msg: err?.response?.data?.message }));
    }

    if (action.type === setSellerPasswordStart.type) {
      snack.error(err?.response?.data?.msg);
      yield put(setSellerPasswordFailure({ msg: err?.response?.data?.msg }));
    }
    if (action.type === resendEmail.type) {
      snack.error(err?.response?.data?.msg);
      yield put(resendEmailFailure({ msg: err?.response?.data?.msg }));
    }
    if (action.type === uploadDocumentsStart.type) {
      snack.error(err?.response?.data?.msg);
      yield put(uploadDocumentsFailure({ msg: err?.response?.data?.msg }));
    }
    if (action.type === sellerLogoutStart.type) {
      snack.error(err?.response?.data?.msg);
      yield put(sellerLogoutFailure({ msg: err?.response?.data?.msg }));
    }
  }
}

export default sellerOnboardingSagaWatcher;
