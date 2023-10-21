'use client';

import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { Skeleton, Flex, Text, Fieldset, ThemeIcon } from '@mantine/core';
import { RiDraggable } from 'react-icons/ri';
import { usePathname, useRouter } from 'next/navigation';

const Item = ({ name, handleCreateItem }) => (
  <Flex
    onClick={handleCreateItem}
    draggable="true"
    justify="space-between"
    align="center"
    style={{ height: '100%', marginTop: '-4px', cursor: 'pointer' }}
  >
    <Text>{name}</Text>
    <ThemeIcon color="gray" size="sm" variant="transparent">
      <RiDraggable />
    </ThemeIcon>
  </Flex>
);

const createMealPlanMutation = gql`
  mutation CreateMealPlan($planId: ID!, $day: Int!) {
    createMealPlan(planId: $planId, day: $day) {
      id
      day
    }
  }
`;

const ListItem = ({ title, day, meal, loading, planId }) => {
  const router = useRouter();
  const pathName = usePathname();

  const [callMutation, mutation] = useMutation(createMealPlanMutation, {
    variables: { planId, day },
    onCompleted: ({ createMealPlan }) => {
      const { id } = createMealPlan;
      if (id) {
        router.push(`${pathName}/meal/${id}`);
      }
    },
  });

  const { name, id } = meal || {};

  const pathToMeal = `${pathName}/meal/${id}`;

  const handleCreateItem = () => {
    if (mutation.loading) return;
    callMutation();
  };

  return (
    <Skeleton visible={loading} style={{ height: '100%', width: '100%', flex: 1 }}>
      <Fieldset
        style={{ width: '100%', height: '100%', flex: 1 }}
        legend={title}
        variant="filled"
        shadow="xs"
        p="0"
        pl="md"
        pr="sm"
      >
        {meal ? (
          <Link
            disable={!meal}
            href={pathToMeal}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Item name={name} />
          </Link>
        ) : (
          <Item handleCreateItem={handleCreateItem} />
        )}
      </Fieldset>
    </Skeleton>
  );
};

export default ListItem;
