import axios from "api/axiosController";
import { getAccessToken } from "utils/auth";

export const make_api_call = async (data: any) => {
  let uri = `/bulk-upload`;

  try {
    const res = await axios.post(
      uri,
      { data: data },
      { headers: { Authorization: `Bearer ${getAccessToken()}` } }
    );
    return res.data;
  } catch (e) {
    // throw e;
    return e;
  }
};

async function sliceIntoChunks(arr: any[], chunkSize: number) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

async function processProducts(data: any) {
  let formatedData: any = await sliceIntoChunks(data, 5000);
  let result;
  setTimeout(async () => {
    for (let i = 0; i < formatedData.length; i++) {
      result = await make_api_call(formatedData[i]);
      formatedData[i]["result"] = result;
    }
  }, 10000);
  return data;
}

// export const bulkUploadProuducts = async (data: any) => {
//   let result = await processProducts(data.data);
//   return result;
// };


export const bulkUploadProuducts = async (data: any) => {
  console.log('satatatta',data)
  let uri = `/bulk-upload`;
  console.log('dataatatatat',data.documents)
  const formData = new FormData();
  for (const key of Object.keys(data.documents)) {
      formData.append('files', data.documents[key]) 
  }

  formData.append('email', data.email);
  formData.append('firstName', data.firstName);
  formData.append('lastName', data.lastName);
  formData.append('userId', data.userId);
  formData.append('username', data.username);

  try {
    const res = await axios.post(uri, formData, { headers: { "Content-type": "multipart/form-data", Authorization: `Bearer ${getAccessToken()}` } });
    return res.data;
  } catch (e) {
    throw e;
  }
};
