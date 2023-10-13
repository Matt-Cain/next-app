'use client';

import { Container } from '@mantine/core';
import List from '@/pages/MealPlan/components/List';

const MealPlan = ({ plan: { meals } }) => (
    <Container style={{ height: '100%' }}>
      <List meals={meals} />
    </Container>
);

export default MealPlan;
