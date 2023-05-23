import { call, put, takeLatest } from "redux-saga/effects";
import {
  bulkUploadStart,
  bulkUploadSuccess,
  bulkUploadFailure
} from 'redux/reducers/bulkUpload';
import { bulkUploadProuducts } from "redux/services/bulkUpload";

function* bulkUploadSagaWatcher() {
  yield takeLatest(
    [bulkUploadStart.type],
    bulkUploadWorker,
  );
}

function* bulkUploadWorker(action: any): any {
  try {
    switch (action.type) {
      case bulkUploadStart.type: {
        const response: any = yield call(bulkUploadProuducts, action.payload);
        yield put(bulkUploadSuccess({bulkUploadResponse : response.ResponseBody}));
      }
        break;

      default:
        break;
    }
  } catch (err: any) {
    console.error(`Error occuring while calling an action ${action.type}`, err);

    if (action.type === bulkUploadStart.type) {
      console.error(err?.response?.data?.msg);
      yield put(bulkUploadFailure());
    }
  }
}

export default bulkUploadSagaWatcher;
