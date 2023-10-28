import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client/core';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';

const createCourseMutation = gql`
  mutation CreateCourse(
    $type: CourseType!
    $name: String!
    $recipe: String!
    $ingredients: [IngredientInput]!
  ) {
    createCourse(type: $type, name: $name, recipe: $recipe, ingredients: $ingredients) {
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
  }
`;

const updateCourseMutation = gql`
  mutation UpdateCourse(
    $id: ID!
    $type: CourseType!
    $name: String!
    $recipe: String!
    $ingredients: [IngredientInput]!
  ) {
    updateCourse(id: $id, type: $type, name: $name, recipe: $recipe, ingredients: $ingredients) {
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
  }
`;

const getCourseQuery = gql`
  query GetCourse($id: ID!) {
    getCourse(id: $id) {
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
  }
`;

const useCourse = ({ id: courseId }) => {
  const [createCourse] = useMutation(createCourseMutation);
  const [updateCourse] = useMutation(updateCourseMutation);

  const { data, loading } = useQuery(courseId && getCourseQuery, { variables: { id: courseId } });

  const create = ({ type, name, recipe, ingredients }) => {
    return createCourse({
      variables: { type, name, recipe, ingredients },
    });
  };

  const update = ({ type, name, recipe, ingredients }) => {
    return updateCourse({
      variables: { id, type, name, recipe, ingredients },
    });
  };

  return {
    create,
    update,
    data: data ? data.getCourse : null,
    loading,
  };
};

export default useCourse;
