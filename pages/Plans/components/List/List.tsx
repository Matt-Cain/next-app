'use client';

import { useMutation, gql } from '@apollo/client';
import { useEffect } from 'react';
import { Flex } from '@mantine/core';
import ListItem from '../ListItem/ListItem';
import useDragAndDrop from '@/hooks/useDragAndDrop';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const mapPlans = (plans, timestamps) => {
  const mappedPlans = timestamps.map((timestamp) => {
    const plan = plans.find((p) => new Date(p.timestamp).getTime() === timestamp);

    if (!plan) {
      return {
        timestamp: new Date(timestamp).toISOString(),
        meal: null,
        placeholder: '',
      };
    }

    return plan;
  });

  return mappedPlans;
};

const swapDatesMutation = gql`
  mutation SwapDates($from: SwapInput!, $to: SwapInput!) {
    swapDates(from: $from, to: $to)
  }
`;

const MealPlan = ({ timestamps, plans }) => {
  const planData = plans?.data?.getPlans || [];
  const mappedPlans = mapPlans(planData || [], timestamps);

  const [swapDates] = useMutation(swapDatesMutation);

  const updater = async ({ fromItem, toItem }) => {
    const { id: fromId, timestamp: fromTimestamp } = fromItem;
    const { id: toId, timestamp: toTimestamp } = toItem;

    const { data } = await swapDates({
      variables: {
        from: {
          id: fromId,
          timestamp: fromTimestamp,
        },
        to: {
          id: toId,
          timestamp: toTimestamp,
        },
      },
    });

    if (data.swapDates) plans.refetch();

    return data.swapDates;
  };

  const dnd = useDragAndDrop({ list: mappedPlans, updater });

  useEffect(() => {
    dnd.setListItems(mappedPlans);
  }, [planData]);

  return (
    <Flex mt="-5px" gap="md" justify="space-evenly" direction="column" style={{ height: '100%' }}>
      {dnd.listItems.map((plan, index) => (
        <ListItem
          key={index}
          index={index}
          title={days[index]}
          plan={plan}
          plans={plans}
          dnd={dnd}
        />
      ))}
    </Flex>
  );
};

export default MealPlan;
