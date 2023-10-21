'use client';

import { Flex } from '@mantine/core';
import ListItem from '../ListItem/ListItem';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const mapMeals = (meals) => days.map((day, index) => meals.find((m) => m.day === index));

const MealPlan = ({ meals, loading, planId }) => {
  const mappedMeals = mapMeals(meals);

  return (
    <Flex mt="-5px" gap="md" justify="space-evenly" direction="column" style={{ height: '100%' }}>
      {mappedMeals.map((meal, index) => (
        <ListItem
          planId={planId}
          loading={loading}
          key={index}
          title={days[index]}
          day={index}
          meal={meal}
        />
      ))}
    </Flex>
  );
};

export default MealPlan;
