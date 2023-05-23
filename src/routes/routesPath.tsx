//Define type of route

export const UNAUTHENTICATED_ROUTE_PATHS = {
  HOME: '/',
  SELLER_ONBOARDING: '/seller/onboarding/:step',
  SIGNIN: '/seller/signin',
  SET_PASSWORD: '/seller/set-password/:token',
  ADD_BANKING_DETAILS: '/seller/add-banking-details',
  SELLER_DASHBOARD_HOME: '/seller-dashboard',
  ERROR: '/error',
  NOT_FOUND: '*',
}

export const AUTHENTICATED_ROUTE_PATHS = {
  BULK_UPLOAD: '/bulk-upload',
  LISTING_STATUS_UPDATE: '/listing-status-update',
  SELLER_PRODUCTS: '/seller-products',
  ORDER_DETAILS: '/order-details',
}
