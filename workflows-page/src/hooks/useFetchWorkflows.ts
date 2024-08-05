// hooks/useFetchWorkflows.ts
import { useLazyLoadQuery } from "react-relay";
import { WorkflowsQuery } from "../queries/__generated__/WorkflowsQuery.graphql";
import { WORKFLOWS_QUERY } from "../queries/WorkflowsQuery";
import { useEffect, useState } from "react";
import { Workflow } from "../components/Workflow/WorkflowsPage";

interface UseFetchWorkflowsProps {
  namespace: string;
  continueValue: string | null;
  completed: boolean;
  running: boolean;
  pending: boolean;
  failed: boolean;
}

export default function useFetchWorkflows({
  namespace,
  continueValue,
  completed,
  running,
  pending,
  failed,
}: UseFetchWorkflowsProps) {
  const [hasContinue, setContinue] = useState<string | null | undefined>(null);
  const [newWorkflows, setNewWorkflows] = useState<Workflow[]>([]);

  const queryData = useLazyLoadQuery<WorkflowsQuery>(WORKFLOWS_QUERY, {
    namespace,
    continue: continueValue,
    limit: 10,
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
