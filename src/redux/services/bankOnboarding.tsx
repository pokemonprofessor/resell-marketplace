import axios from "api/axiosController";

export const stripeOnBoarding = async (data: any) => {
  let uri = `/on-board`;

  try {
    const res = await axios.post(uri, data);
    return res.data;
  } catch (e) {
    throw e;
  }
};
