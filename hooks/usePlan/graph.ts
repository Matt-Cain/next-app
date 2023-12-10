import { gql } from '@apollo/client/core';

export const CREATE_PLAN = gql`
  mutation CreatePlan($timestamp: Date!, $name: String, $isPlaceholder: Boolean) {
    createPlan(timestamp: $timestamp, name: $name, isPlaceholder: $isPlaceholder) {
      id
    }
  }
`;

export const UPDATE_PLAN = gql`
  mutation UpdatePlan($entree: ID, $id: ID!, $isPlaceholder: Boolean, $name: String, $sides: [ID]) {
    updatePlan(entree: $entree, id: $id, isPlaceholder: $isPlaceholder, name: $name, sides: $sides)
  }
`;

export const DELETE_PLAN = gql`
  mutation DeletePlan($id: ID!) {
    deletePlan(id: $id)
  }
`;

export const GET_PLAN = gql`
  query GetPlan($id: ID!) {
    getPlan(id: $id) {
      id
      timestamp
      name
      entree {
        id
        type
        name
        recipe
        ingredients {
          name
          quantity
          unit
        }
      }
      sides {
        id
        type
        name
        recipe
      }
      isPlaceholder
    }
  }
`;
