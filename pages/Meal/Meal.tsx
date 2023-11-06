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
  const router = useRouter();

  const [destructiveDialogOpened, destructiveDialogHandler] = useDisclosure(false);

  const form = useMealPlanForm({ mealPlan: mealPlan?.data?.meal });

  const hasMeal = mealPlan?.data?.meal;

  const handleDestructiveAction = () => {
    if (id) mealPlan.remove();
    form.clear();
    destructiveDialogHandler.close();
    router.push('/courses');
  };

  const createOrUpdate = () => {
    if (hasMeal) {
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
        <SidesTable
          sides={form.main.values.sides}
          removeSide={form.removeSide}
        />
        <AddCourse
          key={form.main.values.sides.length}
          addCourse={form.addSide}
          style={{ marginTop: '20px' }}
          type="side"
        />
      </Fieldset>
      <Group>
        <Button onClick={createOrUpdate} mt={20}>
          {hasMeal ? 'Update Meal' : 'Create Meal'}
        </Button>
        <Button onClick={destructiveDialogHandler.open} variant="outline" mt={20} color="red">
          {hasMeal ? 'Delete Meal' : 'Clear Meal'}
        </Button>
      </Group>
      <Dialog
        opened={destructiveDialogOpened}
        onClose={destructiveDialogHandler.close}
        onDestroy={handleDestructiveAction}
        title={hasMeal ? 'Delete the meal' : 'Clear the meal'}
        safeText="Keep Meal"
        dangerText={hasMeal ? 'Delete Meal' : 'Clear Meal'}
      />
    </Container>
  );
};

export default Meal;
