import { gql } from "graphql-request";

export const GET_VISITS = gql`
  query GetVisits {
    visits {
      id
      name
      workflows {
        id
        status
        tasks {
          id
          parent_task
          workflow_id
          name
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
  id: number;
  workflow_id: number;
  name: string;
  status: string;
  parent_task: number;
}

export interface Workflow {
  id: number;
  status: string;
  tasks: Task[];
}

export interface Visit {
  id: number;
  name: string;
  workflows: Workflow[];
}
