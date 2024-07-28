'use client';

import { ActionIcon, Table } from '@mantine/core';
import { CiCircleRemove } from 'react-icons/ci';

const capitalizeString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

type IngredientRowProps = {
  name: string;
  unit: string;
  quantity: string;
  section: string;
  index: number;
  removeIngredient: (index: number) => void;
};

const IngredientRow = ({
  name,
  unit,
  quantity,
  section,
  index,
  removeIngredient,
}: IngredientRowProps) => (
  <Table.Tr key={name}>
    <Table.Td>{capitalizeString(name)}</Table.Td>
    <Table.Td>{unit}</Table.Td>
    <Table.Td>{quantity}</Table.Td>
    <Table.Td>{section}</Table.Td>
    <Table.Td>
      <ActionIcon
        color="red.4"
        onClick={() => removeIngredient(index)}
        variant="transparent"
        radius="xl"
      >
        <CiCircleRemove size={40} />
      </ActionIcon>
    </Table.Td>
  </Table.Tr>
);

type IngredientsTableProps = {
  ingredients: any[];
  removeIngredient: (index: number) => void;
};

const IngredientsTable = ({ ingredients, removeIngredient }: IngredientsTableProps) => {
  const rows = (ingredients || []).map((ingredient, index) => (
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
          <Table.Th>Section</Table.Th>
          <Table.Th />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default IngredientsTable;
