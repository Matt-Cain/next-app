'use client';

import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Flex, AppShell, Burger, Center } from '@mantine/core';
import NavBar from '@/components/NavBar';
import NavBreadcrumbs from '@/components/NavBreadcrumbs';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [opened, { toggle }] = useDisclosure();
  const mediaQuery = useMediaQuery('(max-width: 767px)');
  const isMobile = Boolean(mediaQuery);

  return (
    <AppShell
      header={{ height: { sm: 0, md: 60, lg: 60 } }}
      footer={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
    >
      <AppShell.Header hidden={isMobile}>
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
        <NavBar isMobile={isMobile} />
      </AppShell.Navbar>
      <AppShell.Footer p="md" hidden={!isMobile}>
        <NavBar isMobile={isMobile} />
      </AppShell.Footer>
      <AppShell.Main style={{ height: '100dvh' }}>{children}</AppShell.Main>
    </AppShell>
  );
};

export default Layout;
