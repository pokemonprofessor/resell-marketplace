import axiosInstance, { axiosInstanceAdmin } from "api/axiosController";

export const getorders = async (data:any) => {
  let uri = `/seller-orders-details`;
  
  try {
    const res = await axiosInstance.post(uri,data);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const orderAcknowledged = async (data:any) => {
  let uri = `/orders/${data.id}/acknowledged`;

  try {
    const res = await axiosInstanceAdmin.post(uri,data);
    return res.data;
  } catch (e) {
    throw e;
  }
};   
