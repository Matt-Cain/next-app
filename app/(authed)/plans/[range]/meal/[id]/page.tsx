'use client';

import Meal from '@/page/Plan';

type Props = {
  params: {
    id: string;
    range: string;
  };
};

const MealPage = ({ params }: Props) => {
  const { id, range } = params;
  return <Meal id={id} range={range} />;
};

export default MealPage;
