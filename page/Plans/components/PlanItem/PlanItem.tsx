'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import usePlan from '@/hooks/usePlan';
import PlanCrudModal from '../PlanCrudModal';

import Container from '../Container';
import Plan from '../Plan';

type PlanItemProps = {
  planData: any;
  plans: any;
  title: string;
  index: number;
};

const PlanItem = ({ planData, plans, title, index }: PlanItemProps) => {
  const { isPlaceholder, id } = planData || {};

  const [modalOpened, modalHandler] = useDisclosure();
  const plan = usePlan({ id, skip: true });
  const router = useRouter();
  const pathName = usePathname();

  const showSkeleton = plans.loading && !plans.data;

  const goToPlan = (newPlan: any) => {
    const planId = newPlan ? newPlan.id : id;
    if (!planId) return;
    router.push(`${pathName}/meal/${planId}`);
  };

  const handlePlanClick = () => {
    if (isPlaceholder || !id) modalHandler.open();
  };

  return (
    <Container showSkeleton={showSkeleton} title={title} index={index} dnd={plans.dnd}>
      <Plan
        dnd={plans.dnd}
        handlePlanClick={handlePlanClick}
        index={index}
        planData={planData}
      />
      <PlanCrudModal
        goToPlan={goToPlan}
        handler={modalHandler}
        opened={modalOpened}
        plan={plan}
        planData={planData}
        refetchPlans={plans.refetch}
      />
    </Container>
  );
};

export default PlanItem;
