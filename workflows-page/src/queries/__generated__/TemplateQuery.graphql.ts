/**
 * @generated SignedSource<<afbcf9f7674920e99ca0ec3dff61527c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type TemplateQuery$variables = Record<PropertyKey, never>;
export type TemplateQuery$data = {
  readonly workflowTemplates: ReadonlyArray<{
    readonly UISchema: any | null | undefined;
    readonly jsonSchema: any | null | undefined;
    readonly name: string | null | undefined;
  } | null | undefined> | null | undefined;
};
export type TemplateQuery = {
  response: TemplateQuery$data;
  variables: TemplateQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Template",
    "kind": "LinkedField",
    "name": "workflowTemplates",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "UISchema",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "jsonSchema",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TemplateQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TemplateQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "bee361bc515a5b0398439939577829e4",
    "id": null,
    "metadata": {},
    "name": "TemplateQuery",
    "operationKind": "query",
    "text": "query TemplateQuery {\n  workflowTemplates {\n    name\n    UISchema\n    jsonSchema\n  }\n}\n"
  }
};
})();

(node as any).hash = "4e17c21f3a2cf12125f5a3a4e98625d5";

export default node;
