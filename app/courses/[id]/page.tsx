'use client';

import React from 'react';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { gql } from '@apollo/client';
import Course from '@/pages/Course';

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

const coursePage = ({ params }) => {
  const { id } = params;

  const { data, loading } = useQuery(getCourseQuery, {
    variables: { id },
  });

  const course = data?.getCourse;

  console.log({ course, loading });

  return <Course course={course} />;
};

export default coursePage;
