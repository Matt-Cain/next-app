'use client';

import { useEffect } from 'react';
import { useForm } from '@mantine/form';

type CourseType = {
  id: string;
  name: string;
};

const defaultPlan = {
  isPlaceholder: false,
  entree: null as null | CourseType,
  name: '',
  sides: [] as CourseType[],
};

type usePlanFormProps = {
  plan?: {
    isPlaceholder: boolean;
    entree: CourseType | null;
    name: string;
    sides: CourseType[];
  };
};

const usePlanForm = ({ plan }: usePlanFormProps) => {
  const form = useForm({ initialValues: defaultPlan });

  useEffect(() => {
    if (plan) {
      form.setValues(plan);
    }
  }, [plan]);

  const clear = () => form.reset();

  const addEntree = (entree: CourseType) => form.setFieldValue('entree', entree);

  const addSide = (side: CourseType) => {
    const sideAlreadyExists = form.values.sides.find((s) => s.id === side.id);
    if (sideAlreadyExists) return;

    form.setFieldValue('sides', [...form.values.sides, side]);
  };

  const removeSide = (index: number) => {
    const newSides = form.values.sides.filter((_, i) => i !== index);
    form.setFieldValue('sides', newSides);
  };

  return { addEntree, addSide, removeSide, clear, main: form };
};

export default usePlanForm;
