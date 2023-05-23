import snack from "components/wrapper/snack";
import { call, takeLatest, put } from "redux-saga/effects";
import { sendOTPWithFb } from "redux/services/fbApi";
import {
  checkEmail,
  getCountryCode,
  signIn,
  signUpBuyer,
  verifyEmailOTP,
} from "redux/services/user";
import {
  getUserStart,
  loginFail,
  loginStart,
  loginSuccess,
  logoutStart,
  getUserSuccess,
  clearUserData,
  signupStartStart,
  showVerifyOTPStart,
  showVerifyOTPSuccess,
  signupStartFailure,
  setLoading,
  setShowOtpScreen,
  sendOTPUsingFirebaseStart,
  sendOTPUsingFirebaseSuccess,
  sendOTPUsingFirebaseFail,
  verifyEmailOTPStart,
  verifyEmailOTPSuccess,
} from "redux/reducers/user";
import {
  clearAccessToken,
  clearRefreshToken,
  getAccessToken,
  getUser,
  setAccessToken,
  setRefreshToken,
} from "utils/auth";
import { isPhoneNumber } from "utils/validations";
import { getSellers } from "redux/services/seller";

function* userSagaWatcher() {
  yield takeLatest(
    [
      loginStart.type,
      logoutStart.type,
      getUserStart.type,
      signupStartStart.type,
      sendOTPUsingFirebaseStart.type,
      verifyEmailOTPStart.type,
    ],
    userWorker
  );
}

