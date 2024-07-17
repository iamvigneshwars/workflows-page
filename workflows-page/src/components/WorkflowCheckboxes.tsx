import { Checkbox, FormControlLabel, FormGroup, Box } from "@mui/material";

export default function WorkflowCheckboxes() {
  return (
    <Box display="flex" justifyContent="space-between">
      <FormGroup row>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Completed"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Running"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Pending"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Failed"
        />
      </FormGroup>
    </Box>
  );
}
