'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { gql } from '@apollo/client';
import { useInputState, useMediaQuery } from '@mantine/hooks';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Button, SegmentedControl, Flex, Container, TextInput, Table } from '@mantine/core';
import Header from '@/components/Header';

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

type Course = {
  id: string;
  type: string;
  name: string;
  recipe: string;
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
  }[];
};

const filteredCourses = (courses: Course[], search: string, type: string) => {
  return courses.filter((course) => {
    const nameMatch = search ? course.name.toLowerCase().includes(search.toLowerCase()) : true;
    const typeMatch = course.type === type;

    return nameMatch && typeMatch;
  });
};

const Courses = () => {
  const [search, setSearch] = useInputState('');
  const [type, setType] = useInputState('entree');
  const router = useRouter();

  const handleAddMealClick = () => router.push('/courses/create');

  const { data, refetch } = useQuery(getCoursesQuery);

  useEffect(() => {
    refetch();
  }, []);

  const courses = filteredCourses(data?.getCourses || [], search, type);

  const handleCourseClick = (id: string) => () => router.push(`/courses/${id}`);

  const rows = courses.map(({ name, id }) => (
    <Table.Tr key={id} onClick={handleCourseClick(id)} style={{ cursor: 'pointer' }}>
      <Table.Td>{name}</Table.Td>
    </Table.Tr>
  ));

  const mediaQuery = useMediaQuery('(max-width: 767px)');
  const isMobile = Boolean(mediaQuery);
  const flexDirection = isMobile ? 'column' : 'row';

  return (
    <Container p="15" fluid>
      <Header styles={{ mb: 10 }} title="Courses" />
      <Flex direction={flexDirection} gap="md">
        <SegmentedControl color="blue" data={courseTypes} value={type} onChange={setType} />
        <TextInput value={search} onChange={setSearch} style={{ flex: 1 }} placeholder="Search" />
        <Button onClick={handleAddMealClick}>Add new course</Button>
      </Flex>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Container>
  );
};

export default Courses;
