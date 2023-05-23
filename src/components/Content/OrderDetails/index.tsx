import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import orderDetails, { ordersStart } from "redux/reducers/orderDetails";
import { Pagination } from "@mui/material";
import "./style.css";
import { RootState } from "redux/store";
import { acknowledgeStart } from "redux/reducers/orderAcknowledged";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orderDetails.orders);
  const orderCount = useSelector(
    (state: RootState) => state.orderDetails.orderCount
  );
  const seller: any = useSelector((state: RootState) => state.seller.seller);
  const orderAcknowledged: any = useSelector((state: RootState) => state.orderAcknowledged);
  const [page, setPage] = useState(1);
  const [orderSearchData, setOrderSearchData] = useState<any>();
  const [searchValue, setSearchValue] = useState<any>();
  let pageLimit = 10;

  useEffect(() => {
    if (seller) {
      setPage(1);
      dispatch(
        ordersStart({ sellerId: seller._id, itemsPerPage: pageLimit, page: 1 })
      );
    }
  }, [seller,orderAcknowledged]);

  let pages: any = Math.ceil(orderCount / pageLimit);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    if (seller) {
      dispatch(
        ordersStart({
          sellerId: seller._id,
          itemsPerPage: pageLimit,
          page: value,
        })
      );
    }
  };

  const filteredData = (value: any) => {
    if (!value) {
      return;
    }
    const data = orders?.filter((item: any) => {
      return Object.values(item.Items[0].title)
        ?.join("")
        ?.toLowerCase()
        .includes(value?.toLowerCase());
    });
    return data;
  };

  const handleSearchValue = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (searchValue) {
      const data = filteredData(searchValue);
      setOrderSearchData(data);
    }
    if (!searchValue) {
      setOrderSearchData(null);
      return;
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    if (!event.target.value) {
      setOrderSearchData(null);
      return;
    }
    if (event.target.value) {
      const data = filteredData(event.target.value);
      setOrderSearchData(data);
    }
  };

  const singleOrderTemplate = (order: any, index: number) => {
    const payoutTime = order.payoutDetails
      ? new Date(1000 * order.payoutDetails.createdAt).toString()
      : "Not applicable";
    return (
      <div key={index} className="box-sh">
        <div className="wishlist-detail d-flex">
          <div>Order Details</div>

          <div
            className="d-flex w-100 justify-content-between"
            style={{ paddingLeft: 50 }}
          >
            <div className="my-order-content-wrap">
              <div>
                <p>
                  <b>Order ID : </b>
                  {order.ID}
                </p>
              </div>

              <div>
                <p>
                  <b>Order Status : </b>
                  {order.OrderStatus === "ReleasedForShipment"
                    ? order.OrderStatus
                    : order.OrderStatus.toUpperCase()}
                </p>
              </div>
              <div>
                <p>
                  <b>Payment Status : </b>
                  {order.OrderPaymentStatus}
                </p>
              </div>
            </div>

            <div className="p-4">
              <div>
                <p>
                  {" "}
                  <b>Order Time : </b>
                  {order.OrderDateUtc}
                </p>
              </div>

              <div>
                <p>
                  <b>Order Total Price : </b>${order.TotalPrice.toFixed(2)}
                </p>
              </div>
              <div>
                <p>
                  {" "}
                  <b>Order Total Tax : </b>${order.TotalTaxPrice.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="p-4">
              <div>
                <p>
                  <b>Payment Type : </b>
                  {order.PaymentType}
                </p>
              </div>

              <div>
                <p>
                  <b>Resell Cut : </b>${order.TotalPaysferAmount.toFixed(2)}
                </p>
              </div>
              <div>
                <p>
                  <b>Resell Amount : </b>${order.TotalSellerAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
        {order.Items &&
          order.Items.map((item: any, index: number) => (
            <>
              <div className="wishlist-detail d-flex" key={index}>
                <div>Order Items Details</div>
                <div className="d-flex w-100 justify-content-between">
                  <div
                    className="d-flex my-order-content-wrap"
                    style={{ width: "100%" }}
                  >
                    <div className="my-order-product-img">
                      <img src={item.image} />
                    </div>

                    <div className="product-detail-text">
                      <div>
                        <p>
                          <b>Title : </b> {item.title}
                        </p>
                        <p>
                          <b>Item Price : </b> ${item.UnitPrice.toFixed(2)}
                        </p>
                        <p>
                          <b>Quantity : </b> {item.Quantity}
                        </p>

                        {/* <p className="product-text">{item.description}</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={()=>{
                    dispatch(
                        acknowledgeStart({ id:order?.ID,sellerId: item?.sellerId })
                      );
                  }}
                  style={{ position: "relative", left: "15px" }}
                >
                  Acknowledge
                </button>
              </div>
            </>
          ))}
        {/* <div className="wishlist-detail d-flex">
                    <div>Payout Details</div>
                    <div className="d-flex w-100 justify-content-between">
                        {console.log('orderorder',order)}
                        <div>
                            {order.payoutDetails ?
                                <>
                                    <p><b>Payout Id : </b> {order.payoutDetails._id}</p>
                                    <p><b>Payout Status : </b> {order.payoutDetails.PayoutStatus.toUpperCase()}</p>
                                    <p><b>Payout Stripe transfer ID : </b> {order.payoutDetails.transferID}</p>
                                    <p><b>Payout Time : </b> {payoutTime}</p>
                                </>
                                :
                                <>
                                    <p style={{ color: "red", padding: 10, paddingLeft: 50 }}>Payout Pending...</p>
                                </>
                            }

                        </div>
                    </div>
                </div> */}
      </div>
    );
  };

  return (
    <>
      <section className="product-detils-section custom-spacer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-9">
              <div className="gift-card-text">
                <p>My Orders</p>
              </div>
              <div className="my-order-searchbar">
                <form onSubmit={handleSearchValue}>
                  <div className="form-group">
                    <input
                      onChange={handleSearch}
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Search your order here"
                    />
                  </div>
                </form>
                {orders && orders.length === 0 ? (
                  <p className="empty-cart">
                    <h2>No Orders Found</h2>
                  </p>
                ) : null}
                {orderSearchData && orderSearchData.length === 0 ? (
                  <p className="empty-cart">
                    <h2>No Orders Found</h2>
                  </p>
                ) : null}
              </div>
              <div className="my-orders-card-wrap">
                {orderSearchData
                  ? orderSearchData &&
                    orderSearchData.map((item: any, index: number) =>
                      singleOrderTemplate(item, index)
                    )
                  : orders &&
                    orders.map((item: any, index: number) =>
                      singleOrderTemplate(item, index)
                    )}
                <Pagination
                  count={pages}
                  page={page}
                  onChange={handleChangePage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderDetails;
