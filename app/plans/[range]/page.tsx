import MealPlan from '@/pages/Plans';

const MealPlanContainer = async ({ params }) => {
  const { range } = params;

  return <MealPlan range={range} />;
};

export default MealPlanContainer;
