import { useEffect, useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import { TEMPLATES_QUERY } from "../queries/TemplateQuery";
import type { TemplateQuery$data } from "../queries/__generated__/TemplateQuery.graphql";
import { TemplateQuery } from "../queries/__generated__/TemplateQuery.graphql";

export default function useFetchWorkflowTemplates() {
  const [templates, setTemplates] = useState<
    TemplateQuery$data["workflowTemplates"]
  >([]);
  const queryData = useLazyLoadQuery<TemplateQuery>(TEMPLATES_QUERY, {});

  useEffect(() => {
    if (queryData && queryData.workflowTemplates) {
      setTemplates([...queryData.workflowTemplates]);
    }
  }, [queryData]);

  return templates;
}
