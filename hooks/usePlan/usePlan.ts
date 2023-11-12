import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { CREATE_PLAN, UPDATE_PLAN, DELETE_PLAN, GET_PLAN } from './graph';
import {
  createPlanNotification,
  updatePlanNotification,
  deletePlanNotification,
} from './notifications';

const normalize = ({ id }) => id;
const normalizeArray = (array) => array.map(normalize);

const call = (fn, data) => {
  if (typeof fn === 'function') fn(data);
};

const usePlan = ({ id, skip }) => {
  const { data, loading } = useQuery(GET_PLAN, { variables: { id }, skip });
  const [createPlan] = useMutation(CREATE_PLAN, createPlanNotification);
  const [updatePlan] = useMutation(UPDATE_PLAN, updatePlanNotification);
  const [deletePlan] = useMutation(DELETE_PLAN, deletePlanNotification);

  const create = async ({ name, isPlaceholder, timestamp }, callback) => {
    const variables = { name, isPlaceholder, timestamp };
    const res = await createPlan({ variables });
    const resData = res?.data?.createMeal;

    call(callback, resData);
    return resData;
  };

  const update = async ({ isPlaceholder, name, entree, sides }, callback) => {
    const entreeId = entree && normalize(entree);
    const sideIds = sides && normalizeArray(sides);

    const variables = { id, isPlaceholder, name, entree: entreeId, sides: sideIds };
    const res = await updatePlan({ variables });
    const resData = res?.data?.updateMeal;

    call(callback, resData);
    return resData;
  };

  const remove = async (callback) => {
    const res = await deletePlan({ variables: { id } });
    const resData = res?.data?.deleteMeal;

    call(callback, resData);
    return resData;
  };

  return {
    create,
    update,
    remove,
    loading,
    data: data ? data.getPlan : null,
  };
};

export default usePlan;
