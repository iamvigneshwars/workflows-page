/**
 * @generated SignedSource<<34b9d6215892c6d222813e392ad1f32b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type WorkflowsQuery$variables = {
  completed?: boolean | null | undefined;
  continue?: string | null | undefined;
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
        readonly id: string | null | undefined;
        readonly name: string | null | undefined;
        readonly status: string | null | undefined;
        readonly tasks: ReadonlyArray<{
          readonly id: string | null | undefined;
          readonly name: string | null | undefined;
          readonly parent_task: number | null | undefined;
          readonly status: string | null | undefined;
          readonly workflow_id: number | null | undefined;
        } | null | undefined> | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
    readonly pageInfo: {
      readonly continue: string | null | undefined;
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
  "name": "continue"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "failed"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "limit"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "namespace"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "pending"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "running"
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v10 = [
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
        "name": "continue",
        "variableName": "continue"
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
              (v7/*: any*/),
              (v8/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Task",
                "kind": "LinkedField",
                "name": "tasks",
                "plural": true,
                "selections": [
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "workflow_id",
                    "storageKey": null
                  },
                  (v8/*: any*/),
                  (v9/*: any*/),
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
              (v9/*: any*/)
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
      (v5/*: any*/),
      (v6/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "WorkflowsQuery",
    "selections": (v10/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/),
      (v6/*: any*/),
      (v5/*: any*/),
      (v2/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Operation",
    "name": "WorkflowsQuery",
    "selections": (v10/*: any*/)
  },
  "params": {
    "cacheID": "855daa8681d94a7caab0677e9ba8b0ed",
    "id": null,
    "metadata": {},
    "name": "WorkflowsQuery",
    "operationKind": "query",
    "text": "query WorkflowsQuery(\n  $limit: Int\n  $continue: String\n  $completed: Boolean\n  $running: Boolean\n  $pending: Boolean\n  $failed: Boolean\n  $namespace: String!\n) {\n  workflows(limit: $limit, continue: $continue, completed: $completed, running: $running, pending: $pending, failed: $failed, namespace: $namespace) {\n    pageInfo {\n      continue\n    }\n    edges {\n      node {\n        id\n        name\n        tasks {\n          id\n          workflow_id\n          name\n          status\n          parent_task\n        }\n        status\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ee16f816785cbd6926605440cb50d911";

export default node;
