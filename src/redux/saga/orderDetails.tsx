import { call, put, takeLatest } from "redux-saga/effects";
import { ordersFailure, ordersStart, ordersSuccess } from "redux/reducers/orderDetails";
import { getorders } from "redux/services/orderDetails";

function* ordersSagaWatcher() {
  yield takeLatest(
    [ordersStart.type],
    ordersDetailWorker,
  );
}

function* ordersDetailWorker(action: any): any {
  try {
    switch (action.type) {
      case ordersStart.type: {
        const response: any = yield call(getorders,action.payload);
        yield put(ordersSuccess({orders : response.ResponseBody.orders, orderCount: response.ResponseBody.orderCount}));
      }
        break;

      default:
        break;
    }
  } catch (err: any) {
    console.error(`Error occuring while calling an action ${action.type}`, err);

    if (action.type === ordersStart.type) {
      console.error(err?.response?.data?.msg);
      yield put(ordersFailure());
    }
  }
}

export default ordersSagaWatcher;
