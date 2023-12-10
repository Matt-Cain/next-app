'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Box, Text } from '@mantine/core';
import { formatRange } from '@/utils/dates';
import AddItem from '@/components/Item/';

type ItemProps = {
  data: {
    startDate: Date;
    endDate: Date;
  };
  route: string;
};

const Item = ({ data, route }: ItemProps) => {
  const { startDate, endDate } = data || { startDate: new Date(), endDate: new Date() };
  const router = useRouter();

  const range = startDate && endDate ? formatRange({ startDate, endDate }) : '';

  const handleItemClick = () => {
    router.push(`/${route}/${startDate.getTime()}-${endDate.getTime()}`);
  };

  return (
    <Box
      onClick={handleItemClick}
      style={{ cursor: 'pointer', marginTop: '10px', marginBottom: '10px' }}
    >
      <AddItem>
        <Text size="xl" style={{ lineHeight: '35px' }}>
          {range}
        </Text>
      </AddItem>
    </Box>
  );
};

export default Item;
