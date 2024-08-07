/**
 * @generated SignedSource<<4c18bfd65edd6edca4e6d45698240db4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type WorkflowTemplateMutation$variables = {
  inputTemplate: any;
  namespace: string;
};
export type WorkflowTemplateMutation$data = {
  readonly submitWorkflowTemplate: {
    readonly namespace: string | null | undefined;
    readonly template: any | null | undefined;
  } | null | undefined;
};
export type WorkflowTemplateMutation = {
  response: WorkflowTemplateMutation$data;
  variables: WorkflowTemplateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "inputTemplate"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "namespace"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "inputTemplate",
        "variableName": "inputTemplate"
      },
      {
        "kind": "Variable",
        "name": "namespace",
        "variableName": "namespace"
      }
    ],
    "concreteType": "UserWorkflowTemplate",
    "kind": "LinkedField",
    "name": "submitWorkflowTemplate",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "namespace",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "template",
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
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "WorkflowTemplateMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "WorkflowTemplateMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "9322c4a39a769c826f2eea27164382c5",
    "id": null,
    "metadata": {},
    "name": "WorkflowTemplateMutation",
    "operationKind": "mutation",
    "text": "mutation WorkflowTemplateMutation(\n  $namespace: String!\n  $inputTemplate: JSON!\n) {\n  submitWorkflowTemplate(namespace: $namespace, inputTemplate: $inputTemplate) {\n    namespace\n    template\n  }\n}\n"
  }
};
})();

(node as any).hash = "9072de87fb4d63d3a7344b38c8954ac1";

export default node;
