import { Modal, Group, Button, TextInput, Stack } from '@mantine/core';
import { useInputState, useDisclosure } from '@mantine/hooks';

type PlanCrudModalProps = {
  opened: boolean;
  handler: {
    open: () => void;
    close: () => void;
  };
  plan: {
    create: (data: any, refetchPlans: () => void) => Promise<any>;
    update: (data: any, refetchPlans: () => void) => Promise<any>;
    remove: (refetchPlans: () => void) => Promise<any>;
  };
  planData?: {
    id?: string;
    isPlaceholder?: boolean;
    timestamp?: string;
  };
  goToPlan: (plan?: any) => void;
  refetchPlans: () => void;
};

const PlanCrudModal = ({
  goToPlan,
  handler,
  opened,
  plan,
  planData,
  refetchPlans,
}: PlanCrudModalProps) => {
  const { id, isPlaceholder, timestamp } = planData || {};
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

  const handleChange = async () => {
    if (!id) {
      const newPlan = await createPlan();
      console.log({ newPlan });
      if (!showPlaceholder && newPlan) goToPlan(newPlan);
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
              {isPlaceholder && (
                <Button onClick={handleRemove} variant="" color="red">
                  Remove
                </Button>
              )}
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
