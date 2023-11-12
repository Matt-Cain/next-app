'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import usePlan from '@/hooks/usePlan';
import PlanCrudModal from '../PlanCrudModal';

import Container from '../Container';
import Plan from '../Plan';

const PlanItem = ({ planData, plans, title, index }) => {
  const { isPlaceholder, id } = planData || {};

  const [opened, handler] = useDisclosure();
  const plan = usePlan({ id, skip: true });
  const router = useRouter();
  const pathName = usePathname();

  const pathToPlan = `${pathName}/meal/${id}`;
  const showSkeleton = plans.loading && !plans.data;

  const goToPlan = () => router.push(pathToPlan);

  const handlePlanClick = () => {
    if (isPlaceholder || !id) handler.open();
  };

  return (
    <Container showSkeleton={showSkeleton} title={title} index={index} dnd={plans.dnd}>
      <Plan
        dnd={plans.dnd}
        handlePlanClick={handlePlanClick}
        index={index}
        pathToPlan={pathToPlan}
        planData={planData}
      />
      <PlanCrudModal
        goToPlan={goToPlan}
        handler={handler}
        opened={opened}
        plan={plan}
        planData={planData}
        refetchPlans={plans.refetch}
      />
    </Container>
  );
};

export default PlanItem;
