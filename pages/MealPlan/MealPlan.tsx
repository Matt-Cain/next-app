'use client';

import { gql } from '@apollo/client';
import { Container } from '@mantine/core';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import List from '@/pages/MealPlan/components/List';

const getPlanQuery = gql`
  query GetPlan($id: ID!) {
    getPlan(id: $id) {
      id
      startDate
      endDate
      mealPlans {
        id
        day
        placeholder
        meal {
          id
          name
        }
      }
    }
  }
`;

const MealPlan = ({ planId }) => {
  const planQuery = useQuery(getPlanQuery, { variables: { id: planId } });

  const mealPlans = planQuery.data?.getPlan?.mealPlans || [];

  return (
    <Container style={{ height: '100%' }}>
      <List planId={planId} loading={planQuery.loading} mealPlans={mealPlans} />
    </Container>
  );
};

export default MealPlan;
