import { ApolloLink, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { setTokens, getTokens } from '@/utils/tokens';
import { getBaseUrl } from '@/utils/url';

const middleware = setContext(async (operation, { headers }) => {
  const { accessToken, refreshToken } = await getTokens();

  return {
    headers: {
      ...headers,
      'x-access-token': accessToken,
      'x-refresh-token': refreshToken,
    },
  };
});

const afterWare = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const context = operation.getContext();
    const accessToken = context?.response?.headers?.get('x-access-token');
    const refreshToken = context?.response?.headers?.get('x-refresh-token');
    if (accessToken || refreshToken) setTokens({ accessToken, refreshToken });

    return response;
  })
);

const createHttpLink = () =>
  new HttpLink({
    uri: getBaseUrl(),
    fetchOptions: { cache: 'no-store' },
  });

const getLink = () => {
  const httpLink = createHttpLink();

  const link =
    typeof window === 'undefined'
      ? from([
          new SSRMultipartLink({
            stripDefer: true,
          }),
          httpLink,
        ])
      : from([afterWare, middleware, httpLink]);

  return link;
};

const makeClient = () => {
  const link = getLink();

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link,
  });
};

export default makeClient;
