import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client/core';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';

const createMealMutation = gql`
  mutation CreateMeal($mealPlanId: ID!, $name: String!, $entree: ID!, $sides: [ID]!) {
    createMeal(mealPlanId: $mealPlanId, name: $name, entree: $entree, sides: $sides) {
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
  query GetMealPlan($mealPlanId: ID!) {
    getMealPlan(mealPlanId: $mealPlanId) {
      id
      day
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

const useMealPlan = ({ id: mealPlanId }) => {
  const [createMeal] = useMutation(createMealMutation);
  const [updateMeal] = useMutation(updateMealMutation);
  const [deleteCourse] = useMutation(deleteCourseMutation);

  const { data, loading } = useQuery(GET_MEAL_PLAN, {
    variables: { mealPlanId },
    skip: !mealPlanId,
  });

  const create = ({ name, entree, sides }) => {
    const entreeId = normalize(entree);
    const sideIds = normalizeArray(sides);

    return createMeal({
      variables: { mealPlanId, name, entree: entreeId, sides: sideIds },
    });
  };

  const update = ({ id, name, entree, sides }) => {
    const entreeId = normalize(entree);
    const sideIds = normalizeArray(sides);

    return updateMeal({
      variables: { id, name, entree: entreeId, sides: sideIds },
    });
  };

  const remove = () => {
    if (!mealPlanId) return false;
    return deleteCourse({ variables: { id: mealPlanId } });
  };

  return {
    create,
    update,
    remove,
    data: data ? data.getMealPlan : null,
    loading,
  };
};

export default useMealPlan;
