import { Flex } from '@mantine/core';
import { PiShoppingCart } from 'react-icons/pi';
import { LiaListAltSolid } from 'react-icons/lia';
import { IoSettingsSharp } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';
import { MdOutlineFastfood, MdOutlineInventory2 } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import NavLink from '@/components/NavLink';
import { getNowRangeParam } from '@/utils/dates';

const shoppingIcon = <PiShoppingCart size="1rem" />;
const mealPlanIcon = <LiaListAltSolid size="1rem" />;
const coursesIcon = <MdOutlineFastfood size="1rem" />;
const settingsIcon = <IoSettingsSharp size="1rem" />;
const inventoryIcon = <MdOutlineInventory2 size="1rem" />;
const finderIcon = <FaSearch size="1rem" />;

const withRange = (href: string) => {
  const range = getNowRangeParam();
  return `${href}/${range}`;
};

const links = [
  { label: 'Plans', href: withRange('/plans'), icon: mealPlanIcon },
  { label: 'Shopping', href: withRange('/shopping'), icon: shoppingIcon },
  { label: 'Inventory', href: withRange('/inventory'), icon: inventoryIcon },
  { label: 'Courses', href: '/courses', icon: coursesIcon },
  { label: 'Finder', href: '/finder', icon: finderIcon },
  { label: 'Settings', href: '/settings', icon: settingsIcon },
];

const NavBar = ({ isMobile }: { isMobile: boolean }) => {
  const pathName = usePathname();

  const flexDirection = isMobile ? 'row' : 'column';
  const justifyContent = isMobile ? 'space-evenly' : 'flex-start';

  return (
    <Flex direction={flexDirection} justify={justifyContent} style={{ height: '100%' }}>
      {links.map((link) => (
        <NavLink
          isMobile={isMobile}
          active={pathName?.includes(link.href)}
          key={link.label}
          {...link}
        />
      ))}
    </Flex>
  );
};

export default NavBar;
