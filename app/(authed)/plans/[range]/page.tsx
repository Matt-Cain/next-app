'use client';

import MealPlan from '@/page/Plans';

type Props = {
  params: {
    range: string;
  };
};

const MealPlanContainer = ({ params }: Props) => {
  const { range } = params;

  return <MealPlan range={range} />;
};

export default MealPlanContainer;
