'use client';

import { gql } from '@apollo/client';
import { Container } from '@mantine/core';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import List from '@/pages/MealPlan/components/List';

const planQuery = gql`
  query GetPlan($id: ID!) {
    getPlan(id: $id) {
      id
      startDate
      endDate
      meals {
        id
        day
        meal {
          id
          name
        }
      }
    }
  }
`;

const MealPlan = ({ planId }) => {
  const mealQuery = useQuery(planQuery, { variables: { id: planId } });

  const meals = mealQuery.data?.getPlan?.meals || [];

  return (
    <Container style={{ height: '100%' }}>
      <List planId={planId} loading={mealQuery.loading} meals={meals} />
    </Container>
  );
};

export default MealPlan;
