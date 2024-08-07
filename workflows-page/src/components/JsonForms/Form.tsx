import React, { useState } from "react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import { JsonSchema, UISchemaElement } from "@jsonforms/core";

const initialData = {};

interface FormProps {
  json_schema: JsonSchema;
  ui_schema: UISchemaElement | null;
}

const Form: React.FC<FormProps> = ({ json_schema, ui_schema }) => {
  const [data, setData] = useState(initialData);

  if (ui_schema !== null) {
    return (
      <JsonForms
        schema={json_schema}
        uischema={ui_schema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => setData(data)}
      />
    );
  } else {
    return (
      <JsonForms
        schema={json_schema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => setData(data)}
      />
    );
  }
};

export default Form;
