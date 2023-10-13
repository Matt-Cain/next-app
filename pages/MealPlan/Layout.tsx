'use client';

import Link from 'next/link';
import { useDisclosure } from '@mantine/hooks';
import { Flex, Breadcrumbs, Anchor, AppShell, Burger, Center } from '@mantine/core';
import { usePathname } from 'next/navigation';
import NavBar from '@/components/NavBar';

const getMealBreadcrumbs = (segments) => {
  const breadCrumbNames = ['Plans', 'Plan', undefined, 'Meal'];

  const parsedCrumbs = segments.reduce(
    (acc, segment, index) => {
      acc.breadcrumbPath += `/${segment}`;
      if (index === 2) return acc;
      acc.breadcrumbs.push({ title: breadCrumbNames[index], href: acc.breadcrumbPath });
      return acc;
    },
    { breadcrumbPath: '', breadcrumbs: [] }
  );
  return parsedCrumbs.breadcrumbs;
};

const breadcrumbPaths = {
  'meal-plans': getMealBreadcrumbs,
};

const getBreadcrumbForPath = (path) => {
  const pathName = path.replace(/\/$/, '');
  const segments = pathName.split('/').filter((segment) => segment.trim() !== '');

  const formatBreadcrumbForSegments = breadcrumbPaths[segments[0]];

  if (!formatBreadcrumbForSegments) {
    return [];
  }

  return formatBreadcrumbForSegments(segments);
};

const Layout = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();
  const pathName = usePathname();

  const breadcrumbs = getBreadcrumbForPath(pathName).map(({ title, href }, index) => (
    <Anchor component={Link} style={{ color: 'white' }} href={href} key={index}>
      {title}
    </Anchor>
  ));

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
          <Breadcrumbs style={{ marginLeft: 10 }} separator="→">
            {breadcrumbs}
          </Breadcrumbs>
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
