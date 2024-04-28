import Link from 'next/link';
import { NavLink as NavWrapper } from '@mantine/core';
import classes from './NavLink.module.css';

type Props = {
  active?: boolean;
  label?: string;
  href?: string;
  icon?: React.ReactNode;
  isMobile?: boolean;
};

const NavLink = ({ active, label, href, icon, isMobile }: Props) =>
  isMobile ? (
    <Link className={`${classes.mobileNavItem} ${active ? classes.active : ''}`} href={href || ''}>
      {icon}
    </Link>
  ) : (
    <NavWrapper
      active={active}
      label={isMobile ? undefined : label || ''}
      component={Link}
      href={href || ''}
      leftSection={icon}
      variant="subtle"
    />
  );

export default NavLink;
