'use client';

import { useEffect } from 'react';
import { Button, Container, Fieldset, Group, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';

import Dialog from '@/components/Dialog';
import usePlan from '@/hooks/usePlan/usePlan';
import AddCourse from './components/AddCourse';
import SidesTable from './components/SidesTable';
import useMealPlanForm from './hooks/usePlanForm';
import Header from '@/components/Header';

type PlanProps = {
  id: string;
  range: string;
};

const Plan = ({ id, range }: PlanProps) => {
  const [deleteModelOpened, deleteModalHandler] = useDisclosure(false);

  const plan = usePlan({ id });

  useEffect(() => {
    plan.refetch();
  }, []);

  const router = useRouter();

  const form = useMealPlanForm({ plan: plan?.data });

  const handleDeletePlan = () => {
    plan.remove();
    form.clear();
    deleteModalHandler.close();
    router.push(`/plans/${range}`);
  };

  const handleUpdatePlan = async () => {
    const success = await plan.update(form.main.values);
    if (success) router.push(`/plans/${range}`);
  };

  return (
    <Container fluid>
      <Header styles={{ mt: '5' }} title="Plan" />
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
          addCourse={form.addEntree}
          type="entree"
        />
      </Fieldset>
      <Fieldset legend="Sides" style={{ marginTop: '20px' }}>
        <SidesTable sides={form.main.values.sides} removeSide={form.removeSide} />
        <AddCourse
          key={form.main.values.sides.length}
          addCourse={form.addSide}
          style={{ marginTop: '20px' }}
          type="side"
        />
      </Fieldset>
      <Group>
        <Button onClick={handleUpdatePlan} mt={20}>
          Update Plan
        </Button>
        <Button onClick={deleteModalHandler.open} variant="outline" mt={20} color="red">
          Delete Plan
        </Button>
      </Group>
      <Dialog
        opened={deleteModelOpened}
        onClose={deleteModalHandler.close}
        onDestroy={handleDeletePlan}
        title="Delete the plan"
        safeText="Keep Plan"
        dangerText="Delete Plan"
      />
    </Container>
  );
};

export default Plan;
