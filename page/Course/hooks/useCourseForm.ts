'use client';

import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import useFormStorage from '@/hooks/useFormStorage';

export type IngredientType = {
  id?: string;
  name: string;
  section: string;
  quantity: number;
  unit: string;
};

const STORAGE_KEY = 'course-form';

export type FormValues = {
  id?: string;
  name: string;
  ingredients: IngredientType[];
  recipe: string;
  type: string;
};

const defaultCourse: FormValues = { id: '', name: '', ingredients: [], recipe: '', type: 'entree' };

type useCourseFormProps = {
  course?: FormValues;
};

const useCourseForm = ({ course }: useCourseFormProps) => {
  const form = useForm({
    initialValues: defaultCourse,
    validate: {
      name: (value) => (value.trim().length < 1 ? 'Name is required' : null),
      ingredients: (value) => (value.length < 1 ? 'Must have at least one ingredient' : null),
    },
  });

  useEffect(() => {
    if (course) {
      form.setValues(course);
    }
  }, [course]);

  const clearStorage = useFormStorage({ form, key: STORAGE_KEY, disable: Boolean(course) });

  const clear = () => {
    form.reset();
    clearStorage();
  };

  const addIngredient = (ingredient: IngredientType) => {
    form.setFieldValue('ingredients', [...form.values.ingredients, ingredient] as IngredientType[]);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = form.values.ingredients.filter((_, i) => i !== index);
    form.setFieldValue('ingredients', newIngredients as IngredientType[]);
  };

  return { addIngredient, removeIngredient, clear, main: form };
};

export default useCourseForm;
