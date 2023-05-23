import { axiosInstanceMain } from "api/axiosController";

const signUpBuyer = async (signupData: any) => {
  let uri = "user/signup";
  try {
    const res = await axiosInstanceMain.post(uri, signupData);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const registerAffiliate = async (signupData: any) => {
  let uri = "user/affiliate/register";

  try {
    const res = await axiosInstanceMain.post(uri, signupData);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const signUpSeller = async (signupData: any) => {
  let uri = "user/seller/signup";
  try {
    const res = await axiosInstanceMain.post(uri, signupData);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const signIn = async (signinData: any) => {
  let uri = "user/signin";
  console.log('uri',uri,signinData)
  try {
    const res = await axiosInstanceMain.post(uri, signinData);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const affiliateLogin = async (signinData: any) => {
  let uri = "user/affiliate/login";
  try {
    const res = await axiosInstanceMain.post(uri, signinData);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const checkEmail = async (data: object) => {
  let uri = "user/check-email";
  try {
    const res = await axiosInstanceMain.post(uri, data);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const tokenVerification = async (token: object) => {
  let uri = "user/verify-token";
  try {
    const res = await axiosInstanceMain.post(uri, token);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const resendEmailVerificationLink = async (email: object) => {
  let uri = "user/resend-email";
  try {
    const res = await axiosInstanceMain.post(uri, email);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const sendResetPasswordLink = async (data: object) => {
  let uri = "user/send-reset-password-link";
  try {
    const res = await axiosInstanceMain.post(uri, data);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const getCountryCode = async (data: object) => {
  let uri = "user/get-country-code";
  try {
    const res = await axiosInstanceMain.post(uri, data);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const passwordUpdate = async (data: object) => {
  let uri = "user/update-password";
  try {
    const res = await axiosInstanceMain.post(uri, data);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const subscribeNewLetter = async (data: any) => {
  let uri = "user/subscribe";
  try {
    const res = await axiosInstanceMain.post(uri, { email: data.email });
    return res.data;
  } catch (e) {
    throw e;
  }
};

const verifyEmailOTP = async (data: any) => {
  let uri = "user/email-verification";
  try {
    const res = await axiosInstanceMain.post(uri, { otp: data.otp, email: data.email });
    return res.data;
  } catch (e) {
    throw e;
  }
};

export {
  signUpBuyer,
  signUpSeller,
  checkEmail,
  tokenVerification,
  resendEmailVerificationLink,
  sendResetPasswordLink,
  getCountryCode,
  passwordUpdate,
  registerAffiliate,
  affiliateLogin,
  subscribeNewLetter,
  verifyEmailOTP,
};
