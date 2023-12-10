import { gql, useMutation } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';

const GET_INVENTORY_LIST = gql`
  query GetInventoryList($startDate: Date!, $endDate: Date!) {
    getInventoryList(startDate: $startDate, endDate: $endDate) {
      timestamp
      ingredients {
        item {
          id
          name
          quantity
          unit
        }
        type
        status
      }
      shoppingItems {
        item {
          id
          name
          quantity
          unit
        }
        type
        status
      }
    }
  }
`;

const REMOVE_ITEM_FROM_INVENTORY = gql`
  mutation RemoveItemFromInventory($id: ID!, $type: String!, $timestamp: Date!) {
    removeItemFromInventory(id: $id, type: $type, timestamp: $timestamp)
  }
`;

type useInventoryProps = {
  startDate: Date;
  endDate: Date;
};

const useInventory = ({ startDate, endDate }: useInventoryProps) => {
  const res = useQuery(GET_INVENTORY_LIST, {
    variables: { startDate, endDate },
  });

  const [removeItemFromInventory] = useMutation(REMOVE_ITEM_FROM_INVENTORY);

  const remove = async ({ id, type }: { id: string; type: string }) => {
    await removeItemFromInventory({
      variables: { id, type, timestamp: startDate },
    });
  };

  return {
    remove,
    res,
  };
};

export default useInventory;
