import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client/core';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { notifications } from '@mantine/notifications';

const createCourseMutation = gql`
  mutation CreateCourse(
    $type: CourseType!
    $name: String!
    $ingredients: [IngredientInput]!
    $recipe: String
  ) {
    createCourse(type: $type, name: $name, ingredients: $ingredients, recipe: $recipe)
  }
`;

const updateCourseMutation = gql`
  mutation UpdateCourse(
    $id: ID!
    $type: CourseType
    $name: String
    $recipe: String
    $ingredients: [IngredientInput]
  ) {
    updateCourse(id: $id, type: $type, name: $name, recipe: $recipe, ingredients: $ingredients)
  }
`;

const getCoursesQuery = gql`
  query GetCourses {
    getCourses {
      id
      name
      recipe
      type
      ingredients {
        id
        name
        quantity
        section
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
  section: string;
  unit: string;
};

type Course = {
  id: string;
  type: string;
  name: string;
  recipe: string;
  ingredients: Ingredient[];
};

const normalizeIngredients = (ingredients: Ingredient[]) => {
  return ingredients.map(({ id, name, quantity, section, unit }) => ({
    id,
    name: name.trim(),
    quantity,
    section: section,
    unit,
  }));
};

type Props = {
  id?: string;
};

const useCourse = ({ id: courseId }: Props) => {
  const { data, refetch, loading } = useQuery(getCoursesQuery);
  const refetchQueries = [getCoursesQuery];

  const [createCourse] = useMutation(createCourseMutation, {
    ...createCourseNotification,
    refetchQueries,
  });

  const [updateCourse] = useMutation(updateCourseMutation, {
    ...updateCourseNotification,
    refetchQueries,
  });

  const [deleteCourse] = useMutation(deleteCourseMutation, {
    ...deleteCourseNotification,
    refetchQueries,
  });

  const course = data?.getCourses.find((course: Course) => course.id === courseId);

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
    course,
    update,
    remove,
    data: course,
    refetch,
    loading,
  };
};

export default useCourse;
