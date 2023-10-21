import MealPlan from '@/pages/MealPlan';

const MealPlanContainer = async ({ params }) => {
  const { planId } = params;

  return <MealPlan planId={planId} />;
};

export default MealPlanContainer;
