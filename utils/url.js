const isProd = process.env.NODE_ENV === 'production';

export const getBaseUrl = () => {
  // return isProd ? 'https://core-meal-plan.fly.dev' : 'http://localhost:4000/';
  return 'https://plan-server.fly.dev';
};
