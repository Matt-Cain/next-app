import MealPlan from '@/pages/MealPlan';

const MealPlanContainer = async ({ params }) => {
  const { range } = params;

  return <MealPlan range={range} />;
};

export default MealPlanContainer;
