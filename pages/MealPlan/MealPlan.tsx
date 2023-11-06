'use client';

import { gql } from '@apollo/client';
import { Container } from '@mantine/core';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import List from '@/pages/MealPlan/components/List';
import { getWeekTimestamps } from '@/utils/dates';

const getPlansQuery = gql`
  query GetPlans($startDate: Date!, $endDate: Date!) {
    getPlans(startDate: $startDate, endDate: $endDate) {
      id
      timestamp
      meal {
        id
        name
      }
      placeholder
    }
  }
`;

const MealPlan = ({ range, planId }) => {
  const [startDate, endDate] = range.split('-');
  const timestamps = getWeekTimestamps({ startDate, endDate });

  const planQuery = useQuery(getPlansQuery, {
    variables: {
      startDate: new Date(Number(startDate)),
      endDate: new Date(Number(endDate)),
    },
  });

  const plans = planQuery.data?.getPlans || [];

  return (
    <Container style={{ height: '100%' }}>
      <List timestamps={timestamps} planId={planId} loading={planQuery.loading} plans={plans} />
    </Container>
  );
};

export default MealPlan;
