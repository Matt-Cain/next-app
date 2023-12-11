import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { getBaseUrl } from '../url';

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: getBaseUrl(),
      fetchOptions: { cache: 'no-store' },
      credentials: 'include',
    }),
  });
});
