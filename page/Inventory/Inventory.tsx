'use client';

import React, { useEffect } from 'react';
import { Container } from '@mantine/core';
import Swipe from '@/components/Swipe';
import useInventory from '@/hooks/useInventory';
import { getNowRangeParam } from '@/utils/dates';
import Header from '@/components/Header';

const getDatesFromRange = (range: string) => {
  const [startDateString, endDateString] = range.split('-');
  const startDate = new Date(Number(startDateString));
  const endDate = new Date(Number(endDateString));

  return { startDate, endDate };
};

type InventoryProps = {
  params: {
    range: string;
  };
};

type InventoryIngredientsType = {
  item: {
    id: string;
    name: string;
    quantity: number;
    unit: string;
  };
};

const Inventory = ({ params }: InventoryProps) => {
  const { range } = params || { range: getNowRangeParam() };
  const { startDate, endDate } = getDatesFromRange(range);
  const inventory = useInventory({ startDate, endDate });

  useEffect(() => {
    inventory.res.refetch();
  }, []);

  const list: InventoryIngredientsType[] =
    inventory?.res?.data?.getInventoryList?.ingredients || [];

  const onSwipe = async ({ id }: { id: string }) => {
    // const status = direction === 'left' ? 'home' : 'cart';
    await inventory.remove({ id, type: 'ingredient' });
    inventory.res.refetch();
  };

  return (
    <Container p="15" fluid style={{ height: '100%' }}>
      <Header title="Inventory" />
      {list?.map(({ item: { id, name, quantity, unit } }) => (
        <Swipe key={id} id={id} onSwipe={onSwipe}>
          {`${name} ${quantity} ${unit}`}
        </Swipe>
      ))}
    </Container>
  );
};

export default Inventory;
