import { useEffect } from 'react';

type useFormStorageProps = {
  form: any;
  key: string;
  disable?: boolean;
};

const useFormStorage = ({ form, key, disable }: useFormStorageProps) => {
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
