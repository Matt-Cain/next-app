import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Autocomplete } from '@mantine/core';

const getCoursesQuery = gql`
  query GetCourses {
    getCourses {
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

type Course = {
  id: string;
  type: string;
  name: string;
  recipe: string;
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
  }[];
};

type AddCourseModalProps = {
  addCourse: (course: Course) => void;
  type: string;
  formProps?: any;
  style?: any;
};

const AddCourseModal = ({ addCourse, type, formProps, style }: AddCourseModalProps) => {
  const { data } = useQuery(getCoursesQuery);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (formProps?.value?.name) {
      setInput(formProps.value.name);
    }
  }, [formProps?.value?.name]);

  const courses: Course[] = data?.getCourses || [];

  const filteredCourses = courses.filter((c) => c.type === type);

  const courseNames = filteredCourses.map((c: Course) => c.name);

  const handleAddCourse = (courseName: string) => {
    setInput(courseName);

    const course = filteredCourses.find((c) => c.name === courseName);
    if (course) {
      addCourse(course);
      // setInput('');
    }
  };

  return (
    <Autocomplete
      style={style}
      {...formProps}
      value={input}
      data={courseNames}
      onChange={handleAddCourse}
    />
  );
};

export default AddCourseModal;
