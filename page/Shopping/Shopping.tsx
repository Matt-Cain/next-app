'use client';

import React, { useEffect } from 'react';
import { Container } from '@mantine/core';
import Swipe from '@/components/Swipe';
import useShoppingList from '@/hooks/useShoppingList';

const getDatesFromRange = (range: string) => {
  const [startDateString, endDateString] = range.split('-');
  const startDate = new Date(Number(startDateString));
  const endDate = new Date(Number(endDateString));

  return { startDate, endDate };
};

type ShoppingProps = {
  params: {
    range: string;
  };
};

type InventoryIngredientsType = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
};

const Shopping = ({ params }: ShoppingProps) => {
  const { range } = params;
  const { startDate, endDate } = getDatesFromRange(range);
  const shoppingList = useShoppingList({ startDate, endDate });

  useEffect(() => {
    shoppingList.res.refetch();
  }, []);

  const list: InventoryIngredientsType[] = shoppingList?.res?.data?.getShoppingList;

  const onSwipe = ({ id, direction }: { id: string; direction: string }) => {
    const status = direction === 'left' ? 'home' : 'cart';
    shoppingList.add({ id, type: 'ingredient', timestamp: startDate, status });
    shoppingList.res.refetch();
  };

  return (
    <Container p="15" fluid style={{ height: '100%' }}>
      {list?.map(({ id, name, quantity, unit }) => (
        <Swipe key={id} id={id} onSwipe={onSwipe}>
          {`${name} ${quantity} ${unit}`}
        </Swipe>
      ))}
    </Container>
  );
};

export default Shopping;
