import { combineReducers } from '@reduxjs/toolkit';
import seller from './seller';
import onboarding from './bankOnboarding';
import categories from './categories';
import bulkUpload from './bulkUpload';
import sellerProducts from './sellerProducts';
import taxCodes from './taxCodes';
import orderDetails from './orderDetails';
import orderAcknowledged from './orderAcknowledged';
import user from './user';

const rootReducer = combineReducers({
    seller: seller,
    onboarding: onboarding,
    user: user,
    categories: categories,
    bulkUpload: bulkUpload,
    sellerProducts: sellerProducts,
    taxCodes: taxCodes,
    orderDetails: orderDetails,
    orderAcknowledged: orderAcknowledged
});

export default rootReducer;
