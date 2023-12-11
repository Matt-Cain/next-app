'use client';

import { useRouter } from 'next/navigation';
import { gql } from '@apollo/client/core';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';

const ME = gql`
  query Me {
    me {
      id
      email
    }
  }
`;

const useAuth = () => {
  const router = useRouter();

  const { data, loading } = useQuery(ME, {
    onCompleted: ({ me }) => {
      if (!me) router.push('/auth');
    },
  });

  return { user: data?.me, loading: loading || !data?.me };
};

export default useAuth;
