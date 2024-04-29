'use client';

import React, { useEffect } from 'react';
import { Container, Text, Paper } from '@mantine/core';
// import Swipe from '@/components/Swipe';
import useShoppingList from '@/hooks/useShoppingList';
import Header from '@/components/Header';
import { CheckboxItem } from '@/components/CheckboxItem';

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
    <Container p="15" fluid>
      <div style={{ height: '100%', overflowY: 'scroll' }}>
        <Header title="Shopping" />
        {list?.map((item) => <CheckboxItem key={item.id} item={item} />)}
        {list?.length === 0 && (
          <Paper bg="gray.9" shadow="sm" p="lg" mt="20" radius="md">
            <Text>Shopping List Empty</Text>
          </Paper>
        )}
      </div>
    </Container>
  );
};

export default Shopping;
