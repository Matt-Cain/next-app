'use client';

import { useDisclosure } from '@mantine/hooks';
import { Flex, AppShell, Burger, Center } from '@mantine/core';
import NavBar from '@/components/NavBar';
import NavBreadcrumbs from '@/components/NavBreadcrumbs';

const Layout = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Flex style={{ height: '100%' }} align="center">
          <Center style={{ height: '100%', position: 'relative' }}>
            <Burger
              style={{ marginLeft: 10 }}
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          </Center>
          <NavBreadcrumbs />
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavBar />
      </AppShell.Navbar>
      <AppShell.Main style={{ height: '100dvh' }}>{children}</AppShell.Main>
    </AppShell>
  );
};

export default Layout;
