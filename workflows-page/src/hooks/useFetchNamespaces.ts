import { useEffect, useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import { NAMESPACES_QUERY } from "../queries/NamespacesQuery";
import { NamespacesQuery$data } from "../queries/__generated__/NamespacesQuery.graphql";
import { NamespacesQuery } from "../queries/__generated__/NamespacesQuery.graphql";

export default function useFetchNamespaces() {
  const [namespaces, setNamespaces] = useState<
    NamespacesQuery$data["namespaces"]
  >([]);
  const queryData = useLazyLoadQuery<NamespacesQuery>(NAMESPACES_QUERY, {});

  useEffect(() => {
    if (queryData && queryData.namespaces) {
      setNamespaces(queryData.namespaces);
    }
  }, [queryData]);

  return namespaces;
}
