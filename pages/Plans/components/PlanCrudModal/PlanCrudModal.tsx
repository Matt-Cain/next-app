import { Modal, Group, Button, TextInput, Stack } from '@mantine/core';
import { useInputState, useDisclosure } from '@mantine/hooks';

const PlanCrudModal = ({
  plan,
  opened,
  handler,
  isPlaceholder,
  id,
  refetchPlans,
  goToPlan,
  timestamp,
}) => {
  const [showPlaceholder, placeholderHandler] = useDisclosure(false);
  const [name, setName] = useInputState('');

  const createPlan = () =>
    plan.create({ name, timestamp, isPlaceholder: showPlaceholder }, refetchPlans);

  const updatePlaceholder = () => plan.update({ id, name }, refetchPlans);
  const removePlaceholder = () => plan.update({ id, name: '', isPlaceholder: false }, refetchPlans);

  const handleClose = () => {
    handler.close();
    placeholderHandler.close();
    setName('');
  };

  const handleChange = () => {
    if (!id) {
      createPlan();
      if (!showPlaceholder) goToPlan();
    } else if (showPlaceholder) {
      updatePlaceholder();
    } else {
      removePlaceholder();
      goToPlan();
    }

    handleClose();
  };

  const handleRemove = () => {
    plan.remove(refetchPlans);
    handleClose();
  };

  const placeholderLabel = isPlaceholder ? 'Update Placeholder' : 'Add Placeholder';
  const placeholderButtonText = isPlaceholder ? 'Update' : 'Add';
  const modalBaseTitle = `Add plan or ${isPlaceholder ? 'update' : ''} placeholder`;
  const modalTitle = showPlaceholder ? placeholderLabel : modalBaseTitle;

  return (
    <>
      <Modal centered opened={opened} onClose={handleClose} title={modalTitle}>
        {showPlaceholder ? (
          <Stack>
            <TextInput label="Name" placeholder="Name" value={name} onChange={setName} />
            <Group>
              <Button onClick={handleClose} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleChange}>{placeholderButtonText}</Button>
              <Button onClick={handleRemove} variant="" color="red">
                Remove
              </Button>
            </Group>
          </Stack>
        ) : (
          <Group>
            <Button onClick={handleChange}>Add Plan</Button>
            <Button onClick={placeholderHandler.open}>{placeholderLabel}</Button>
          </Group>
        )}
      </Modal>
    </>
  );
};

export default PlanCrudModal;
