import { call, put, takeLatest } from "redux-saga/effects";
import {
  stripeOnboardingStart,
  stripeOnboardingSuccess,
  stripeOnboardingFailure

} from 'redux/reducers/bankOnboarding';
import { stripeOnBoarding } from "redux/services/bankOnboarding";

function* sellerOnboardingSagaWatcher() {
  yield takeLatest(
    [stripeOnboardingStart.type],
    sellerOnboardingWorker,
  );
}

function* sellerOnboardingWorker(action: any): any {
  try {
    switch (action.type) {
      case stripeOnboardingStart.type: {
        const { navigate } = action.payload
        const response: any = yield call(stripeOnBoarding, action.payload._sellerData);
        yield put(stripeOnboardingSuccess());
        window.open(response.ResponseBody.url)
        navigate('')
      }
        break;

      default:
        break;
    }
  } catch (err: any) {
    console.error(`Error occuring while calling an action ${action.type}`, err);

    if (action.type === stripeOnboardingStart.type) {
      console.error(err?.response?.data?.msg);
      yield put(stripeOnboardingFailure());
    }
  }
}

export default sellerOnboardingSagaWatcher;
