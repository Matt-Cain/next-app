'use client';

import { Button, Container, Fieldset, Group, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import Dialog from '@/components/Dialog';
import useMealPlan from '@/hooks/useMealPlan';
import AddCourse from './components/AddCourse';
import SidesTable from './components/SidesTable';
import useMealPlanForm from './hooks/useMealPlanForm';

const Meal = ({ id }) => {
  const mealPlan = useMealPlan({ id });
  console.log({ mealPlan });
  const router = useRouter();

  const [destructiveDialogOpened, destructiveDialogHandler] = useDisclosure(false);

  const form = useMealPlanForm({ mealPlan: mealPlan?.data?.meal });
  console.log({ values: form.main.values });

  const handleDestructiveAction = () => {
    if (id) mealPlan.remove();
    form.clear();
    destructiveDialogHandler.close();
    router.push('/courses');
  };

  const createOrUpdate = () => {
    if (mealPlan?.data?.meal) {
      mealPlan.update(form.main.values);
    } else {
      mealPlan.create(form.main.values);
    }
    // form.clear();
    // router.push('/courses');
  };

  return (
    <Container fluid>
      <Fieldset legend="Meal Name">
        <TextInput
          style={{ flex: 1 }}
          placeholder="Meal Name"
          {...form.main.getInputProps('name')}
        />
      </Fieldset>
      <Fieldset legend="Entree" style={{ marginTop: '20px' }}>
        <AddCourse
          formProps={form.main.getInputProps('entree')}
          persist
          addCourse={form.addEntree}
          type="entree"
        />
      </Fieldset>
      <Fieldset legend="Sides" style={{ marginTop: '20px' }}>
        <SidesTable sides={form.main.values.sides} removeSide={form.removeSide} />
        <AddCourse
          key={form.main.values.sides.length}
          style={{ marginTop: '20px' }}
          addCourse={form.addSide}
          type="side"
        />
      </Fieldset>
      <Group>
        <Button onClick={createOrUpdate} mt={20}>
          {mealPlan.data ? 'Update Course' : 'Create Course'}
        </Button>
        <Button onClick={destructiveDialogHandler.open} variant="outline" mt={20} color="red">
          {mealPlan.data ? 'Delete Course' : 'Clear Course'}
        </Button>
      </Group>
      <Dialog
        opened={destructiveDialogOpened}
        onClose={destructiveDialogHandler.close}
        onDestroy={handleDestructiveAction}
        title={mealPlan.data ? 'Delete the course' : 'Clear the course'}
        safeText="Keep Course"
        dangerText={mealPlan.data ? 'Delete Course' : 'Clear Course'}
      />
    </Container>
  );
};

export default Meal;
