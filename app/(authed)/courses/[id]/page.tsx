'use client';

import React from 'react';
import Course from '@/pages/Course';

const coursePage = ({ params }) => {
  const { id } = params;
  return <Course id={id} />;
};

export default coursePage;
