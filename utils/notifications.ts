import { notifications } from '@mantine/notifications';

const createNotification = (notification = {}) => ({
  onCompleted: () => {
    if (notification.SUCCESS) {
      notifications.show(notification.SUCCESS);
    }
  },
  onError: () => {
    if (notification.ERROR) {
      notifications.show(notification.ERROR);
    }
  },
});

export { createNotification };
