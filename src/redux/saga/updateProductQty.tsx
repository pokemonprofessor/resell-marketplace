import { call, put, takeLatest } from "redux-saga/effects";
import { updateProductQtyFailure, updateProductQtyStart, updateProductQtySuccess } from "redux/reducers/updateProductQty";
import { updateProductQty } from "redux/services/updateProductQty";

function* updateProductQtySagaWatcher() {
  yield takeLatest(
    [updateProductQtyStart.type],
    updateProductQtyWorker,
  );
}

function* updateProductQtyWorker(action: any): any {
  try {
    switch (action.type) {
      case updateProductQtyStart.type: {
        const response: any = yield call(updateProductQty, action.payload);
        yield put(updateProductQtySuccess({bulkUploadResponse : response.ResponseBody}));
      }
        break;

      default:
        break;
    }
  } catch (err: any) {
    console.error(`Error occuring while calling an action ${action.type}`, err);

    if (action.type === updateProductQtyStart.type) {
      console.error(err?.response?.data?.msg);
      yield put(updateProductQtyFailure());
    }
  }
}

export default updateProductQtySagaWatcher;
