import snack from "components/wrapper/snack";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  acknowledgeFailure,
  acknowledgeStart,
  acknowledgeSuccess,
} from "redux/reducers/orderAcknowledged";
import { orderAcknowledged } from "redux/services/orderDetails";

function* acknowledgedSagaWatcher() {
  yield takeLatest([acknowledgeStart.type], orderAcknowledgedWorker);
}

function* orderAcknowledgedWorker(action: any): any {
  try {
    switch (action.type) {
      case acknowledgeStart.type:
        {
          const response: any = yield call(orderAcknowledged, action.payload);
          yield put(acknowledgeSuccess({ response }));
          snack.success("Acknowledged!!");
        }
        break;

      default:
        break;
    }
  } catch (err: any) {
    console.error(`Error occuring while calling an action ${action.type}`, err);

    if (action.type === acknowledgeStart.type) {
      console.error(err?.response?.data?.msg);
      yield put(acknowledgeFailure());
    }
  }
}
export default acknowledgedSagaWatcher;
