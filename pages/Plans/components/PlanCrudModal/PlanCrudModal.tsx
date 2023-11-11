import { Modal, Group, Button, TextInput, Stack } from '@mantine/core';
import { useInputState, useDisclosure } from '@mantine/hooks';

const PlanCrudModal = ({ mutateMeal, opened, handler, isPlaceholder }) => {
  const [showPlaceholder, placeholderHandler] = useDisclosure(false);
  const [name, setName] = useInputState('');

  const handleMutateItem = () => {
    if (showPlaceholder) {
      mutateMeal({ isPlaceholder: showPlaceholder, name });
    } else {
      mutateMeal({});
    }
    handler.close();
  };

  const placeholderLabel = isPlaceholder ? 'Update Placeholder' : 'Add Placeholder';
  const modalBaseTitle = `Add meal or ${isPlaceholder && 'update'} placeholder`;
  const modalTitle = showPlaceholder ? placeholderLabel : modalBaseTitle;

  return (
    <>
      <Modal centered opened={opened} onClose={handler.close} title={modalTitle}>
        {showPlaceholder ? (
          <Stack>
            <TextInput label="Name" placeholder="Name" value={name} onChange={setName} />
            <Group>
              <Button onClick={handler.close}>Cancel</Button>
              <Button onClick={handleMutateItem}>{placeholderLabel}</Button>
            </Group>
          </Stack>
        ) : (
          <Group>
            <Button onClick={handleMutateItem}>Add Meal</Button>
            <Button onClick={placeholderHandler.open}>{placeholderLabel}</Button>
          </Group>
        )}
      </Modal>
    </>
  );
};

export default PlanCrudModal;
