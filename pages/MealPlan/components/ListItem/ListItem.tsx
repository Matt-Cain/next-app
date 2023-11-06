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

const createPlanMutation = gql`
  mutation CreatePlan($timestamp: Date!, $placeholder: String) {
    createPlan(timestamp: $timestamp, placeholder: $placeholder) {
      id
      timestamp
      placeholder
    }
  }
`;

const ListItem = ({ plan, title, loading }) => {
  const { placeholder, id, meal, timestamp } = plan || {};

  const router = useRouter();
  const [opened, handler] = useDisclosure();
  const pathName = usePathname();

  const [callMutation] = useMutation(createPlanMutation, {
    onCompleted: ({ createPlan }) => {
      const { id: newId, placeholder: newPlaceholder } = createPlan;

      if (newPlaceholder) return;
      router.push(`${pathName}/meal/${newId}`);
    },
  });

  const pathToMeal = `${pathName}/meal/${id}`;

  const createMeal = ({ placeholder: newPlaceholder }) => {
    callMutation({ variables: { timestamp: new Date(timestamp), placeholder: newPlaceholder } });
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
        {id ? (
          <Link
            disable={!plan}
            href={pathToMeal}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Item name={meal?.name || placeholder} />
          </Link>
        ) : (
          <Item handleCreateItem={handler.open} />
        )}
      </Fieldset>
    </Skeleton>
  );
};

export default ListItem;
