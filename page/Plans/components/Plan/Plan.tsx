import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Group, Flex, Text, ThemeIcon } from '@mantine/core';
import { RiDraggable } from 'react-icons/ri';

type PlanProps = {
  dnd: any;
  handlePlanClick: any;
  index: number;
  planData: any;
};

const Plan = ({ dnd, handlePlanClick, index, planData }: PlanProps) => {
  const { id, isPlaceholder, name } = planData || {};
  const pathName = usePathname();

  const pathToPlan = `${pathName}/meal/${id}`;

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    dnd.canDrag(true);
  };

  const linkToPlan = id && !isPlaceholder ? pathToPlan : '';

  return (
    <Link draggable={false} href={linkToPlan} style={{ textDecoration: 'none', color: 'inherit' }}>
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
