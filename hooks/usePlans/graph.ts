import { gql } from '@apollo/client/core';

const GET_PLANS = gql`
  query GetPlans($startDate: Date!, $endDate: Date!) {
    getPlans(startDate: $startDate, endDate: $endDate) {
      id
      isPlaceholder
      name
      timestamp
    }
  }
`;

const SWAP_DATES = gql`
  mutation SwapDates($from: SwapInput!, $to: SwapInput!) {
    swapDates(from: $from, to: $to)
  }
`;

export { GET_PLANS, SWAP_DATES };
