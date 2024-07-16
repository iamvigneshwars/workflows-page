import { gql } from "graphql-request";

export const GET_VISITS = gql`
  query GetVisits {
    visits {
      id
      name
      workflows {
        id
        tasks {
          workflow_id
          status
        }
      }
    }
  }
`;

// Define TypeScript interfaces for the response data
export interface GetVisitsResponse {
  visits: Visit[];
}

export interface Task {
  workflow_id: number;
  status: string;
}

export interface Workflow {
  id: number;
  tasks: Task[];
}

export interface Visit {
  id: number;
  name: string;
  workflows: Workflow[];
}
