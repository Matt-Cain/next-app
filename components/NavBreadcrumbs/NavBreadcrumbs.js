'use client';

import Link from 'next/link';
import { useDisclosure } from '@mantine/hooks';
import { Flex, Breadcrumbs, Anchor, AppShell, Burger, Center } from '@mantine/core';
import { usePathname } from 'next/navigation';
import NavBar from '@/components/NavBar';

const breadcrumbTitles = {
  courses: [{ title: 'Courses' }, { title: 'Course' }],
  plans: [{ title: 'Plans' }, { title: 'Plan' }, { skip: true }, { title: 'Meal' }],
  shopping: [{ title: 'Grocery Lists' }, { title: 'List' }, { skip: true }],
  inventory: [{ title: 'Inventory Lists' }, { title: 'Inventory' }, { skip: true }],
  finder: [{ title: 'Finder' }],
  settings: [{ title: 'Settings' }],
};

const getBreadcrumbs = (segments) => {
  const segmentKey = segments[0];
  const breadCrumbNames = breadcrumbTitles[segmentKey];

  const parsedCrumbs = segments.reduce(
    (acc, segment, index) => {
      const { title, skip } = breadCrumbNames[index];

      acc.breadcrumbPath += `/${segment}`;

      if (skip) return acc;
      acc.breadcrumbs.push({ title, href: acc.breadcrumbPath });
      return acc;
    },
    { breadcrumbPath: '', breadcrumbs: [] }
  );
  return parsedCrumbs.breadcrumbs;
};

const getBreadcrumbForPath = (path) => {
  const pathName = path.replace(/\/$/, '');
  const segments = pathName.split('/').filter((segment) => segment.trim() !== '');

  return getBreadcrumbs(segments);
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
