import axios from "api/axiosController";
import { axiosInstanceAdmin } from "api/axiosController";
import { getAccessToken } from "utils/auth";

export const onBoardSeller = async (data: any) => {
  let uri = `/signup`;

  try {
    const res = await axios.post(uri, data);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const signinSeller = async (data: any) => {
  let uri = `/signin`;

  try {
    const res = await axios.post(uri, data);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const setSellerPassword = async (data: any) => {
  let uri = `/create-password`;

  try {
    const res = await axios.put(uri, data);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const resendSetPasswordEmail = async (data: any) => {
  let uri = `/admin/seller-resend-email`;

  try {
    const res = await axiosInstanceAdmin.post(uri, data);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const uploadDocs = async (data: any) => {
  let uri = `/upload`;
  const formData = new FormData();
  for (const key of Object.keys(data.documents)) {
      formData.append('files', data.documents[key])
  }

  formData.append('email', data.email);
  formData.append('firstName', data.firstName);
  formData.append('lastName', data.lastName);

  try {
    const res = await axios.post(uri, formData, { headers: { "Content-type": "multipart/form-data" } });
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const getSellers = async () => {
  let uri = `/admin/get-sellers`;
  try {
    const res = await axiosInstanceAdmin.get(uri);
    console.log('resss',res)
    return res.data;
  } catch (e) {
    throw e;
  }
};
