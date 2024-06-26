'use client';

import { useRouter } from 'next/navigation';
import { gql, useMutation } from '@apollo/client';
import { Center, Button, Flex, Fieldset, TextInput, PasswordInput } from '@mantine/core';
import { useToggle, useInputState } from '@mantine/hooks';
import { setTokens } from '@/utils/tokens';

const loginMutation = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      accessToken
      refreshToken
    }
  }
`;

const singUpMutation = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      id
      accessToken
      refreshToken
    }
  }
`;

const Authentication = () => {
  const [email, setEmail] = useInputState('');
  const [password, setPassword] = useInputState('');
  const [isLogin, toggleFlow] = useToggle();
  const router = useRouter();

  const mutation = isLogin ? loginMutation : singUpMutation;

  const [authMethod] = useMutation(mutation, {
    variables: { email, password },
    onCompleted: ({ login, signUp }) => {
      const tokens = login || signUp;

      if (tokens) {
        setTokens(tokens);
        router.push('/');
      }
    },
  });

  const authFlowText = isLogin ? 'Login' : 'Sign Up';
  const toggleText = isLogin ? "Don't have an account?" : 'Have an account already?';

  const handleAuthClick = () => authMethod();
  const handleToggleClick = () => toggleFlow();

  return (
    <Flex justify="center" align="center" direction="column" mt="lg" mb="lg">
      <Fieldset legend={authFlowText}>
        <TextInput value={email} onChange={setEmail} label="Email" placeholder="Email" />
        <PasswordInput
          value={password}
          onChange={setPassword}
          label="Password"
          placeholder="Password"
          mt="md"
        />
        <Center mt="sm">
          <Button variant="light" mt="10" onClick={handleAuthClick}>
            {authFlowText}
          </Button>
        </Center>
      </Fieldset>
      <Button variant="transparent" mt="20" onClick={handleToggleClick}>
        {toggleText}
      </Button>
    </Flex>
  );
};

export default Authentication;
