import { axiosInstanceMain as axios } from "api/axiosController";
export const getCategories = async () => {
  let uri = `/categories`;

  try {
    const res = await axios.get(uri);
    return res.data;
  } catch (e) {
    throw e;
  }
};
