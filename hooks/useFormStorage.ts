import { useEffect } from 'react';

const useFormStorage = ({ form, key, disable }) => {
  useEffect(() => {
    if (disable) return;

    const formData = localStorage.getItem(key);
    if (formData) {
      try {
        form.setValues(JSON.parse(formData));
      } catch (error) {
        console.log('Error parsing form data');
      }
    }
  }, []);

  useEffect(() => {
    if (disable) return;

    localStorage.setItem(key, JSON.stringify(form.values));
  }, [form.values]);

  const clearStorage = () => localStorage.removeItem(key);

  return clearStorage;
};

export default useFormStorage;
