import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_PLANS, SWAP_DATES } from './graph';
import { swapDatesNotification } from './notifications';
import { getWeekTimestamps } from '@/utils/dates';
import useDragAndDrop from '@/hooks/useDragAndDrop';

const mapPlans = (plans, timestamps) => {
  const mappedPlans = timestamps.map((timestamp) => {
    const plan = plans.find((p) => new Date(p.timestamp).getTime() === timestamp);

    if (!plan) {
      return {
        timestamp: new Date(timestamp).toISOString(),
      };
    }

    return plan;
  });

  return mappedPlans;
};

const usePlans = ({ range }) => {
  const [startDate, endDate] = range.split('-');

  const [swap] = useMutation(SWAP_DATES, swapDatesNotification);

  const { data, loading, refetch } = useQuery(GET_PLANS, {
    variables: {
      startDate: new Date(Number(startDate)),
      endDate: new Date(Number(endDate)),
    },
  });

  const swapDates = async ({ from, to }) => {
    const res = await swap({
      variables: {
        from: {
          id: from.id,
          timestamp: from.timestamp,
        },
        to: {
          id: to.id,
          timestamp: to.timestamp,
        },
      },
    });

    const success = res?.data?.swapDates;
    if (success) refetch();
    return success;
  };

  const timestamps = getWeekTimestamps({ startDate, endDate });
  const mappedPlans = mapPlans(data?.getPlans || [], timestamps);

  const dnd = useDragAndDrop({ list: mappedPlans, updater: swapDates });

  useEffect(() => {
    dnd.setItems(mappedPlans);
  }, [data?.getPlans]);

  return {
    dnd,
    swapDates,
    loading,
    refetch,
    data: data?.getPlans,
  };
};

export default usePlans;
