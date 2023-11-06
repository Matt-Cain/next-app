'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Box, Text } from '@mantine/core';
import { formatRange } from '@/utils/dates';
import AddItem from '@/components/AddItem/AddItem';

const MealPlanItem = ({ data: { startDate, endDate } }) => {
  const router = useRouter();

  const range = formatRange({ startDate, endDate });

  const handleItemClick = () => {
    router.push(`/plans/${startDate.getTime()}-${endDate.getTime()}`);
  };

  return (
    <Box onClick={handleItemClick} style={{ cursor: 'pointer', marginTop: '20px' }}>
      <AddItem>
        <Text size="xl" style={{ lineHeight: '35px' }}>
          {range}
        </Text>
      </AddItem>
    </Box>
  );
};

export default MealPlanItem;
