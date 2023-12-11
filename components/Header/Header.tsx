import React from 'react';
import { Divider, Text } from '@mantine/core';

type HeaderProps = {
  title: string;
  styles?: any;
};

const Header = ({ title, styles }: HeaderProps) => {
  return <Divider label={<Text size="lg">{title}</Text>} labelPosition="center" {...styles} />;
};

export default Header;
