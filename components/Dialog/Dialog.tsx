import React from 'react';
import { Button, Group, Flex, Text, Modal } from '@mantine/core';

const Dialog = ({ opened, onClose, onDestroy, title, safeText, dangerText }) => {
  return (
    <Modal withCloseButton={false} opened={opened} onClose={onClose} size="xs" radius="md" centered>
      <Flex justify="center" align="center" direction="column">
        <Text size="md" mb="xs" fw={500}>
          {title}
        </Text>
        <Group justify="center" style={{ flexShrink: 0 }}>
          <Button onClick={onClose} mt={10}>
            {safeText}
          </Button>
          <Button onClick={onDestroy} variant="outline" mt={10} color="red">
            {dangerText}
          </Button>
        </Group>
      </Flex>
    </Modal>
  );
};

export default Dialog;
