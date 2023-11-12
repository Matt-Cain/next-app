import { createNotification } from '@/utils/notifications';

const NOTIFICATIONS = {
  SWAP_DATES: {
    ERROR: {
      title: 'Error',
      message: 'There was an error swapping your meal plan dates',
      color: 'red',
    },
  },
};

const swapDatesNotification = createNotification(NOTIFICATIONS.SWAP_DATES);

export { swapDatesNotification };
