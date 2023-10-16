'use client';

import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import React from 'react';
import { Box, Modal, Group, Button, Card, Flex, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
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

const AddItemCard = ({ data: { startDate, endDate } }) => {
  const [opened, { toggle, close }] = useDisclosure(false);

  const [callMutation] = useMutation(createMealPlanMutation, {
    variables: { startDate, endDate },
    onCompleted: ({ createPlan }) => {
      console.log('createMealPlan', createPlan);
    },
  });

  const doCreateMealPlan = () => {
    callMutation();
    close();
  };

  const range = formatRange({ startDate, endDate });
  return (
    <Box onClick={toggle} style={{ cursor: 'pointer', marginTop: '20px' }}>
      <AddItem>
        <Modal title="Create meal plan or add placeholder" opened={opened} onClose={close} centered>
          <Group justify="center">
            <Button onClick={doCreateMealPlan} variant="light">
              Meal Plan
            </Button>
            <Button onClick={close} variant="light">
              Placeholder
            </Button>
          </Group>
        </Modal>
        <Text size="xl" style={{ lineHeight: '35px' }}>
          {range}
        </Text>
      </AddItem>
    </Box>
  );
};

const MealPlanCard = ({ data: { mealPlan, startDate, endDate } }) => {
  return (
    <Link
      key={mealPlan.id}
      href={`/meal-plans/${mealPlan.id}`}
      style={{ textDecoration: 'none', marginTop: '20px' }}
    >
      <Card mt="lg" style={{ textDecoration: 'none', marginTop: '20px', height: '80px' }}>
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

const MealPlanItem = ({ data }) => {
  return data.mealPlan ? <MealPlanCard data={data} /> : <AddItemCard data={data} />;
};

export default MealPlanItem;
