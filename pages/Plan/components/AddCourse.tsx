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

const AddCourseModal = ({ addCourse, type, formProps, style }) => {
  const { data } = useQuery(getCoursesQuery);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (formProps?.value?.name) {
      setInput(formProps.value.name);
    }
  }, [formProps?.value?.name]);

  const courses = (data?.getCourses || []).filter((c) => c.type === type);

  const courseNames = courses.map((c) => c.name);

  const handleAddCourse = (courseName) => {
    setInput(courseName);

    const course = courses.find((c) => c.name === courseName);
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
