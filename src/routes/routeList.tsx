import Content from "components/Content";
import AddBankingDetails from "components/Content/BankDetails";
import Home from "components/Home";
import SetPassword from "components/SetPassword";
import SignIn from "components/SignIn";
import { route } from "types";
import {
  UNAUTHENTICATED_ROUTE_PATHS,
  AUTHENTICATED_ROUTE_PATHS,
} from "./routesPath";
import Error from "components/common/Error";
import { BulkUpload } from "components/Content/BulkUpload";
import { SellerDashboardHome } from "components/sellerDashboardHome";
import OrderDetails from "components/Content/OrderDetails";
import { SellerProducts } from "components/Content/SellerDashboard/sellerProducts";
import { ProductQtyPriceUpdate } from "components/Content/productUpdate";

const routes: route[] = [
  {
    path: UNAUTHENTICATED_ROUTE_PATHS.SELLER_ONBOARDING,
    component: <Content />,
    routeType: 'un-auth'
  },
  {
    path: UNAUTHENTICATED_ROUTE_PATHS.HOME,
    component: <Home />,
    routeType: 'un-auth'
  },
  {
    path: UNAUTHENTICATED_ROUTE_PATHS.SELLER_DASHBOARD_HOME,
    component: <SellerDashboardHome />,
    routeType: 'auth'
  },
  {
    path: UNAUTHENTICATED_ROUTE_PATHS.SIGNIN,
    component: <SignIn />,
    routeType: 'un-auth'
  },
  {
    path: UNAUTHENTICATED_ROUTE_PATHS.SET_PASSWORD,
    component: <SetPassword />,
    routeType: 'un-auth'
  },
  {
    path: UNAUTHENTICATED_ROUTE_PATHS.ADD_BANKING_DETAILS,
    component: <AddBankingDetails />,
    routeType: 'un-auth'
  },
  {
    path: AUTHENTICATED_ROUTE_PATHS.BULK_UPLOAD,
    component: <BulkUpload />,
    routeType: 'auth'
  },
  {
    path: AUTHENTICATED_ROUTE_PATHS.LISTING_STATUS_UPDATE,
    component: <ProductQtyPriceUpdate />,
    routeType: 'auth'
  },
  {
    path: AUTHENTICATED_ROUTE_PATHS.SELLER_PRODUCTS,
    component: <SellerProducts />,
    routeType: 'auth'
  },
  {
    path: UNAUTHENTICATED_ROUTE_PATHS.ERROR,
    component: <Error />,
    routeType: 'un-auth'
  },
  {
    path: UNAUTHENTICATED_ROUTE_PATHS.NOT_FOUND,
    component: <Error />,
    routeType: 'un-auth'
  },
  {
    path: AUTHENTICATED_ROUTE_PATHS.ORDER_DETAILS,
    component: <OrderDetails />,
    routeType: 'auth'
  }
];

export default routes;
