import axios from "api/axiosController";
import { getAccessToken } from "utils/auth";

export const getprouducts = async (sellerToken:any) => {
  let uri = `/seller-products`;

  try {
    const res = await axios.post(uri, sellerToken,{ headers: {"Authorization" : `Bearer ${getAccessToken()}`} });
    return res.data;
  } catch (e) {
    throw e;
  }
};