function* userWorker(action: any): any {
  try {
    switch (action.type) {
      case loginStart.type:
        {
          console.log('action.payload',action.payload)
          const { userDataCredential, navigate } = action.payload;
          const sellers = yield call(getSellers)
          if(sellers.ResponseBody && sellers.ResponseBody.sellers){
          let sellerData =  sellers.ResponseBody.sellers.filter((item:any)=> item.email === action.payload.userDataCredential.emailOrPhone)
          console.log('sellers1',sellerData) 
          if(sellerData.length>0){
            console.log('sellerData[0].isApproved',sellerData[0].isApproved)
            if(sellerData[0].isApproved){

              const result = yield call(signIn, userDataCredential);
          
              if (result.ResponseBody.verified) {
                console.log('11111')
                yield put(
                  loginSuccess({
                    verified: true,
                    user: {
                      emailOrPhone: action.payload.user.emailOrPhone,
                      password: action.payload.user.password,
                      phoneNumber: result.ResponseBody.phoneNumber,
                      countryCode: result.ResponseBody.countryCode,
                    },
                  })
                );
              } else {
                console.log('22222')
    
                setAccessToken(result.ResponseBody.token);
                setRefreshToken(result.ResponseBody.refreshToken);
    
                let user: any = getUser(getAccessToken());
                let res = yield call(getCountryCode, { phone: user.phoneNumber });
                user.countryCode = res.ResponseBody.countryCode;
                user.token = result.ResponseBody.token;
                yield put(loginSuccess({ user: user }));
                snack.success("Logged In successfully");
                navigate('/seller-dashboard');
                // if (action.payload.buyNowFlow) {
                //   history.push({
                //     pathname: "/",
                //     state: { buyNowFlow: action.payload.buyNowFlow },
                //   });
                // } else {
                //   history.push('/');
                // }
                yield put(getUserStart());
              }

            }
          }

          
          }
         
        }
        break;

      // eslint-disable-next-line no-lone-blocks
      case signupStartStart.type:
        {
          const { user, history } = action.payload;
          if (action.payload.user.otpConfirm) {
            yield put(setLoading({ loading: true }));
            yield put(setShowOtpScreen({ showOtpScreen: true }));
            const res = yield call(signUpBuyer, user);
            yield put(setLoading({ loading: false }));

            snack.success("Verified OTP successfully");
            yield put(setShowOtpScreen({ showOtpScreen: false }));
            history.push({
              pathname: "/verify-email-otp",
              state: { email: user.email },
            });
          } else {
            const { user } = action.payload;
            yield put(setLoading({ loading: true }));
            let result = yield call(checkEmail, {
              email: user.email.trim().toLowerCase(),
            });
            yield put(setLoading({ loading: false }));

            if (user.phoneNumber) {
              let isPhoneNumberValid = isPhoneNumber(user.phoneNumber);

              if (!isPhoneNumberValid) {
                snack.error("Enter a valid phone number to receive OTP");
                return;
              }

              if (result.ResponseBody.valid) {
                yield put(showVerifyOTPStart());
                yield put(setLoading({ loading: true }));

                const result = yield call(sendOTPWithFb, {
                  phoneNumber: user.countryCode + user.phoneNumber,
                  containerName: "recaptcha-container",
                  appVerifier: null,
                });

                yield put(setLoading({ loading: false }));

                if (result.captchaBoolean) {
                  yield put(
                    showVerifyOTPSuccess({ appVerifier: result.appVerifier })
                  );
                  snack.success("An OTP has been sent to you mobile");
                } else {
                  snack.error("Unable to send OTP");
                }
              }
            }

            if (!user.phoneNumber && user.email) {
              yield put(setLoading({ loading: true }));
              const res = yield call(signUpBuyer, user);
              yield put(setLoading({ loading: false }));
              history.push({
                pathname: "/verify-email-otp",
                state: { email: user.email },
              });
            }
          }
        }
        break;

      case sendOTPUsingFirebaseStart.type:
        {
          const result = yield call(sendOTPWithFb, {
            phoneNumber:
              action.payload.countryCode + action.payload.phoneNumber,
            containerName: "recaptcha-container",
            appVerifier: null,
          });

          if (result.captchaBoolean) {
            yield put(
              sendOTPUsingFirebaseSuccess({ appVerifier: result.appVerifier })
            );
            snack.success("An OTP has been sent to you mobile");
          } else {
            snack.error("Unable to send OTP");
          }
        }
        break;

      case verifyEmailOTPStart.type:
        {
          const { history } = action.payload;
          const res = yield call(verifyEmailOTP, action.payload);
          yield put(verifyEmailOTPSuccess());
          if (res.ResponseBody.emailVerified) {
            snack.success("Email is verified successfully");
            history.push("/signin");
          }
        }
        break;

      // eslint-disable-next-line no-lone-blocks
      case logoutStart.type:
        {
          clearAccessToken();
          clearRefreshToken();
          yield put(clearUserData());
          snack.success("Logged out successfully");
        }
        break;

      // eslint-disable-next-line no-lone-blocks
      case getUserStart.type:
        {
          if (getAccessToken()) {
            const accessToken = getAccessToken();
            let user: any = getUser(accessToken);
            let res = yield call(getCountryCode, { phone: user.phoneNumber });
            user.countryCode = res.ResponseBody.countryCode;
            user.token = accessToken;
            yield put(getUserSuccess({ user }));
          }
        }
        break;

      default:
        break;
    }
  } catch (err: any) {
    if (action.type === signupStartStart.type) {
      yield put(setLoading({ loading: false }));
      yield put(signupStartFailure({ msg: err?.response.data.message }));

      if (
        err?.response?.data?.message ===
        "Email already exists: Please use a new email"
      ) {
        snack.error(err?.response?.data?.message);
      }
      yield put(loginFail({ msg: err, error: true }));
    } else if (action.type === sendOTPUsingFirebaseStart.type) {
      snack.error("Unable to send OTP");
      yield put(
        sendOTPUsingFirebaseFail({
          error: err,
          msg: "Unable to send OTP",
        })
      );
    } else if (action.type === verifyEmailOTPStart.type) {
      snack.error(err.response?.data?.message);
    } else if (action.type === loginStart.type) {
      let msg: string = "",
        emailVerificationSigninErr: boolean = false;
      switch (err.response?.data?.message) {
        // eslint-disable-next-line no-lone-blocks
        case "emailUnverified":
          {
            msg =
              "Email is not verified. Please verify your email or resend the email verification link!";
            emailVerificationSigninErr = true;
            snack.error(msg);
          }
          break;

        // eslint-disable-next-line no-lone-blocks
        case "Authentication failed, invalid password.":
          {
            msg = "Password incorrect !";
            snack.error(msg);
          }
          break;

        // eslint-disable-next-line no-lone-blocks
        case "Authentication failed. Invalid email or phone number.":
          {
            msg = "Invalid email or phone number !";
            snack.error(msg);
          }
          break;

        // eslint-disable-next-line no-lone-blocks
        default:
          {
            console.error("Invalid case");
          }
          break;
      }

      yield put(
        loginFail({
          msg,
          emailVerificationSigninErr,
          error: true,
        })
      );
    } else {
      yield put(loginFail({ msg: err, error: true }));
    }
  }
}

export default userSagaWatcher;
