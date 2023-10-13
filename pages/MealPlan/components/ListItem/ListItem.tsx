'use client';

import Link from 'next/link';
import { Flex, Text, Fieldset, ThemeIcon } from '@mantine/core';
import { RiDraggable } from 'react-icons/ri';
import { usePathname } from 'next/navigation';

const ListItem = ({ day, meal }) => {
  const { name, id } = meal || {};

  const pathName = usePathname();

  const pathToMeal = `${pathName}/meal/${id}`;

  return (
    <Fieldset
      key={day}
      style={{ width: '100%', flex: 1 }}
      legend={day}
      variant="filled"
      shadow="xs"
      p="0"
      pl="md"
      pr="sm"
    >
      <Link href={pathToMeal} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Flex
          draggable="true"
          justify="space-between"
          align="center"
          style={{ height: '100%', marginTop: '-4px' }}
        >
          <Text>{name}</Text>
          <ThemeIcon color="gray" size="sm" variant="transparent">
            <RiDraggable />
          </ThemeIcon>
        </Flex>
      </Link>
    </Fieldset>
  );
};

export default ListItem;
