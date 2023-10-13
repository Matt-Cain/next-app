import { Fragment } from 'react';
import { gql } from '@apollo/client';
import { getClient } from '@/utils/ApolloClient';

const mealQuery = gql`
  query Meal($mealId: ID!) {
    meal(id: $mealId) {
      id
      name
      day
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

const Meal = async ({ params }) => {
  const mealId = params['meal-id'];

  const { data } = await getClient().query({
    query: mealQuery,
    variables: { mealId },
  });

  const { meal } = data;

  return (
    <div>
      <Fragment key={meal.id}>
        <h2>Meal: {meal.name}</h2>
        <p>Day: {getDay(meal.day)}</p>
        <ul>
          {meal.courses.map((course) => (
            <li key={course.id}>
              <h3>Course: {course.name}</h3>
              <ul>
                {course.ingredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    {ingredient.quantity} {ingredient.unit} {ingredient.name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Fragment>
    </div>
  );
};

export default Meal;
