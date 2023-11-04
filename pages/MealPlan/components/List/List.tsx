'use client';

import { Flex } from '@mantine/core';
import ListItem from '../ListItem/ListItem';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const mapMealPlans = (mealPlans) =>
  days.map((day, index) => mealPlans.find((m) => m.day === index));

const MealPlan = ({ mealPlans, loading, planId }) => {
  const mappedMealPlans = mapMealPlans(mealPlans);

  return (
    <Flex mt="-5px" gap="md" justify="space-evenly" direction="column" style={{ height: '100%' }}>
      {mappedMealPlans.map((mealPlan, index) => (
        <ListItem
          planId={planId}
          loading={loading}
          key={index}
          title={days[index]}
          day={index}
          mealPlan={mealPlan}
        />
      ))}
    </Flex>
  );
};

export default MealPlan;
