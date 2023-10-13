import Link from 'next/link';
import { NavLink as NavWrapper } from '@mantine/core';

const NavLink = ({ active, label, href, icon, children }) => (
  <NavWrapper
    active={active}
    label={label || ''}
    component={Link}
    href={href || ''}
    leftSection={icon}
    variant="subtle"
  >
    {children}
  </NavWrapper>
);

export default NavLink;
