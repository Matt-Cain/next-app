import { Modal, Group, Button, TextInput, Stack } from '@mantine/core';
import { useInputState, useDisclosure } from '@mantine/hooks';

const AddMealModal = ({ createMeal, opened, handler }) => {
  const [isPlaceholder, placeholderHandler] = useDisclosure(false);
  const [name, setName] = useInputState('');

  const handleCreateItem = () => {
    if (isPlaceholder) {
      createMeal({ placeholder: name });
    } else {
      createMeal({});
    }
    handler.close();
  };

  return (
    <>
      <Modal centered opened={opened} onClose={handler.close} title="Add meal or placeholder">
        {isPlaceholder ? (
          <Stack>
            <TextInput label="Name" placeholder="Name" value={name} onChange={setName} />
            <Group>
              <Button onClick={handler.close}>Cancel</Button>
              <Button onClick={handleCreateItem}>Add Placeholder</Button>
            </Group>
          </Stack>
        ) : (
          <Group>
            <Button onClick={handleCreateItem}>Add Meal</Button>
            <Button onClick={placeholderHandler.open}>Add Placeholder</Button>
          </Group>
        )}
      </Modal>
    </>
  );
};

export default AddMealModal;
