import { useLazyLoadQuery } from "react-relay";
import { NAMESPACES_QUERY } from "../../queries/NamespacesQuery";
import type { NamespacesQuery } from "../../queries/__generated__/NamespacesQuery.graphql";

export default function Newsfeed({}) {
  const queryData = useLazyLoadQuery<NamespacesQuery>(NAMESPACES_QUERY, {});
  return <div>{queryData.namespaces}</div>;
}
