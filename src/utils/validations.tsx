//Function to validate email
const isEmail = function (emailStr : string) : boolean {
  const regex : RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test (String(emailStr).toLowerCase());
}

//Function to validate phone number
const isPhoneNumber = function (phoneNumberStr : string) : boolean {
  const regex : RegExp = /^\d{10}$/;
  return regex.test (String(phoneNumberStr));
}

//Function to validate that a string contains alphabetical characters. Eg - Firstname or Lastname
const containsAlphabeticalLetters  = function (str : string) : boolean {
  const regex : RegExp = /^[A-Za-z\s]+$/;
  return regex.test (String(str));
}

const isCompanyName  = function (str : string) : boolean {
  const regex : RegExp = /^[a-zA-Z0-9][a-zA-Z0-9\.\-#&\s]*$/;
  return regex.test (String(str));
}

//Function to check starting value is backspace value or not
const isValueContainSpace  = function (str : string) : boolean {
  const regex : RegExp = /^(?!\s)/;
  return regex.test (String(str));
}

//Function to validate that OTP length is 6.
const isOTP  = function (Otpstr : string) : boolean {
  const regex : RegExp = /(^|\D)\d{6}($|\D)/;
  return regex.test (String(Otpstr));
}

export {
  isEmail,
  isPhoneNumber,
  containsAlphabeticalLetters,
  isOTP,
  isCompanyName,
  isValueContainSpace
}
