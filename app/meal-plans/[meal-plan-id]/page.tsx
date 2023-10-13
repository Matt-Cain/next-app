import { gql } from '@apollo/client';
import { getClient } from '@/utils/ApolloClient';
import MealPlan from '@/pages/MealPlan';

const mealPlansQuery = gql`
  query Query($mealPlanId: ID!) {
    mealPlan(id: $mealPlanId) {
      id
      range
      meals {
        id
        name
        day
      }
    }
  }
`;

const MealPlanContainer = async ({ params }) => {
  const mealId = params['meal-plan-id'];

  const { data } = await getClient().query({
    query: mealPlansQuery,
    variables: { mealPlanId: mealId },
  });

  const { mealPlan } = data;

  return <MealPlan plan={mealPlan} />;
};

export default MealPlanContainer;
