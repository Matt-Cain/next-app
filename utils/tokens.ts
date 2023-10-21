'use client';

import jwt_decode from 'jwt-decode';

const tokenList = ['accessToken', 'refreshToken'];

export interface tokens {
  accessToken: string;
  refreshToken: string;
}

interface iToken {
  id: string;
  exp: number;
  iat: number;
}

export const setTokens = ({ accessToken, refreshToken }: tokens) => {
  console.log('setTokens', { accessToken, refreshToken });
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const getTokens = async () => {
  const accessToken = await localStorage.getItem('accessToken');
  const refreshToken = await localStorage.getItem('refreshToken');
  return { accessToken, refreshToken };
};

// adapted from https://stackoverflow.com/a/69058154/2805154
const isTokenValid = (token: string | null) => {
  if (token?.length) {
    const decodedToken = jwt_decode<iToken>(token);
    const currentTime = new Date().getTime() / 1000;
    return decodedToken.exp > currentTime;
  }

  return false;
};

// see if the app has tokens set and at least one is not expired
export const hasValidTokens = async () => {
  const { accessToken, refreshToken } = await getTokens();
  return isTokenValid(accessToken) || isTokenValid(refreshToken);
};

export const clearTokens = () => {
  tokenList.forEach((token) => localStorage.removeItem(token));
};

export const tokenExpiryTime = (token: string) => new Date(jwt_decode<iToken>(token)?.iat);
