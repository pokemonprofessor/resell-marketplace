import { call, put, takeLatest } from "redux-saga/effects";
import {
  taxCodesStart,
  taxCodesSuccess,
  taxCodesFailure,
} from "redux/reducers/taxCodes";
import { getTaxCodes } from "redux/services/taxCodes";

function* taxCodesSagaWatcher() {
  yield takeLatest([taxCodesStart.type], taxCodesWorker);
}

function* taxCodesWorker(action: any): any {
  try {
    switch (action.type) {
      case taxCodesStart.type:
        {
          const response: any = yield call(getTaxCodes);
          yield put(taxCodesSuccess({ taxCodes: response.ResponseBody.taxCodesList }));
        }
        break;

      default:
        break;
    }
  } catch (err: any) {
    console.error(`Error occuring while calling an action ${action.type}`, err);

    if (action.type === taxCodesStart.type) {
      console.error(err?.response?.data?.msg);
      yield put(taxCodesFailure());
    }
  }
}

export default taxCodesSagaWatcher;
