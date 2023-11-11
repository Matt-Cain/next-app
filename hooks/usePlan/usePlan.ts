import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { CREATE_PLAN, UPDATE_PLAN, GET_PLAN } from './graph';
import { createPlanNotification, updatePlanNotification } from './notifications';

const normalize = ({ id }) => id;
const normalizeArray = (array) => array.map(normalize);

const usePlan = ({ id: planId }) => {
  // const [createMeal] = useMutation(CREATE_MEAL, createMealNotification);
  const [updatePlan] = useMutation(UPDATE_PLAN, updatePlanNotification);

  const { data, loading } = useQuery(GET_PLAN, {
    variables: { id: planId },
    skip: !planId,
  });

  // const create = async ({ name, entree, sides }) => {
  //   const entreeId = normalize(entree);
  //   const sideIds = normalizeArray(sides);

  //   const res = await createMeal({
  //     variables: { planId, name, entree: entreeId, sides: sideIds },
  //   });

  //   return res?.data?.createMeal;
  // };

  const update = async ({ id, name, entree, sides }) => {
    const entreeId = normalize(entree);
    const sideIds = normalizeArray(sides);

    const res = await updatePlan({
      variables: { id, name, entree: entreeId, sides: sideIds },
    });

    return res?.data?.updatePlan;
  };

  return {
    // create,
    update,
    data: data ? data.getPlan : null,
    loading,
  };
};

export default usePlan;
