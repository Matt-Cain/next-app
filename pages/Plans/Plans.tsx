'use client';

import { useEffect } from 'react';
import { Container, Flex } from '@mantine/core';
import PlanItem from './components/PlanItem';
import usePlans from '@/hooks/usePlans';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Plans = ({ range }) => {
  const plans = usePlans({ range });

  useEffect(() => {
    plans.refetch();
  }, [range]);

  return (
    <Container style={{ height: '100%' }}>
      <Flex mt="-5px" gap="md" justify="space-evenly" direction="column" style={{ height: '100%' }}>
        {plans.dnd.items.map((plan, index) => (
          <PlanItem
            key={index}
            index={index}
            title={days[index]}
            plan={plan}
            plans={plans}
            dnd={plans.dnd}
          />
        ))}
      </Flex>
    </Container>
  );
};

export default Plans;
