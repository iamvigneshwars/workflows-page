import { graphql } from "react-relay";

export const TEMPLATES_QUERY = graphql`
  query TemplateQuery {
    workflowTemplates {
      name
      UISchema
      jsonSchema
    }
  }
`;
