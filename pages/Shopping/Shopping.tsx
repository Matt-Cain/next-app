'use client';

import React from 'react';
import { Container } from '@mantine/core';
import Swipe from '@/components/Swipe';
import useShoppingList from '@/hooks/useShoppingList';

const getDatesFromRange = (range) => {
  const [startDateString, endDateString] = range.split('-');
  const startDate = new Date(Number(startDateString));
  const endDate = new Date(Number(endDateString));

  return { startDate, endDate };
};

const Shopping = ({ params }) => {
  const { range } = params;
  const { startDate, endDate } = getDatesFromRange(range);
  const shoppingList = useShoppingList({ startDate, endDate });

  const list = shoppingList?.res?.data?.getShoppingList;

  const onSwipe = (direction) => {
    console.log(direction);
  };

  return (
    <Container fluid style={{ height: '100%' }}>
      {list?.map((item) => (
        <Swipe key={item.id} id={item.id} onSwipe={onSwipe}>
          {item.name + ' ' + item.quantity + ' ' + item.unit}
        </Swipe>
      ))}
    </Container>
  );
};

export default Shopping;
