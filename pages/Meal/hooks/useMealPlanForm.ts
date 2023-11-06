'use client';

import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import useFormStorage from '@/hooks/useFormStorage';

const STORAGE_KEY = 'meal-plan-form';

const defaultMealPlan = { name: '', entree: null, sides: [] };

const useMealPlanForm = ({ mealPlan }) => {
  const form = useForm({ initialValues: defaultMealPlan });

  useEffect(() => {
    if (mealPlan) {
      form.setValues(mealPlan);
    }
  }, [mealPlan]);

  // const clearStorage = useFormStorage({ form, key: STORAGE_KEY, disable: mealPlan });

  const clear = () => {
    form.reset();
    // clearStorage();
  };

  const addEntree = (entree) => {
    form.setFieldValue('entree', entree);
  };

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

export default useMealPlanForm;
