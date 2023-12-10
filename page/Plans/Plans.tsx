'use client';

import { useEffect } from 'react';
import { Container, Flex } from '@mantine/core';
import PlanItem from './components/PlanItem';
import usePlans from '@/hooks/usePlans';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Plans = ({ range }: { range: string }) => {
  const plans = usePlans({ range });

  useEffect(() => {
    plans.refetch();
  }, [range]);

  return (
    <Container p="15" style={{ height: '100%' }}>
      <Flex mt="-5px" gap="md" justify="space-evenly" direction="column" style={{ height: '100%' }}>
        {plans.dnd.items.map((plan, index) => (
          <PlanItem key={index} index={index} title={days[index]} planData={plan} plans={plans} />
        ))}
      </Flex>
    </Container>
  );
};

export default Plans;
