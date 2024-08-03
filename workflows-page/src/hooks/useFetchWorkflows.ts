import { useLazyLoadQuery } from "react-relay";
import { WorkflowsQuery } from "../queries/__generated__/WorkflowsQuery.graphql";
import { WORKFLOWS_QUERY } from "../queries/WorkflowsQuery";

export default function useFetchWorkflows() {
  const queryData = useLazyLoadQuery<WorkflowsQuery>(WORKFLOWS_QUERY, {
    namespace: "namespace-1",
    limit: 10,
    completed: true,
    failed: true,
    running: true,
    pending: true,
    after: "10",
  });
  console.log(queryData.workflows);
}
