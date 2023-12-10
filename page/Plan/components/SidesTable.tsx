'use client';

import { ActionIcon, Table } from '@mantine/core';
import { CiCircleRemove } from 'react-icons/ci';

const capitalizeString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

type SideRowProps = {
  name: string;
  index: number;
  removeSide: (index: number) => void;
};

const SideRow = ({ index, name, removeSide }: SideRowProps) => {
  const handleRemoveSide = () => removeSide(index);
  return (
    <Table.Tr key={name}>
      <Table.Td>{capitalizeString(name)}</Table.Td>
      <Table.Td>
        <ActionIcon color="red.4" onClick={handleRemoveSide} variant="transparent" radius="xl">
          <CiCircleRemove size={40} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  );
};

type SidesTableProps = {
  sides: { id: string; name: string }[];
  removeSide: (index: number) => void;
};

const SidesTable = ({ sides, removeSide }: SidesTableProps) => {
  const rows = sides.map((side, index) => (
    <SideRow {...side} key={side.id || index} index={index} removeSide={removeSide} />
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default SidesTable;
