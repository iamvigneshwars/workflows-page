import { useEffect, useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import { NAMESPACES_QUERY } from "../queries/NamespacesQuery";
import { NamespacesQuery } from "../queries/__generated__/NamespacesQuery.graphql";

export default function useFetchNamespaces() {
  const [namespaces, setNamespaces] = useState<string[]>([]);
  const queryData = useLazyLoadQuery<NamespacesQuery>(NAMESPACES_QUERY, {});

  useEffect(() => {
    if (queryData && queryData.namespaces) {
      const validNamespaces: string[] = queryData.namespaces
        .filter((namespace): namespace is string => namespace != null)
        .map((namespace) => namespace as string);
      setNamespaces(validNamespaces);
    }
  }, [queryData]);

  return namespaces;
}
