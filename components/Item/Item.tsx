'use client';

import React from 'react';
import { Box, Card, Center } from '@mantine/core';

const Item = ({ handleClick, children }) => {
  return (
    <Box onClick={handleClick} style={{ cursor: 'pointer', marginTop: '20px' }}>
      <Card p="28">
        <Center>{children}</Center>
      </Card>
    </Box>
  );
};

export default Item;
