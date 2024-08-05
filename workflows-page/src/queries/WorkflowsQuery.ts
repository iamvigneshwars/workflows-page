import { graphql } from "react-relay";

export const WORKFLOWS_QUERY = graphql`
  query WorkflowsQuery(
    $limit: Int
    $continue: String
    $completed: Boolean
    $running: Boolean
    $pending: Boolean
    $failed: Boolean
    $namespace: String!
  ) {
    workflows(
      limit: $limit
      continue: $continue
      completed: $completed
      running: $running
      pending: $pending
      failed: $failed
      namespace: $namespace
    ) {
      pageInfo {
        continue
      }
      edges {
        node {
          id
          name
          tasks {
            id
            workflow_id
            name
            status
            parent_task
          }
          status
        }
      }
    }
  }
`;
