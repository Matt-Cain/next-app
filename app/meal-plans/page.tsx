import Link from 'next/link';
import { gql } from '@apollo/client';
import { Card } from '@mantine/core';
import { getClient } from '@/utils/apollo/standaloneClient';

const mealPlansQuery = gql`
  {
    mealPlans {
      id
      range
    }
  }
`;

const timestampToDate = (timestamp) => {
  const date = new Date(parseInt(timestamp, 10));

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const rangeToDate = (range) => {
  const [start, end] = range;
  return `${timestampToDate(start)} - ${timestampToDate(end)}`;
};

const MealPlans = async () => {
  const { data } = await getClient().query({ query: mealPlansQuery });
  const mealPlans = data?.mealPlans;

  return (
    <div>
      <h1>Meal Plans</h1>
      {mealPlans.map((mealPlan) => (
        <Link
          key={mealPlan.id}
          href={`/meal-plans/${mealPlan.id}`}
          style={{ textDecoration: 'none' }}
        >
          <Card>
            <p>{rangeToDate(mealPlan.range)}</p>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default MealPlans;
