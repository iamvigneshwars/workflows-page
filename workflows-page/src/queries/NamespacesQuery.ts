import { graphql } from "react-relay";

export const NAMESPACES_QUERY = graphql`
  query NamespacesQuery {
    namespaces
  }
`;
