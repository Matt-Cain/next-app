'use client';

import { Flex } from '@mantine/core';
import ListItem from '../ListItem/ListItem';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const mapPlans = (plans, timestamps) => {
  const mappedPlans = timestamps.map((timestamp) => {
    const plan = plans.find((p) => new Date(p.timestamp).getTime() === timestamp);

    if (!plan) {
      return {
        timestamp,
        meal: null,
        placeholder: '',
      };
    }

    return plan;
  });

  return mappedPlans;
};

const MealPlan = ({ timestamps, plans, loading }) => {
  const mappedPlans = mapPlans(plans, timestamps);

  return (
    <Flex mt="-5px" gap="md" justify="space-evenly" direction="column" style={{ height: '100%' }}>
      {mappedPlans.map((plan, index) => (
        <ListItem
          loading={loading}
          key={index}
          title={days[index]}
          plan={plan}
        />
      ))}
    </Flex>
  );
};

export default MealPlan;
