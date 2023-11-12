import { createNotification } from '@/utils/notifications';

const NOTIFICATIONS = {
  CREATE_PLAN: {
    SUCCESS: {
      title: 'Meal Plan Created',
      message: 'Your meal plan has been created',
      color: 'green',
    },
    ERROR: {
      title: 'Error',
      message: 'There was an error creating your meal plan',
      color: 'red',
    },
  },
  UPDATE_PLAN: {
    SUCCESS: {
      title: 'Meal Plan Updated',
      message: 'Your meal plan has been updated',
      color: 'green',
    },
    ERROR: {
      title: 'Error',
      message: 'There was an error updating your meal plan',
      color: 'red',
    },
  },
  DELETE_PLAN: {
    SUCCESS: {
      title: 'Meal Plan Deleted',
      message: 'Your meal plan has been deleted',
      color: 'green',
    },
    ERROR: {
      title: 'Error',
      message: 'There was an error deleting your meal plan',
      color: 'red',
    },
  },
};

const createPlanNotification = createNotification(NOTIFICATIONS.CREATE_PLAN);

const updatePlanNotification = createNotification(NOTIFICATIONS.UPDATE_PLAN);

const deletePlanNotification = createNotification(NOTIFICATIONS.DELETE_PLAN);

export { createPlanNotification, updatePlanNotification, deletePlanNotification };
