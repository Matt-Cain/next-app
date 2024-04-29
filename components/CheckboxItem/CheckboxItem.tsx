'use client';

import React from 'react';
import { Box, Card, Checkbox } from '@mantine/core';

type Item = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
};

type Props = { item: Item };

export const CheckboxItem = ({ item }: Props) => {
  const label = `${item.name} - ${item.quantity} ${item.unit}`;
  return (
    <Box style={{ cursor: 'pointer', marginTop: '15px' }}>
      <Card p="15" radius="md">
        <Checkbox label={label} radius="xl" />
      </Card>
    </Box>
  );
};

CheckboxItem.defaultProps = {
  handleClick: () => {},
};
