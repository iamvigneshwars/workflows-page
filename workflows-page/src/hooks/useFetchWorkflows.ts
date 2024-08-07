import { useLazyLoadQuery } from "react-relay";
import { WorkflowsQuery } from "../queries/__generated__/WorkflowsQuery.graphql";
import { WORKFLOWS_QUERY } from "../queries/WorkflowsQuery";
import type { WorkflowsQuery$variables } from "../queries/__generated__/WorkflowsQuery.graphql";
import { useEffect, useState } from "react";
import { Workflow } from "../components/Workflow/WorkflowsPage";

export default function useFetchWorkflows({
  namespace,
  continue: continueValue,
  completed,
  running,
  pending,
  failed,
}: WorkflowsQuery$variables) {
  const [hasContinue, setContinue] = useState<string | null | undefined>(null);
  const [newWorkflows, setNewWorkflows] = useState<Workflow[]>([]);

  const queryData = useLazyLoadQuery<WorkflowsQuery>(WORKFLOWS_QUERY, {
    namespace,
    continue: continueValue,
    limit: 5,
    completed,
    failed,
    running,
    pending,
  });

  useEffect(() => {
    setContinue(queryData.workflows?.pageInfo?.continue);

    const workflowNodes: Workflow[] =
      queryData.workflows?.edges
        ?.map((edge) => edge?.node)
        .filter((node): node is Workflow => node !== undefined) || [];

    setNewWorkflows(workflowNodes);
  }, [queryData, namespace, completed, running, pending, failed]);

  return { hasContinue, newWorkflows };
}
