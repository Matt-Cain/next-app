'use client';

import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { Group, Skeleton, Flex, Text, Fieldset, ThemeIcon } from '@mantine/core';
import { RiDraggable } from 'react-icons/ri';
import { usePathname, useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import PlanCrudModal from '../PlanCrudModal';

const Item = ({ name, handleCreateItem, index, dnd }) => {
  const handlePointerDown = (e) => {
    e.stopPropagation();
    dnd.canDrag(true);
  };

  return (
    <Flex
      onPointerDown={handleCreateItem}
      justify="space-between"
      align="center"
      style={{ height: '100%', marginTop: '-4px', cursor: 'pointer' }}
    >
      <Group
        data-index={index}
        draggable={dnd.canDrag()}
        onDragStart={dnd.onDragStart}
        onDragEnd={dnd.onDragEnd}
        justify="space-between"
        style={{ display: 'flex', flex: 1 }}
        radius="md"
        p="sm"
      >
        <Text>{name}</Text>
        {name && (
          <ThemeIcon color="gray" size="sm" variant="transparent">
            <RiDraggable onPointerDown={handlePointerDown} />
          </ThemeIcon>
        )}
      </Group>
    </Flex>
  );
};

const createPlanMutation = gql`
  mutation CreatePlan($timestamp: Date!, $name: String, $isPlaceholder: Boolean) {
    createPlan(timestamp: $timestamp, name: $name, isPlaceholder: $isPlaceholder)
  }
`;

const updatePlanMutation = gql`
  mutation UpdatePlan($id: ID!, $placeholder: String) {
    updatePlan(id: $id, placeholder: $placeholder)
  }
`;

const ListItem = ({ plan, plans, title, index, dnd }) => {
  const { isPlaceholder, id, name, timestamp } = plan || {};

  const router = useRouter();
  const [opened, handler] = useDisclosure();
  const pathName = usePathname();

  const [callCreateMutation] = useMutation(createPlanMutation, {
    onCompleted: ({ createPlan }) => {
      const { id: newId, placeholder: newPlaceholder } = createPlan;

      if (newPlaceholder) return;
      router.push(`${pathName}/meal/${newId}`);
    },
  });

  const [callUpdateMutation] = useMutation(updatePlanMutation, {
    onCompleted: ({ updatePlan }) => {
      if (updatePlan) plans.refetch();
    },
  });

  const pathToMeal = `${pathName}/meal/${id}`;

  const mutateMeal = ({ isPlaceholder: newIsPlaceholder, name: newName }) => {
    if (id) {
      callUpdateMutation({
        variables: { id, placeholder: newPlaceholder },
      });
    } else {
      callCreateMutation({
        variables: {
          timestamp: new Date(timestamp),
          isPlaceholder: newIsPlaceholder,
          name: newName,
        },
      });
    }
  };

  return (
    <Skeleton visible={plans.loading} style={{ height: '100%', width: '100%', flex: 1 }}>
      <PlanCrudModal
        isPlaceholder={isPlaceholder}
        mutateMeal={mutateMeal}
        opened={opened}
        handler={handler}
      />
      <Fieldset
        style={{ width: '100%', height: '100%', flex: 1 }}
        data-index={index}
        legend={title}
        onDragOver={dnd.onDragOver}
        onDrop={dnd.onDrop}
        p="0"
        pl="md"
        pr="sm"
        shadow="xs"
        variant="filled"
        className="dropzone"
      >
        {id ? (
          <Link
            draggable={false}
            disable={!plan}
            href={pathToMeal}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Item index={index} name={name} dnd={dnd} />
          </Link>
        ) : (
          <Item index={index} name={name} handleCreateItem={handler.open} dnd={dnd} />
        )}
      </Fieldset>
    </Skeleton>
  );
};

export default ListItem;
