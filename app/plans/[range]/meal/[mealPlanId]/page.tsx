'use client';

import Meal from '@/pages/Meal';
// import { gql } from '@apollo/client';
// import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
// import { Text, Container, TextInput } from '@mantine/core';

// const mealPlanQuery = gql`
//   query GetMealPlan($mealPlanId: ID!) {
//     getMealPlan(mealPlanId: $mealPlanId) {
//       id
//       day
//       meal {
//         id
//         name
//         entree {
//           id
//           type
//           name
//           recipe
//           ingredients {
//             name
//             quantity
//             unit
//           }
//         }
//         sides {
//           id
//           type
//           name
//           recipe
//         }
//       }
//       placeholder
//     }
//   }
// `;

// const getDay = (day) => {
//   switch (day) {
//     case 0:
//       return 'Sunday';
//     case 1:
//       return 'Monday';
//     case 2:
//       return 'Tuesday';
//     case 3:
//       return 'Wednesday';
//     case 4:
//       return 'Thursday';
//     case 5:
//       return 'Friday';
//     case 6:
//       return 'Saturday';
//     default:
//       return 'Unknown';
//   }
// };

const MealPage = ({ params }) => {
  const { mealPlanId } = params;
  return <Meal id={mealPlanId} />;
};

export default MealPage;
