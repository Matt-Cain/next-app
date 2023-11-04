'use client';

import {
  ActionIcon,
  Button,
  Container,
  Fieldset,
  Flex,
  Group,
  SegmentedControl,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { IoMdAdd } from 'react-icons/io';
import Dialog from '@/components/Dialog';
import useCourse from '@/hooks/useCourse';
import AddIngredientModal from './components/AddIngredientModal';
import IngredientsTable from './components/IngredientsTable';
import useCourseForm from './hooks/useCourseForm';

const courseTypes = ['entree', 'side'];

const Course = ({ id }) => {
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

  const createOrUpdate = () => {
    if (id) {
      course.update(form.main.values);
    } else {
      course.create(form.main.values);
    }
    form.clear();
    router.push('/courses');
  };

  return (
    <Container fluid>
      <Fieldset legend="Course Info">
        <TextInput
          style={{ marginBottom: '15px', flex: 1 }}
          placeholder="Course Name"
          {...form.main.getInputProps('name')}
        />
        <Flex align="center" style={{ flex: 1, gap: '20px' }}>
          <SegmentedControl
            color="blue"
            data={courseTypes}
            {...form.main.getInputProps('type', { type: 'radio' })}
          />
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
