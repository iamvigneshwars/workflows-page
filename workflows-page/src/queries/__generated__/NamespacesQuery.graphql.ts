/**
 * @generated SignedSource<<b4666049ed5d5b786dead2153f9beae3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from "relay-runtime";
export type NamespacesQuery$variables = Record<PropertyKey, never>;
export type NamespacesQuery$data = {
  map(
    arg0: (visit: any) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;
  readonly namespaces:
    | ReadonlyArray<string | null | undefined>
    | null
    | undefined;
};
export type NamespacesQuery = {
  response: NamespacesQuery$data;
  variables: NamespacesQuery$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "namespaces",
      storageKey: null,
    },
  ];
  return {
    fragment: {
      argumentDefinitions: [],
      kind: "Fragment",
      metadata: null,
      name: "NamespacesQuery",
      selections: v0 /*: any*/,
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [],
      kind: "Operation",
      name: "NamespacesQuery",
      selections: v0 /*: any*/,
    },
    params: {
      cacheID: "bf7cbcbc43fa4040118589ba5589a335",
      id: null,
      metadata: {},
      name: "NamespacesQuery",
      operationKind: "query",
      text: "query NamespacesQuery {\n  namespaces\n}\n",
    },
  };
})();

(node as any).hash = "632ecca63c838c0c131c4d030e6a722f";

export default node;
