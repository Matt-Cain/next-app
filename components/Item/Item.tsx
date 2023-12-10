'use client';

import React from 'react';
import { Box, Card, Center } from '@mantine/core';

type Props = {
  handleClick?: () => void;
  children: React.ReactNode;
};

const Item = ({ handleClick, children }: Props) => {
  return (
    <Box onClick={handleClick} style={{ cursor: 'pointer', marginTop: '20px' }}>
      <Card p="28">
        <Center>{children}</Center>
      </Card>
    </Box>
  );
};

Item.defaultProps = {
  handleClick: () => {},
};

export default Item;
