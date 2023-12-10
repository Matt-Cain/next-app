import { notifications, NotificationData } from '@mantine/notifications';

type NotificationType = {
  SUCCESS?: NotificationData;
  ERROR?: NotificationData;
};

const createNotification = (notification: NotificationType = {}) => ({
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
