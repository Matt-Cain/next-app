'use client';

import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { Skeleton, Flex, Text, Fieldset, ThemeIcon } from '@mantine/core';
import { RiDraggable } from 'react-icons/ri';
import { usePathname, useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import AddMealModal from '../AddMealModal';

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
  mutation CreateMealPlan($planId: ID!, $day: Int!, $placeholder: String) {
    createMealPlan(planId: $planId, day: $day, placeholder: $placeholder) {
      id
      day
      placeholder
    }
  }
`;

const ListItem = ({ title, day, mealPlan, loading, planId }) => {
  const [opened, handler] = useDisclosure();
  const [callMutation] = useMutation(createMealPlanMutation);
  const pathName = usePathname();
  console.log({ mealPlan });

  const { name, id } = mealPlan || {};
  const pathToMeal = `${pathName}/meal/${id}`;

  const createMeal = ({ placeholder }) => {
    console.log('placeholder', placeholder);
    callMutation({ variables: { planId, day, placeholder } });
  };

  return (
    <Skeleton visible={loading} style={{ height: '100%', width: '100%', flex: 1 }}>
      <AddMealModal createMeal={createMeal} opened={opened} handler={handler} />
      <Fieldset
        style={{ width: '100%', height: '100%', flex: 1 }}
        legend={title}
        variant="filled"
        shadow="xs"
        p="0"
        pl="md"
        pr="sm"
      >
        {mealPlan ? (
          <Link
            disable={!mealPlan}
            href={pathToMeal}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Item name={mealPlan?.meal?.name || mealPlan?.placeholder} />
          </Link>
        ) : (
          <Item handleCreateItem={handler.open} />
        )}
      </Fieldset>
    </Skeleton>
  );
};

export default ListItem;
