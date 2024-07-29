'use client';

import { ActionIcon, Table } from '@mantine/core';
import { CiCircleRemove } from 'react-icons/ci';

enum SECTIONS {
  bakery = 'bakery',
  cheese_and_dips = 'cheese_and_dips',
  chips_and_bread = 'chips_and_bread',
  dairy = 'dairy',
  drinks = 'drinks',
  frozen = 'frozen',
  home = 'home',
  meat = 'meat',
  pantry = 'pantry',
  produce = 'produce',
}

export enum SECTION_LABELS {
  bakery = 'Bakery',
  cheese_and_dips = 'Cheese & dips',
  chips_and_bread = 'Chips & Bread',
  dairy = 'Dairy',
  drinks = 'Drinks',
  frozen = 'Frozen',
  home = 'Home',
  meat = 'Meat',
  pantry = 'Pantry',
  produce = 'Produce',
}

const capitalizeString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

type IngredientRowProps = {
  name: string;
  unit: string;
  quantity: string;
  section: SECTIONS;
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
    <Table.Td>{SECTION_LABELS[section]}</Table.Td>
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
