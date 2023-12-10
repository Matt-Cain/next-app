import { gql, useMutation } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';

const GET_SHOPPING_LIST = gql`
  query GetShoppingList($startDate: Date!, $endDate: Date!) {
    getShoppingList(startDate: $startDate, endDate: $endDate) {
      id
      name
      quantity
      unit
    }
  }
`;

const ADD_ITEM_TO_SHOPPING_LIST = gql`
  mutation AddItemToInventory($id: ID!, $type: String!, $timestamp: Date!, $status: String!) {
    addItemToInventory(id: $id, type: $type, timestamp: $timestamp, status: $status)
  }
`;

type useShoppingListProps = {
  startDate: Date;
  endDate: Date;
};

const useShoppingList = ({ startDate, endDate }: useShoppingListProps) => {
  const res = useQuery(GET_SHOPPING_LIST, {
    variables: { startDate, endDate },
  });

  const [addItemToShoppingList] = useMutation(ADD_ITEM_TO_SHOPPING_LIST);

  type AddProps = {
    id: string;
    type: string;
    timestamp: Date;
    status: string;
  };

  const add = async ({ id, type, timestamp, status }: AddProps) => {
    await addItemToShoppingList({
      variables: { id, type, timestamp, status },
    });
  };

  return {
    add,
    res,
  };
};

export default useShoppingList;
