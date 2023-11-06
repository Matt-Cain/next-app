import useSWR from 'swr';
import { Autocomplete, NumberInput, Button, Fieldset, Modal } from '@mantine/core';
import { useForm, isNotEmpty } from '@mantine/form';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useIngredients = ({ ingredient }) => {
  const query = ingredient ? `https://api.edamam.com/auto-complete?q=${ingredient}` : null;

  return useSWR(query, fetcher);
};

const useIngredient = ({ ingredient }) => {
  const appId = 'c6daaf7c';
  const appKey = 'b20e95b000c96c4f8a8341ae89a36326';
  const query = ingredient
    ? `https://api.edamam.com/api/food-database/v2/parser?ingr=${ingredient}&app_id=${appId}&app_key=${appKey}`
    : null;

  return useSWR(query, fetcher);
};

const AddIngredientModal = ({ opened, close, addIngredient }) => {
  const form = useForm({
    initialValues: {
      name: '',
      unit: '',
      quantity: 1,
    },
    validate: {
      name: isNotEmpty('Name is required'),
      unit: isNotEmpty('Unit is required'),
    },
  });

  const { data: ingredientsData } = useIngredients({ ingredient: form.values.name });
  const { data: ingredientData } = useIngredient({ ingredient: form.values.name });

  const units = ingredientData?.hints?.[0]?.measures.map((measure) => measure.label);

  const cleanUndefined = (arr) => arr.filter((item) => item !== undefined);

  const handleAddIngredientClick = () => {
    if (form.validate().hasErrors) return;
    addIngredient(form.values);
    form.reset();
    close();
  };

  const handleClose = () => {
    form.reset();
    close();
  };

  return (
    <Modal title="Add Ingredient" opened={opened} onClose={handleClose} centered>
      <Fieldset legend="">
        <Autocomplete
          label="Name"
          data={cleanUndefined(ingredientsData || [])}
          {...form.getInputProps('name')}
        />
        <Autocomplete
          mt={15}
          label="Unit"
          data={cleanUndefined(units || [])}
          {...form.getInputProps('unit')}
        />
        <NumberInput min={0} mt={15} label="Quantity" {...form.getInputProps('quantity')} />
        <Button onClick={handleAddIngredientClick} mt={20}>
          Add Ingredient
        </Button>
      </Fieldset>
    </Modal>
  );
};

export default AddIngredientModal;
