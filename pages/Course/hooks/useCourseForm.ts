'use client';

import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import useFormStorage from '@/hooks/useFormStorage';

const STORAGE_KEY = 'course-form';

const defaultCourse = { name: '', ingredients: [], recipe: '', type: 'entree' };

const useCourseForm = ({ course }) => {
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

  const clearStorage = useFormStorage({ form, key: STORAGE_KEY, disable: course });

  const clear = () => {
    form.reset();
    clearStorage();
  };

  const addIngredient = (ingredient) => {
    form.setFieldValue('ingredients', [...form.values.ingredients, ingredient]);
  };

  const removeIngredient = (index) => {
    const newIngredients = form.values.ingredients.filter((_, i) => i !== index);
    form.setFieldValue('ingredients', newIngredients);
  };

  return { addIngredient, removeIngredient, clear, main: form };
};

export default useCourseForm;
