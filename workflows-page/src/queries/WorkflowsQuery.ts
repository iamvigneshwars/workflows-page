import { graphql } from "react-relay";

export const WORKFLOWS_QUERY = graphql`
  query WorkflowsQuery(
    $limit: Int
    $completed: Boolean
    $running: Boolean
    $pending: Boolean
    $failed: Boolean
    $namespace: String!
  ) {
    workflows(
      limit: $limit
      completed: $completed
      running: $running
      pending: $pending
      failed: $failed
      namespace: $namespace
    ) {
      pageInfo {
        continue
        hasNextPage
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
