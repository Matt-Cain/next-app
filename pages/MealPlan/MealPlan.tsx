'use client';

import { Container } from '@mantine/core';
import List from '@/pages/MealPlan/components/List';

const MealPlan = ({ planId }) => {
  const mealQuery = useQuery(mealPlansQuery, { variables: { startDate, endDate } });

  return (
    <Container style={{ height: '100%' }}>
      <List meals={meals} />
    </Container>
  );
};

export default MealPlan;
