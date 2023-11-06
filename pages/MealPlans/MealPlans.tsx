'use client';

import { useState } from 'react';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { ActionIcon, Center, Container } from '@mantine/core';
import {
  getCurrentMonthNumber,
  getCurrentYearNumber,
  getWeeksInMonth,
  getMonthName,
} from '@/utils/dates';
import MealPlanItem from './components/MealPlanItem';

const MealPlans = () => {
  const [month, setMonth] = useState(getCurrentMonthNumber());
  const [year, setYear] = useState(getCurrentYearNumber());

  const monthName = getMonthName(month);

  const weeks = getWeeksInMonth(month, year);

  const nextMonth = () => {
    const newMonth = month === 11 ? 0 : month + 1;
    setMonth(newMonth);

    if (newMonth === 0) {
      setYear(year + 1);
    }
  };

  const prevMonth = () => {
    const newMonth = month === 0 ? 11 : month - 1;
    setMonth(newMonth);

    if (newMonth === 11) {
      setYear(year - 1);
    }
  };

  return (
    <Container fluid style={{ height: '100%' }}>
      <Center align="center" style={{ height: '50px' }}>
        <ActionIcon onClick={prevMonth} variant="transparent" aria-label="Settings">
          <AiOutlineDoubleLeft style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
        <h1 style={{ width: '200px', textAlign: 'center' }}>{monthName}</h1>
        <ActionIcon onClick={nextMonth} variant="transparent" aria-label="Settings">
          <AiOutlineDoubleRight style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Center>
      {weeks.map((data) => (
        <MealPlanItem key={data.startDate.toString()} data={data} />
      ))}
    </Container>
  );
};

export default MealPlans;
