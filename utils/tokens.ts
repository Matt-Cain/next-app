'use client';

import { jwtDecode } from 'jwt-decode';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

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
  if (!accessToken || !refreshToken) return;

  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const getTokens = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

  return { accessToken, refreshToken };
};

const isTokenValid = (token: string | null) => {
  if (token?.length) {
    const decodedToken = jwtDecode<iToken>(token);
    const currentTime = new Date().getTime() / 1000;
    return decodedToken.exp > currentTime;
  }

  return false;
};

export const hasValidTokens = () => {
  const { accessToken, refreshToken } = getTokens();
  return isTokenValid(accessToken) || isTokenValid(refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const tokenExpiryTime = (token: string) => new Date(jwtDecode<iToken>(token)?.iat);
