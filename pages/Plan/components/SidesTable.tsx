'use client';

import { ActionIcon, Table } from '@mantine/core';
import { CiCircleRemove } from 'react-icons/ci';

const capitalizeString = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const SideRow = ({ name, removeSide, index }) => {
  const handleRemoveSide = () => removeSide(index);
  return (
    <Table.Tr key={name}>
      <Table.Td>{capitalizeString(name)}</Table.Td>
      <Table.Td>
        <ActionIcon color="red.4" onClick={handleRemoveSide} variant="transparent" radius="xl">
          <CiCircleRemove stroke={1.5} size={40} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  );
};

const SidesTable = ({ sides, removeSide }) => {
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
