'use client';

import { gql, useMutation } from '@apollo/client';
import { Title, Text, Anchor, Center, Button } from '@mantine/core';
import classes from './Welcome.module.css';
import { setTokens } from '@/utils/tokens';

const loginMutation = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      accessToken
      refreshToken
    }
  }
`;

export function Welcome() {
  const [loginMethod] = useMutation(loginMutation, {
    variables: { username: 'foo', password: 'notArealPassword' },
    onCompleted: ({ login }) => {
      setTokens(login);
    },
  });

  const handleLogin = () => {
    loginMethod();
  };

  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Mantine
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        starter Next.js projec includes a minimal setup for server side rendering, if you want to
        learn more on Mantine + Next.js integration follow{' '}
        <Anchor href="https://mantine.dev/guides/next/" size="lg">
          this guide
        </Anchor>
        . To get started edit page.tsx file.
      </Text>
      <Center>
        <Button variant="light" mt="10" onClick={handleLogin}>
          Login
        </Button>
      </Center>
    </>
  );
}
