const jwtPayload = (token: any) => {
  try {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
  } catch (err) {
    return err;
  }
};

export default jwtPayload;
