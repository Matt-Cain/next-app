'use client';

import { VscSettings } from 'react-icons/vsc';
import { Menu, Center } from '@mantine/core';

export default function HomePage() {
  return (
    <Menu
      // position="bottom-end"
      // offset={8}
      transitionProps={{ transition: 'skew-x', duration: 150 }}
    >
      <Menu.Target>
        <Center align="center" justify="Center-end">
          <VscSettings />
        </Center>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item>Messages</Menu.Item>
        <Menu.Item>Gallery</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
