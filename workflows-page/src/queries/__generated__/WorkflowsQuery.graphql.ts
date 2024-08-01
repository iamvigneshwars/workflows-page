/**
 * @generated SignedSource<<c535e9806418ffa0309ab69911cfa47e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type WorkflowsQuery$variables = {
  completed?: boolean | null | undefined;
  failed?: boolean | null | undefined;
  limit?: number | null | undefined;
  namespace: string;
  pending?: boolean | null | undefined;
  running?: boolean | null | undefined;
};
export type WorkflowsQuery$data = {
  readonly workflows: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: number | null | undefined;
        readonly name: string | null | undefined;
        readonly status: string | null | undefined;
        readonly tasks: ReadonlyArray<{
          readonly id: number | null | undefined;
          readonly name: string | null | undefined;
          readonly parent_task: number | null | undefined;
          readonly status: string | null | undefined;
          readonly workflow_id: number | null | undefined;
        } | null | undefined> | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
    readonly pageInfo: {
      readonly continue: string | null | undefined;
      readonly hasNextPage: boolean | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type WorkflowsQuery = {
  response: WorkflowsQuery$data;
  variables: WorkflowsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "completed"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "failed"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "limit"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "namespace"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "pending"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "running"
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v9 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "completed",
        "variableName": "completed"
      },
      {
        "kind": "Variable",
        "name": "failed",
        "variableName": "failed"
      },
      {
        "kind": "Variable",
        "name": "limit",
        "variableName": "limit"
      },
      {
        "kind": "Variable",
        "name": "namespace",
        "variableName": "namespace"
      },
      {
        "kind": "Variable",
        "name": "pending",
        "variableName": "pending"
      },
      {
        "kind": "Variable",
        "name": "running",
        "variableName": "running"
      }
    ],
    "concreteType": "WorkflowConnection",
    "kind": "LinkedField",
    "name": "workflows",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "PageInfo",
        "kind": "LinkedField",
        "name": "pageInfo",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "continue",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasNextPage",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "WorkflowEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Workflow",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Task",
                "kind": "LinkedField",
                "name": "tasks",
                "plural": true,
                "selections": [
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "workflow_id",
                    "storageKey": null
                  },
                  (v7/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "parent_task",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "WorkflowsQuery",
    "selections": (v9/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v5/*: any*/),
      (v4/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "WorkflowsQuery",
    "selections": (v9/*: any*/)
  },
  "params": {
    "cacheID": "07bb24c7607f447e33343043e4da9185",
    "id": null,
    "metadata": {},
    "name": "WorkflowsQuery",
    "operationKind": "query",
    "text": "query WorkflowsQuery(\n  $limit: Int\n  $completed: Boolean\n  $running: Boolean\n  $pending: Boolean\n  $failed: Boolean\n  $namespace: String!\n) {\n  workflows(limit: $limit, completed: $completed, running: $running, pending: $pending, failed: $failed, namespace: $namespace) {\n    pageInfo {\n      continue\n      hasNextPage\n    }\n    edges {\n      node {\n        id\n        name\n        tasks {\n          id\n          workflow_id\n          name\n          status\n          parent_task\n        }\n        status\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d54741fb36e1b5b9ffe3f8c338f8b0a6";

export default node;
