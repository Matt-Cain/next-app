import Link from 'next/link';
import { Group, Flex, Text, ThemeIcon } from '@mantine/core';
import { RiDraggable } from 'react-icons/ri';

const Plan = ({ dnd, handlePlanClick, index, pathToPlan, planData }) => {
  const { id, isPlaceholder, name } = planData || {};

  const handlePointerDown = (e) => {
    e.stopPropagation();
    dnd.canDrag(true);
  };

  return (
    <Link
      draggable={false}
      disable={!id || isPlaceholder}
      href={pathToPlan}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Flex
        onPointerDown={handlePlanClick}
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
          {name && (
            <>
              <Text>{name}</Text>
              <ThemeIcon color="gray" size="sm" variant="transparent">
                <RiDraggable onPointerDown={handlePointerDown} />
              </ThemeIcon>
            </>
          )}
        </Group>
      </Flex>
    </Link>
  );
};

export default Plan;
