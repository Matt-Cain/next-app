'use client';

import { useRouter } from 'next/navigation';
import { Center, Button } from '@mantine/core';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { clearTokens } from '@/utils/tokens';

const Settings = () => {
  const router = useRouter();

  const handleLogoutClick = () => {
    clearTokens();
    router.push('/auth');
  };

  return (
    <>
      <Center>Settings</Center>
      <ColorSchemeToggle />
      <Center>
        <Button mt="30" onClick={handleLogoutClick}>
          Log out
        </Button>
      </Center>
    </>
  );
};

export default Settings;
