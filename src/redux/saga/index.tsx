import { all, fork } from "redux-saga/effects";
import acknowledged from './orderAcknowledged';
import onboarding from "./bankOnboarding";
import seller from "./seller";
import user from "./user";
import categories from "./categories";
import bulkUpload from "./bulkUpload";
import taxCodes from "./taxCodes";
import orderDetails from "./orderDetails";
import sellerProducts from "./sellerProducts";
import updateProductQty from "./updateProductQty";

export default function* rootSaga() {
  yield all([
    fork(seller),
    fork(user),
    fork(onboarding),
    fork(categories),
    fork(bulkUpload),
    fork(taxCodes),
    fork(orderDetails),
    fork(sellerProducts),
    fork(acknowledged),
    fork(updateProductQty),
  ]);
}
