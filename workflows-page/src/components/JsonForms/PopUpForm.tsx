import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import Form from "./Form";
import { JsonSchema, UISchemaElement } from "@jsonforms/core";

interface PopUpFormProps {
  open: boolean;
  onClose: () => void;
  json_schema: JsonSchema;
  ui_schema: UISchemaElement | null;
}

const PopUpForm: React.FC<PopUpFormProps> = ({
  open,
  onClose,
  json_schema,
  ui_schema,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Parameters</DialogTitle>
      <DialogContent>
        <Form json_schema={json_schema} ui_schema={ui_schema} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={onClose} color="primary">
          submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopUpForm;
