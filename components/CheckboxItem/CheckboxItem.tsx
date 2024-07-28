'use client';

import React from 'react';
import { Box, Card, Checkbox } from '@mantine/core';

type Item = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
};

type Props = {
  checked: boolean;
  index: number;
  item: Item;
  onChange: (id: string, nextValue: boolean) => void;
};

export const CheckboxItem = ({ checked, index, item, onChange }: Props) => {
  const label = `${item.name} - ${item.unit} - ${item.quantity}`;

  const handleChange = () => onChange(item.id, !checked);

  return (
    <Box style={{ cursor: 'pointer', marginTop: '15px' }}>
      <Card onClick={handleChange} p="15" radius="md">
        <Checkbox checked={checked} label={label} radius="xl" readOnly />
      </Card>
    </Box>
  );
};
