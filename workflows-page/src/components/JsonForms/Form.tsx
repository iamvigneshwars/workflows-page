import { useState } from "react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";

const schema = {
  type: "object",
  properties: {
    parameter_1: {
      type: "string",
      minLength: 5,
    },
    parameter_2: {
      type: "string",
      minLength: 5,
    },
    parameter_3: {
      type: "string",
      minLength: 5,
    },
    parameter_4: {
      type: "string",
      minLength: 5,
    },
    parameter_5: {
      type: "integer",
      minValue: 3,
    },
  },
};
const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/parameter_1",
    },
    {
      type: "Control",
      scope: "#/properties/parameter_2",
    },
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/parameter_3",
        },
        {
          type: "Control",
          scope: "#/properties/parameter_4",
        },
        {
          type: "Control",
          scope: "#/properties/parameter_5",
        },
      ],
    },
  ],
};
const initialData = {};
function Form() {
  const [data, setData] = useState(initialData);
  return (
    <JsonForms
      schema={schema}
      uischema={uischema}
      data={data}
      renderers={materialRenderers}
      cells={materialCells}
      onChange={({ data }) => setData(data)}
    />
  );
}
export default Form;
