'use client';

import { ActionIcon, Table } from '@mantine/core';
import { CiCircleRemove } from 'react-icons/ci';

const capitalizeString = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const IngredientRow = ({ name, unit, quantity, index, removeIngredient }) => (
  <Table.Tr key={name}>
    <Table.Td>{capitalizeString(name)}</Table.Td>
    <Table.Td>{unit}</Table.Td>
    <Table.Td>{quantity}</Table.Td>
    <Table.Td>
      <ActionIcon
        color="red.4"
        onClick={() => removeIngredient(index)}
        variant="transparent"
        radius="xl"
      >
        <CiCircleRemove stroke={1.5} size={40} />
      </ActionIcon>
    </Table.Td>
  </Table.Tr>
);

const IngredientsTable = ({ ingredients, removeIngredient }) => {
  const rows = ingredients.map((ingredient, index) => (
    <IngredientRow
      {...ingredient}
      key={ingredient.id || index}
      index={index}
      removeIngredient={removeIngredient}
    />
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Unit</Table.Th>
          <Table.Th>Quantity</Table.Th>
          <Table.Th />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default IngredientsTable;
