import FirebaseTypes from "firebase";
import firebase from "config/firebase";
export { FirebaseTypes };

declare global {
  interface Window {
    confirmationResult?: FirebaseTypes.auth.ConfirmationResult;
  }
}

export const sendOTPWithFb = async (data: any): Promise<any> => {
  const { phoneNumber, containerName, appVerifier } = data

  try {
    if (!appVerifier) {
      const appVerifier: any = new FirebaseTypes.auth.RecaptchaVerifier(
        containerName,
        {
          size: "invisible",
        }
      );

      const confirmationResult = await firebase
        .auth()
        .signInWithPhoneNumber(`${phoneNumber}`, appVerifier);
      window.confirmationResult = confirmationResult;
      return { captchaBoolean: true, appVerifier };
    }

    const confirmationResult = await firebase
      .auth()
      .signInWithPhoneNumber(`${phoneNumber}`, appVerifier);
    window.confirmationResult = confirmationResult;
    return { captchaBoolean: true, appVerifier };
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const sendEmailWithFb = async (
  email: string,
  url: string
): Promise<boolean> => {
  try {
    const actionCodeSettings = {
      url,
      handleCodeInApp: true,
    };
    await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

