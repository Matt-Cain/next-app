import { PiShoppingCart } from 'react-icons/pi';
import { LiaListAltSolid } from 'react-icons/lia';
import { IoSettingsSharp } from 'react-icons/io5';
import { usePathname } from 'next/navigation';
import NavLink from '@/components/NavLink';

const shoppingIcon = <PiShoppingCart size="1rem" stroke={1.5} />;
const mealPlanIcon = <LiaListAltSolid size="1rem" stroke={1.5} />;
const settingsIcon = <IoSettingsSharp size="1rem" stroke={1.5} />;

const links = [
  { label: 'Meal Plans', href: '/plans', icon: mealPlanIcon },
  { label: 'Shopping List', href: '/shopping-list', icon: shoppingIcon },
  { label: 'Settings', href: '/settings', icon: settingsIcon },
];

const NavBar = () => {
  const pathName = usePathname();

  return links.map((link) => (
    <NavLink active={pathName === link.href} key={link.label} {...link} />
  ));
};

export default NavBar;
