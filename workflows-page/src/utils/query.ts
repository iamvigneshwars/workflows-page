import { gql } from "graphql-request";

export const gql_query = gql`
  query Visits(
    $after: String
    $limit: Int
    $completed: Boolean
    $running: Boolean
    $pending: Boolean
    $failed: Boolean
  ) {
    visits {
      id
      name
      workflows(
        after: $after
        limit: $limit
        completed: $completed
        running: $running
        pending: $pending
        failed: $failed
      ) {
        edges {
          cursor
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
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;
