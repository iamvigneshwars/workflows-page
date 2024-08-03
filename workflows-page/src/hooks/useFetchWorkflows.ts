import { useLazyLoadQuery } from "react-relay";
import { WorkflowsQuery } from "../queries/__generated__/WorkflowsQuery.graphql";
import { WORKFLOWS_QUERY } from "../queries/WorkflowsQuery";
import { useEffect, useState } from "react";
import { Workflow } from "../components/Workflow/WorkflowsPage";

export default function useFetchWorkflows(namespace: string) {
  const [hasContinue, setContinue] = useState<string | null | undefined>(null);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  const queryData = useLazyLoadQuery<WorkflowsQuery>(WORKFLOWS_QUERY, {
    namespace: namespace,
    limit: 10,
    completed: true,
    failed: true,
    running: true,
    pending: true,
  });

  useEffect(() => {
    setContinue(queryData.workflows?.pageInfo?.continue);

    const workflowNodes: Workflow[] =
      queryData.workflows?.edges
        ?.map((edge) => edge?.node)
        .filter((node): node is Workflow => node !== undefined) || [];

    setWorkflows(workflowNodes);
  }, [queryData]);

  return { hasContinue, workflows };
}
