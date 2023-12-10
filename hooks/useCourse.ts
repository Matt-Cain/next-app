import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client/core';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { notifications } from '@mantine/notifications';

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
        id
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
        id
        name
        quantity
        unit
      }
    }
  }
`;

const deleteCourseMutation = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id)
  }
`;

const createCourseNotification = {
  onCompleted: () => {
    notifications.show({
      title: 'Success',
      message: 'Your course has been created',
      color: 'green',
    });
  },
  onError: () => {
    notifications.show({
      title: 'Error',
      message: 'There was a problem creating your course',
      color: 'red',
    });
  },
};

const updateCourseNotification = {
  onCompleted: () => {
    notifications.show({
      title: 'Success',
      message: 'Your course has been updated',
      color: 'green',
    });
  },
  onError: () => {
    notifications.show({
      title: 'Error',
      message: 'There was a problem updating your course',
      color: 'red',
    });
  },
};

const deleteCourseNotification = {
  onCompleted: () => {
    notifications.show({
      title: 'Success',
      message: 'Your course has been deleted',
      color: 'green',
    });
  },
  onError: () => {
    notifications.show({
      title: 'Error',
      message: 'There was a problem deleting your course',
      color: 'red',
    });
  },
};

type Ingredient = {
  id?: string;
  name: string;
  quantity: number;
  unit: string;
};

const normalizeIngredients = (ingredients: Ingredient[]) => {
  return ingredients.map(({ id, name, quantity, unit }) => ({
    id,
    name: name.trim(),
    quantity,
    unit,
  }));
};

type Props = {
  id?: string;
};

const useCourse = ({ id: courseId }: Props) => {
  const [createCourse] = useMutation(createCourseMutation, createCourseNotification);
  const [updateCourse] = useMutation(updateCourseMutation, updateCourseNotification);
  const [deleteCourse] = useMutation(deleteCourseMutation, deleteCourseNotification);

  const { data, loading } = useQuery(getCourseQuery, {
    variables: { id: courseId },
    skip: !courseId,
  });

  type CreateProps = {
    type: string;
    name: string;
    recipe: string;
    ingredients: Ingredient[];
  };

  const create = ({ type, name, recipe, ingredients }: CreateProps) => {
    return createCourse({
      variables: { type, name, recipe, ingredients },
    });
  };

  type UpdateProps = {
    id: string;
    type: string;
    name: string;
    recipe: string;
    ingredients: Ingredient[];
  };

  const update = ({ id, type, name, recipe, ingredients }: UpdateProps) => {
    return updateCourse({
      variables: { id, type, name, recipe, ingredients: normalizeIngredients(ingredients) },
    });
  };

  const remove = () => {
    if (!courseId) return false;
    return deleteCourse({ variables: { id: courseId } });
  };

  return {
    create,
    update,
    remove,
    data: data ? data.getCourse : null,
    loading,
  };
};

export default useCourse;
