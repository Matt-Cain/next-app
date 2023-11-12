'use client';

import { useEffect } from 'react';
import { useForm } from '@mantine/form';

const defaultPlan = { name: '', entree: null, sides: [] };

const usePlanForm = ({ plan }) => {
  const form = useForm({ initialValues: defaultPlan });

  useEffect(() => {
    if (plan) {
      form.setValues(plan);
    }
  }, [plan]);

  const clear = () => form.reset();

  const addEntree = (entree) => form.setFieldValue('entree', entree);

  const addSide = (side) => {
    const sideAlreadyExists = form.values.sides.find((s) => s.id === side.id);
    if (sideAlreadyExists) return;

    form.setFieldValue('sides', [...form.values.sides, side]);
  };

  const removeSide = (index) => {
    const newSides = form.values.sides.filter((_, i) => i !== index);
    form.setFieldValue('sides', newSides);
  };

  return { addEntree, addSide, removeSide, clear, main: form };
};

export default usePlanForm;
