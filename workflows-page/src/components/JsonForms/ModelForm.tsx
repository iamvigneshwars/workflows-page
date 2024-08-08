import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import Form from "./Form";
import { JsonSchema, UISchemaElement } from "@jsonforms/core";
import { useMutation } from "react-relay";
import { WorkflowTemplateMutation } from "../../mutations/__generated__/WorkflowTemplateMutation.graphql";
import { TEMPLATES_MUTATION } from "../../mutations/WorkflowTemplateMutation";

interface PopUpFormProps {
  open: boolean;
  onClose: () => void;
  json_schema: JsonSchema;
  ui_schema: UISchemaElement | null;
}

const ModalForm: React.FC<PopUpFormProps> = ({
  open,
  onClose,
  json_schema,
  ui_schema,
}) => {
  const [formData, setFormData] = useState({});
  const [commitMutation, isMutationInFlight] =
    useMutation<WorkflowTemplateMutation>(TEMPLATES_MUTATION);

  const handleFormDataChange = (data: object) => {
    setFormData(data);
  };

  const handleSubmit = () => {
    commitMutation({
      variables: {
        inputTemplate: formData,
        namespace: "",
      },
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Parameters</DialogTitle>
      <DialogContent>
        <Form
          json_schema={json_schema}
          ui_schema={ui_schema}
          onDataChange={handleFormDataChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={isMutationInFlight}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalForm;
