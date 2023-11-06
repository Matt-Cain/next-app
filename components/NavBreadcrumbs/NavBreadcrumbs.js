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

const getCourseBreadcrumbs = (segments) => {
  const breadCrumbNames = ['Courses', 'Course'];

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
  plans: getMealBreadcrumbs,
  courses: getCourseBreadcrumbs,
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

const NavBreadcrumbs = () => {
  const [opened, { toggle }] = useDisclosure();
  const pathName = usePathname();

  const breadcrumbs = getBreadcrumbForPath(pathName).map(({ title, href }, index) => (
    <Anchor component={Link} style={{ color: 'white' }} href={href} key={index}>
      {title}
    </Anchor>
  ));

  return (
    <Breadcrumbs style={{ marginLeft: 10 }} separator="→">
      {breadcrumbs}
    </Breadcrumbs>
  );
};

export default NavBreadcrumbs;
