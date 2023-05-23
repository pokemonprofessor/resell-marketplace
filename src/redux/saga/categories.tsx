import { call, put, takeLatest } from "redux-saga/effects";
import {
  categoriesStart,
  categoriesSuccess,
  categoriesFailure
} from 'redux/reducers/categories';
import { getCategories } from "redux/services/categories";

function* categoriesSagaWatcher() {
  yield takeLatest(
    [categoriesStart.type],
    categoriesWorker,
  );
}

function* categoriesWorker(action: any): any {
  try {
    switch (action.type) {
      case categoriesStart.type: {
        const response: any = yield call(getCategories);
        yield put(categoriesSuccess({categories : response.ResponseBody}));
      }
        break;

      default:
        break;
    }
  } catch (err: any) {
    console.error(`Error occuring while calling an action ${action.type}`, err);

    if (action.type === categoriesStart.type) {
      console.error(err?.response?.data?.msg);
      yield put(categoriesFailure());
    }
  }
}

export default categoriesSagaWatcher;
