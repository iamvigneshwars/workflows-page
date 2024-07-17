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
  workflow_id: number;
  name: string;
  status: string;
}

export interface Workflow {
  id: number;
  status: String;
  tasks: Task[];
}

export interface Visit {
  id: number;
  name: string;
  workflows: Workflow[];
}
