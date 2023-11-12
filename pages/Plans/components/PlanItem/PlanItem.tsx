'use client';

import Link from 'next/link';
import { Group, Skeleton, Flex, Text, Fieldset, ThemeIcon } from '@mantine/core';
import { RiDraggable } from 'react-icons/ri';
import { usePathname, useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import PlanCrudModal from '../PlanCrudModal';
import usePlan from '@/hooks/usePlan';

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

const PlanItem = ({ plan: planData, plans, title, index, dnd }) => {
  const { isPlaceholder, id, name, timestamp } = planData || {};
  const plan = usePlan({ id, skip: true });

  const router = useRouter();

  const [opened, handler] = useDisclosure();

  const pathName = usePathname();
  const pathToMeal = `${pathName}/meal/${id}`;

  const goToPlan = () => router.push(pathToMeal);

  return (
    <Skeleton
      visible={plans.loading && !plans.data}
      style={{ height: '100%', width: '100%', flex: 1 }}
    >
      <PlanCrudModal
        id={id}
        isPlaceholder={isPlaceholder}
        plan={plan}
        timestamp={timestamp}
        opened={opened}
        handler={handler}
        goToPlan={goToPlan}
        refetchPlans={plans.refetch}
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
        {id && !isPlaceholder ? (
          <Link
            draggable={false}
            disable={!planData}
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

export default PlanItem;
