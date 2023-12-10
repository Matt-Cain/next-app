'use client';

import React from 'react';
import Course from '@/page/Course';

type Props = {
  params: {
    id: string;
  };
};

const coursePage = ({ params }: Props) => {
  const { id } = params;
  return <Course id={id} />;
};

export default coursePage;
