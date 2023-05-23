import axios from "api/axiosController";
import { getAccessToken } from "utils/auth";

export const updateProductQty = async (data: any) => {
  let uri = `/direct-quantityprice`;
  const formData = new FormData();
  for (const key of Object.keys(data.documents)) {
    formData.append("files", data.documents[key]);
  }

  formData.append("email", data.email);
  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName);
  formData.append("sellerId", data.sellerId);

  try {
    const res = await axios.post(uri, formData, {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};
