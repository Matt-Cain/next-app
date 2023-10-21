'use client';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Text, Container, TextInput } from '@mantine/core';

const mealPlanQuery = gql`
  query GetMealPlan($mealPlanId: ID!) {
    getMealPlan(mealPlanId: $mealPlanId) {
      id
      day
      meal {
        id
        name
        courses {
          id
          type
          name
          ingredients {
            id
            name
            quantity
            unit
          }
        }
      }
    }
  }
`;

const getDay = (day) => {
  switch (day) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return 'Unknown';
  }
};

const Meal = ({ params }) => {
  const { mealPlanId } = params;

  // const { data } = useQuery(mealPlanQuery, { variables: { mealPlanId } });
  // const mealPlan = data?.getMealPlan;
  // console.log({ mealPlan });

  return (
    <Container fluid>
      {/* <Text>{getDay(day)}</Text> */}
      <TextInput
        size="xl"
        variant="unstyled"
        // value={data?.getMeal?.name}
        placeholder="Meal Name Goes Here"
      />
    </Container>
  );
};

export default Meal;
