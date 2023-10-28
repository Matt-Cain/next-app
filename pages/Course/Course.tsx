'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  ActionIcon,
  Container,
  Button,
  Group,
  TextInput,
  Flex,
  SegmentedControl,
  Fieldset,
  Text,
  Table,
  Modal,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { IoMdAdd } from 'react-icons/io';
import { CiCircleRemove } from 'react-icons/ci';
import AddIngredientModal from './components/AddIngredientModal';
import useFormStorage from '@/hooks/useFormStorage';
import useCourse from '@/hooks/useCourse';

const courseTypes = ['entree', 'side'];
const STORAGE_KEY = 'course-form';

const defaultCourse = { name: '', ingredients: [], recipe: '', type: courseTypes[0] };

const maybeClearTypeNames = (course, shouldClear) => {
  if (!shouldClear) return course;

  const newIngredients = course.ingredients.map((ingredient) => {
    const { __typename, ...rest } = ingredient;
    return rest;
  });

  return { ...course, ingredients: newIngredients };
};

const Course = ({ course }) => {
  const router = useRouter();
  const [ingredientModalOpened, IngredientModalHandler] = useDisclosure(false);
  const [clearCourseDialogOpened, clearCourseDialogHandler] = useDisclosure(false);
  const form = useForm({
    initialValues: course || defaultCourse,
    validate: {
      name: (value) => (value.trim().length < 1 ? 'Name is required' : null),
      ingredients: (value) => (value.length < 1 ? 'Must have at least one ingredient' : null),
    },
  });

  const clearStorage = useFormStorage({ form, key: STORAGE_KEY, disable: course });

  useEffect(() => {
    if (course) {
      form.setValues(course);
    }
  }, [course]);

  const callCreateOrUpdateMutation = course ? updateCourseMutation : createCourseMutation;
  const [callCreateOrUpdate] = useMutation(callCreateOrUpdateMutation, {
    variables: maybeClearTypeNames(form.values, course),
    // onCompleted: (data) => {
    //   console.log({ data });
    // },
  });

  const addIngredient = (ingredient) => {
    form.setFieldValue('ingredients', [...form.values.ingredients, ingredient]);
  };

  const removeIngredient = (index) => {
    const newIngredients = form.values.ingredients.filter((_, i) => i !== index);
    form.setFieldValue('ingredients', newIngredients);
  };

  const clearCourse = () => {
    form.reset();
    clearStorage();
    clearCourseDialogHandler.close();
  };

  const createOrUpdate = () => {
    callCreateOrUpdate();
    clearCourse();
    router.push('/courses');
  };

  const rows = form.values.ingredients.map(({ name, unit, quantity }, index) => (
    <Table.Tr key={name}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{name}</Table.Td>
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
  ));

  return (
    <Container fluid>
      <AddIngredientModal
        addIngredient={addIngredient}
        opened={ingredientModalOpened}
        close={IngredientModalHandler.close}
      />
      <Modal
        withCloseButton={false}
        opened={clearCourseDialogOpened}
        onClose={clearCourseDialogHandler.close}
        size="xs"
        radius="md"
        centered
      >
        <Flex justify="center" align="center" direction="column">
          <Text size="md" mb="xs" fw={500}>
            Clear the course?
          </Text>
          <Group justify="center" style={{ flexShrink: 0 }}>
            <Button onClick={clearCourseDialogHandler.close} mt={10}>
              Keep Course
            </Button>
            <Button onClick={clearCourse} variant="outline" mt={10} color="red">
              Clear Course
            </Button>
          </Group>
        </Flex>
      </Modal>
      <Fieldset legend="Course Info">
        <TextInput
          style={{ marginBottom: '15px', flex: 1 }}
          placeholder="Course Name"
          {...form.getInputProps('name')}
        />
        <Flex align="center" style={{ flex: 1, gap: '20px' }}>
          <SegmentedControl
            color="blue"
            data={courseTypes}
            {...form.getInputProps('type', { type: 'radio' })}
          />
          <TextInput
            style={{ flex: 1 }}
            placeholder="Recipe URL"
            {...form.getInputProps('recipe')}
          />
        </Flex>
      </Fieldset>
      <Fieldset legend="Ingredients" style={{ marginTop: '20px' }}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th />
              <Table.Th>Name</Table.Th>
              <Table.Th>Unit</Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <ActionIcon
          mt={20}
          color="gray"
          onClick={IngredientModalHandler.open}
          variant="outline"
          radius="xl"
        >
          <IoMdAdd stroke={1.5} size={20} color="cyan" />
        </ActionIcon>
      </Fieldset>
      <Group>
        <Button onClick={createOrUpdate} mt={20}>
          {course ? 'Update Course' : 'Create Course'}
        </Button>
        <Button onClick={clearCourseDialogHandler.open} variant="outline" mt={20} color="red">
          {course ? 'Delete Course' : 'Clear Course'}
        </Button>
      </Group>
    </Container>
  );
};

export default Course;
