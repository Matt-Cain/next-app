import { ApolloLink, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { setTokens, getTokens } from '@/utils/tokens';

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
    uri: 'http://localhost:4003/',
    fetchOptions: { cache: 'no-store' },
  });

  const getLink = () => {
    const httpLink = createHttpLink();

    const link =
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : ApolloLink.from([afterWare, middleware, httpLink]);

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