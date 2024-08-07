import { graphql } from "react-relay";

export const TEMPLATES_QUERY = graphql`
  mutation WorkflowTemplateMutation(
    $namespace: String!
    $inputTemplate: JSON!
  ) {
    submitWorkflowTemplate(
      namespace: $namespace
      inputTemplate: $inputTemplate
    ) {
      namespace
      template
    }
  }
`;
