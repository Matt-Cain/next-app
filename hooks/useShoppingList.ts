import { gql } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';

const GET_SHOPPING_LIST = gql`
  query GetShoppingList($startDate: Date!, $endDate: Date!) {
    getShoppingList(startDate: $startDate, endDate: $endDate) {
      name
      quantity
      unit
    }
  }
`;
const useShoppingList = ({ startDate, endDate }) => {
  const res = useQuery(GET_SHOPPING_LIST, {
    variables: { startDate, endDate },
  });

  return {
    res,
  };
};

export default useShoppingList;
