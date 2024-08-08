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
  onDataChange: (data: any) => void;
}

const Form: React.FC<FormProps> = ({
  json_schema,
  ui_schema,
  onDataChange,
}) => {
  const [data, setData] = useState(initialData);

  const handleChange = ({ data }: { data: any }) => {
    setData(data);
    onDataChange(data);
  };

  return (
    <JsonForms
      schema={json_schema}
      uischema={ui_schema || undefined}
      data={data}
      renderers={materialRenderers}
      cells={materialCells}
      onChange={handleChange}
    />
  );
};

export default Form;
