import jwt from 'jwt-decode';

export const getUser = (token: string | null) => {
  if (!token) {
    return;
  } else {
    const user = jwt(token);
    return user;
  }
}

export const getAccessToken = () => {
  return localStorage.getItem('seller-access-token')
}

export const getRefreshToken = () => {
  return localStorage.getItem('seller-refresh-token')
}

export const setAccessToken = (token: string) => {
  return localStorage.setItem('seller-access-token', token)
}

export const setRefreshToken = (token: string) => {
  return localStorage.setItem('seller-refresh-token', token)
}

export const clearAccessToken = () => {
  return localStorage.removeItem('seller-access-token')
}

export const clearRefreshToken = () => {
  return localStorage.removeItem('seller-refresh-token')
}
