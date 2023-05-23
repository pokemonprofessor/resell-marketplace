import { axiosInstanceMain as axios } from "api/axiosController";
import { getAccessToken } from "utils/auth";

export const getTaxCodes = async () => {
  let uri = `/payment/stripe/tax-codes/list`;

  try {
    const res = await axios.get(uri, { headers: {"Authorization" : `Bearer ${getAccessToken()}`} });
    return res.data;
  } catch (e) {
    throw e;
  }
};
