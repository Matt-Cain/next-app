'use client';

import { gql } from '@apollo/client';
import { useState } from 'react';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Skeleton, ActionIcon, Flex, Container } from '@mantine/core';
import { getCurrentMonthNumber, getWeeksInMonth, getMonthName } from '@/utils/dates';
import MealPlanItem from './components/MealPlanItem';

const mealPlansQuery = gql`
  query GetPlans($startDate: Date!, $endDate: Date!) {
    getPlans(startDate: $startDate, endDate: $endDate) {
      id
      startDate
      endDate
    }
  }
`;

const mapMealPlansToWeeks = (mealPlans, weeks) => {
  return weeks.map((week) => {
    const mealPlan = mealPlans.find((plan) => {
      if (!plan.startDate || !plan.endDate) return week;
      const startDate = new Date(plan.startDate).getTime();
      const endDate = new Date(plan.endDate).getTime();
      return startDate === week.startDate.getTime() || endDate === week.endDate.getTime();
    });

    return { ...week, mealPlan };
  });
};

const MealPlans = () => {
  const [month, setMonth] = useState(getCurrentMonthNumber());

  const monthName = getMonthName(month);

  const weeks = getWeeksInMonth(month);

  const { startDate } = weeks[0];
  const { endDate } = weeks[weeks.length - 1];

  const mealQuery = useQuery(mealPlansQuery, { variables: { startDate, endDate } });

  const mealPlans = mealQuery.data?.getPlans || [];

  const weeksWithMealPlans = mapMealPlansToWeeks(mealPlans, weeks);

  const nextMonth = () => {
    const newMonth = month === 11 ? 0 : month + 1;
    setMonth(newMonth);
  };

  const prevMonth = () => {
    const newMonth = month === 0 ? 11 : month - 1;
    setMonth(newMonth);
  };

  return (
    <Container fluid style={{ height: '100%' }}>
      <Flex align="center" direction="row" style={{ position: 'relative' }}>
        <h1 style={{ alignSelf: 'start' }}>Meal Plans</h1>
        <Flex
          align="center"
          justify="center"
          style={{ width: '100%', position: 'absolute', inset: 0 }}
        >
          <ActionIcon onClick={prevMonth} variant="transparent" aria-label="Settings">
            <AiOutlineDoubleLeft style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
          <h1 style={{ width: '200px', textAlign: 'center' }}>{monthName}</h1>
          <ActionIcon onClick={nextMonth} variant="transparent" aria-label="Settings">
            <AiOutlineDoubleRight style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Flex>
      </Flex>
      {weeksWithMealPlans.map((data) => (
        <Skeleton key={data.startDate} visible={mealQuery.loading} height="91" mt="20">
          <MealPlanItem data={data} handleAddItem={mealQuery.refetch} />
        </Skeleton>
      ))}
    </Container>
  );
};

export default MealPlans;
