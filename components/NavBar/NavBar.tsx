import { PiShoppingCart } from 'react-icons/pi';
import { LiaListAltSolid } from 'react-icons/lia';
import { IoSettingsSharp } from 'react-icons/io5';
import { MdOutlineFastfood } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import NavLink from '@/components/NavLink';

const shoppingIcon = <PiShoppingCart size="1rem" stroke={1.5} />;
const mealPlanIcon = <LiaListAltSolid size="1rem" stroke={1.5} />;
const coursesIcon = <MdOutlineFastfood size="1rem" stroke={1.5} />;
const settingsIcon = <IoSettingsSharp size="1rem" stroke={1.5} />;

const links = [
  { label: 'Plans', href: '/plans', icon: mealPlanIcon },
  { label: 'Courses', href: '/courses', icon: coursesIcon },
  { label: 'Shopping', href: '/shopping', icon: shoppingIcon },
  { label: 'Settings', href: '/settings', icon: settingsIcon },
];

const NavBar = () => {
  const pathName = usePathname();

  return links.map((link) => (
    <NavLink active={pathName?.includes(link.href)} key={link.label} {...link} />
  ));
};

export default NavBar;
