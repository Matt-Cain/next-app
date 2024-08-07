'use client';

import {
  ActionIcon,
  Button,
  Container,
  Grid,
  Fieldset,
  Flex,
  Group,
  SegmentedControl,
  Text,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { IoMdAdd } from 'react-icons/io';
import { IconArrowLeft } from '@tabler/icons-react';
import Dialog from '@/components/Dialog';
import useCourse from '@/hooks/useCourse';
import AddIngredientModal from './components/AddIngredientModal';
import IngredientsTable from './components/IngredientsTable';
import useCourseForm from './hooks/useCourseForm';
import Header from '@/components/Header';

type Ingredient = {
  id?: string;
  name: string;
  quantity: number;
  section: string;
  unit: string;
};

type UpdateProps = {
  id: string;
  type: string;
  name: string;
  recipe: string;
  ingredients: Ingredient[];
};

const courseTypes = ['entree', 'side'];

const Course = ({ id }: { id?: string }) => {
  const course = useCourse({ id });
  const router = useRouter();

  const [ingredientModalOpened, IngredientModalHandler] = useDisclosure(false);
  const [destructiveDialogOpened, destructiveDialogHandler] = useDisclosure(false);

  const form = useCourseForm({ course: course.data });

  const handleDestructiveAction = () => {
    if (id) course.remove();
    form.clear();
    destructiveDialogHandler.close();
    router.push('/courses');
  };

  const backToCourses = () => {
    router.push('/courses');
  };

  const createOrUpdate = () => {
    if (form.main.validate().hasErrors) return;
    const formId = form.main.values.id;

    if (formId && typeof formId === 'string') {
      course.update(form.main.values as UpdateProps);
    } else {
      course.create(form.main.values);
    }

    form.clear();
    backToCourses();
  };

  return (
    <Container fluid>
      <Flex style={{ marginTop: '10px', width: '100%' }} />
      <Header title={course.data ? 'Update Course' : 'Create Course'} />

      <Flex style={{ marginBottom: '15px', marginTop: '10px' }} align="center">
        <Button onClick={backToCourses} leftSection={<IconArrowLeft size={14} />}>
          Back to Courses
        </Button>
      </Flex>

      <Fieldset legend="Course Info">
        <TextInput
          style={{ marginBottom: '15px', flex: 1 }}
          placeholder="Course Name"
          {...form.main.getInputProps('name')}
        />
        <Flex align="center" style={{ flex: 1, gap: '20px' }}>
          <SegmentedControl color="blue" data={courseTypes} {...form.main.getInputProps('type')} />
          <TextInput
            style={{ flex: 1 }}
            placeholder="Recipe URL"
            {...form.main.getInputProps('recipe')}
          />
        </Flex>
      </Fieldset>
      <Fieldset legend="Ingredients" style={{ marginTop: '20px' }}>
        <IngredientsTable
          ingredients={form.main.values.ingredients}
          removeIngredient={form.removeIngredient}
        />
        {form.main.errors.ingredients && (
          <Text style={{ marginBottom: '15px' }} color="red" size="sm" variant="filled">
            {form.main.errors.ingredients}
          </Text>
        )}
        <ActionIcon
          mt={20}
          color="gray"
          onClick={IngredientModalHandler.open}
          variant="outline"
          radius="xl"
        >
          <IoMdAdd size={20} color="cyan" />
        </ActionIcon>
      </Fieldset>
      <Group>
        <Button onClick={createOrUpdate} mt={20}>
          {course.data ? 'Update Course' : 'Create Course'}
        </Button>
        <Button onClick={destructiveDialogHandler.open} variant="outline" mt={20} color="red">
          {course.data ? 'Delete Course' : 'Clear Course'}
        </Button>
      </Group>
      <AddIngredientModal
        addIngredient={form.addIngredient}
        opened={ingredientModalOpened}
        close={IngredientModalHandler.close}
      />
      <Dialog
        opened={destructiveDialogOpened}
        onClose={destructiveDialogHandler.close}
        onDestroy={handleDestructiveAction}
        title={course.data ? 'Delete the course' : 'Clear the course'}
        safeText="Keep Course"
        dangerText={course.data ? 'Delete Course' : 'Clear Course'}
      />
    </Container>
  );
};

export default Course;
