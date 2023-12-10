'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import {
  ActionIcon,
  Divider,
  Center,
  Container,
  SegmentedControl,
  ScrollArea,
} from '@mantine/core';
import {
  getCurrentMonthNumber,
  getCurrentYearNumber,
  getWeeksInMonth,
  getMonthName,
} from '@/utils/dates';
import PlanItem from './components/Item';

const types = ['plans', 'shopping', 'inventory'];

type FinderProps = {
  route?: string;
};

const Finder = ({ route }: FinderProps) => {
  const [month, setMonth] = useState(getCurrentMonthNumber());
  const [year, setYear] = useState(getCurrentYearNumber());
  const router = useRouter();

  const type = route || types[0];

  const handleTypeChange = (value: string) => {
    router.push(value);
  };

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
    <Container pl="15" pr="15" fluid style={{ height: '100%' }}>
      <Center style={{ height: '50px' }}>
        <ActionIcon onClick={prevMonth} variant="transparent" aria-label="Settings">
          <AiOutlineDoubleLeft style={{ width: '70%', height: '70%' }} />
        </ActionIcon>

        <h1 style={{ width: '200px', textAlign: 'center' }}>{monthName}</h1>

        <ActionIcon onClick={nextMonth} variant="transparent" aria-label="Settings">
          <AiOutlineDoubleRight style={{ width: '70%', height: '70%' }} />
        </ActionIcon>
      </Center>
      <SegmentedControl
        fullWidth
        value={type}
        onChange={handleTypeChange}
        data={types}
        transitionDuration={0}
      />
      <Divider mt="10" />

      <ScrollArea style={{ height: 'calc(100% - 100px)' }}>
        {weeks.map((data) => (
          <PlanItem key={data.startDate.toString()} data={data} route={type} />
        ))}
      </ScrollArea>
    </Container>
  );
};

export default Finder;
