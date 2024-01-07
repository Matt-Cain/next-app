import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { CREATE_PLAN, UPDATE_PLAN, DELETE_PLAN, GET_PLAN } from './graph';
import {
  createPlanNotification,
  updatePlanNotification,
  deletePlanNotification,
} from './notifications';

const normalize = ({ id }: { id: string }) => id;
const normalizeArray = (array: any[]) => array.map(normalize);

const call = (fn: Function, data: any) => {
  if (typeof fn === 'function') fn(data);
};

type usePlanProps = {
  id: string;
  skip?: boolean;
};

const usePlan = ({ id, skip }: usePlanProps) => {
  const { data, loading, refetch } = useQuery(GET_PLAN, { variables: { id }, skip });
  const [createPlan] = useMutation(CREATE_PLAN, createPlanNotification);
  const [updatePlan] = useMutation(UPDATE_PLAN, updatePlanNotification);
  const [deletePlan] = useMutation(DELETE_PLAN, deletePlanNotification);

  type CreateProps = {
    name: string;
    isPlaceholder: boolean;
    timestamp: Date;
  };

  const create = async ({ name, isPlaceholder, timestamp }: CreateProps, callback: Function) => {
    const variables = { name, isPlaceholder, timestamp };
    const res = await createPlan({ variables });
    const resData = res?.data?.createPlan;

    call(callback, resData);
    return resData;
  };

  type UpdateProps = {
    isPlaceholder: boolean;
    name: string;
    entree: { id: string } | null;
    sides: { id: string }[];
  };

  const update = async (
    { isPlaceholder, name, entree, sides }: UpdateProps,
    callback?: Function
  ) => {
    const entreeId = entree && normalize(entree);
    const sideIds = sides && normalizeArray(sides);

    const variables = { id, isPlaceholder, name, entree: entreeId, sides: sideIds };
    const res = await updatePlan({ variables });
    const resData = res?.data?.updatePlan;

    if (typeof callback === 'function') {
      call(callback, resData);
    }

    return resData;
  };

  const remove = async (callback?: Function) => {
    const res = await deletePlan({ variables: { id } });
    const resData = res?.data?.deleteMeal;

    if (typeof callback === 'function') {
      call(callback, resData);
    }

    return resData;
  };

  return {
    create,
    loading,
    refetch,
    remove,
    update,
    data: data ? data.getPlan : null,
  };
};

export default usePlan;
