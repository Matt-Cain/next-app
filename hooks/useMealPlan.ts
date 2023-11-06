import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client/core';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { notifications } from '@mantine/notifications';

const createMealMutation = gql`
  mutation CreateMeal($planId: ID!, $name: String!, $entree: ID!, $sides: [ID]!) {
    createMeal(planId: $planId, name: $name, entree: $entree, sides: $sides) {
      id
      name
      entree {
        id
        type
        name
        recipe
        ingredients {
          name
          quantity
          unit
        }
      }
      sides {
        id
        type
        name
        recipe
      }
    }
  }
`;

// return a boolean
const updateMealMutation = gql`
  mutation UpdateMeal($id: ID!, $name: String!, $entree: ID!, $sides: [ID]!) {
    updateMeal(id: $id, name: $name, entree: $entree, sides: $sides)
  }
`;

const GET_MEAL_PLAN = gql`
  query GetPlan($id: ID!) {
    getPlan(id: $id) {
      id
      timestamp
      meal {
        id
        name
        entree {
          id
          type
          name
          recipe
          ingredients {
            name
            quantity
            unit
          }
        }
        sides {
          id
          type
          name
          recipe
        }
      }
      placeholder
    }
  }
`;

const deleteCourseMutation = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id)
  }
`;

const normalize = ({ id }) => id;

const normalizeArray = (array) => array.map(normalize);

const handleCreateMealNotification = {
  onCompleted: () => {
    notifications.showNotification({
      title: 'Meal Plan Created',
      message: 'Your meal plan has been created',
      color: 'green',
    });
  },
  onError: () => {
    notifications.showNotification({
      title: 'Error',
      message: 'There was an error creating your meal plan',
      color: 'red',
    });
  },
};

const handleUpdateMealNotification = {
  onCompleted: () => {
    notifications.show({
      title: 'Meal Plan Updated',
      message: 'Your meal plan has been updated',
      color: 'cyan',
    });
  },
  onError: () => {
    notifications.show({
      title: 'Error',
      message: 'There was an error updating your meal plan',
      color: 'red',
    });
  },
};

const useMealPlan = ({ id: mealPlanId }) => {
  const [createMeal] = useMutation(createMealMutation, handleCreateMealNotification);
  const [updateMeal] = useMutation(updateMealMutation, handleUpdateMealNotification);
  const [deleteCourse] = useMutation(deleteCourseMutation);

  const { data, loading } = useQuery(GET_MEAL_PLAN, {
    variables: { id: mealPlanId },
    skip: !mealPlanId,
  });

  const create = async ({ name, entree, sides }) => {
    const entreeId = normalize(entree);
    const sideIds = normalizeArray(sides);

    const res = await createMeal({
      variables: { planId: mealPlanId, name, entree: entreeId, sides: sideIds },
    });

    return res?.data?.createMeal;
  };

  const update = async ({ id, name, entree, sides }) => {
    const entreeId = normalize(entree);
    const sideIds = normalizeArray(sides);

    const res = await updateMeal({
      variables: { id, name, entree: entreeId, sides: sideIds },
    });

    return res?.data?.updateMeal;
  };

  const remove = () => {
    if (!mealPlanId) return false;
    return deleteCourse({ variables: { id: mealPlanId } });
  };

  return {
    create,
    update,
    remove,
    data: data ? data.getPlan : null,
    loading,
  };
};

export default useMealPlan;
