'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { gql } from '@apollo/client';
import { useInputState } from '@mantine/hooks';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import {
  ActionIcon,
  Button,
  SegmentedControl,
  Group,
  Container,
  TextInput,
  Table,
} from '@mantine/core';
import { CiCircleRemove } from 'react-icons/ci';

const courseTypes = ['entree', 'side'];

const getCoursesQuery = gql`
  query GetCourses {
    getCourses {
      id
      type
      name
      recipe
      ingredients {
        name
        quantity
        unit
      }
    }
  }
`;

const Meals = () => {
  const [search, setSearch] = useInputState('');
  const [type, setType] = useInputState('entree');
  const router = useRouter();

  // TODO: make this a next/link
  const handleAddMealClick = () => router.push('/courses/create');

  const { data, loading } = useQuery(getCoursesQuery);

  const courses = data?.getCourses || [];

  const filteredCourses = courses.filter((course) => {
    const nameMatch = search ? course.name.toLowerCase().includes(search.toLowerCase()) : true;
    const typeMatch = course.type === type;

    return nameMatch && typeMatch;
  });

  const rows = filteredCourses.map(({ name, id }) => (
    <Table.Tr key={id} onClick={() => router.push(`/courses/${id}`)} style={{ cursor: 'pointer' }}>
      <Table.Td>{name}</Table.Td>
      <Table.Td>
        <ActionIcon
          color="red.4"
          // onClick={() => removeIngredient(index)}
          variant="transparent"
          radius="xl"
        >
          <CiCircleRemove stroke={1.5} size={40} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container fluid>
      <Group>
        <SegmentedControl color="blue" data={courseTypes} value={type} onChange={setType} />
        <TextInput value={search} onChange={setSearch} style={{ flex: 1 }} placeholder="Search" />
        <Button onClick={handleAddMealClick}>Add new course</Button>
      </Group>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Container>
  );
};

export default Meals;
