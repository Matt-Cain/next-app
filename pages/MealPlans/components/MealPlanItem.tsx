'use client';

import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import React from 'react';
import { Skeleton, Box, Card, Flex, Text } from '@mantine/core';
import { formatRange } from '@/utils/dates';
import AddItem from '@/components/AddItem/AddItem';

const createMealPlanMutation = gql`
  mutation Mutation($startDate: Date!, $endDate: Date!) {
    createPlan(startDate: $startDate, endDate: $endDate) {
      id
      startDate
      endDate
    }
  }
`;

const AddItemCard = ({ data: { startDate, endDate }, handleAddItem }) => {
  const [callMutation, { loading }] = useMutation(createMealPlanMutation, {
    variables: { startDate, endDate },
    onCompleted: () => {
      handleAddItem();
    },
  });

  const range = formatRange({ startDate, endDate });
  return (
    <Skeleton visible={loading} style={{ height: '100%', width: '100%', flex: 1 }}>
      <Box onClick={callMutation} style={{ cursor: 'pointer', marginTop: '20px' }}>
        <AddItem>
          <Text size="xl" style={{ lineHeight: '35px' }}>
            {range}
          </Text>
        </AddItem>
      </Box>
    </Skeleton>
  );
};

const MealPlanCard = ({ data: { mealPlan, startDate, endDate } }) => {
  return (
    <Link
      key={mealPlan.id}
      href={`/plans/${mealPlan.id}`}
      style={{ textDecoration: 'none', marginTop: '20px' }}
    >
      <Card mt="lg" style={{ textDecoration: 'none', marginTop: '20px', height: '91px' }}>
        <Flex
          justify="space-between"
          align="center"
          direction="row"
          style={{ height: '100%', paddingLeft: '14px' }}
        >
          <Text>{formatRange({ startDate, endDate })}</Text>
        </Flex>
      </Card>
    </Link>
  );
};

const MealPlanItem = (props) => {
  return props.data.mealPlan ? <MealPlanCard {...props} /> : <AddItemCard {...props} />;
};

export default MealPlanItem;
