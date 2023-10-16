import MealPlan from '@/pages/MealPlan';

const MealPlanContainer = async ({ params }) => {
  const planId = params['meal-plan-id'];

  return <MealPlan planId={planId} />;
};

export default MealPlanContainer;
