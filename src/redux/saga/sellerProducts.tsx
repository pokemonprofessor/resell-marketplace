import { call, put, takeLatest } from "redux-saga/effects";
import {
    sellerProductsStart,
    sellerProductsSuccess,
    sellerProductsFailure
} from 'redux/reducers/sellerProducts';
import { getprouducts } from "redux/services/sellerProducts";

function* sellerProductsSagaWatcher() {
  yield takeLatest(
    [sellerProductsStart.type],
    sellerProductsWorker,
  );
}

function* sellerProductsWorker(action: any): any {
  try {
    switch (action.type) {
      case sellerProductsStart.type: {
        const response: any = yield call(getprouducts, action.payload);
        yield put(sellerProductsSuccess({sellerProductsResponse : response.ResponseBody}));
      }
        break;

      default:
        break;
    }
  } catch (err: any) {
    console.error(`Error occuring while calling an action ${action.type}`, err);

    if (action.type === sellerProductsStart.type) {
      console.error(err?.response?.data?.msg);
      yield put(sellerProductsFailure());
    }
  }
}

export default sellerProductsSagaWatcher;
