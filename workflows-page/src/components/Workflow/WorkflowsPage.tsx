import {
  Container,
  Grid,
  Divider,
  SelectChangeEvent,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { useState } from "react";
import NamespaceSelect from "./SelectNamespace";
import WorkflowList from "./WorkflowAccordian";

export interface Task {
  id: number;
  workflow_id: number;
  name: string;
  status: string;
  parent_task: number;
}

export interface Workflow {
  id: number;
  name: string;
  status: string;
  tasks: Task[];
}

export interface Visit {
  id: number;
  name: string;
  workflows: {
    edges: {
      cursor: string;
      node: Workflow;
    }[];
    pageInfo: {
      endCursor: string | null;
      hasNextPage: boolean;
      continue: string | null;
    };
  };
}

const Workflows: React.FC = () => {
  const [selectedNamespace, setSelectedNamespace] = useState<string>("");
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [completed, setCompleted] = useState<boolean>(true);
  const [running, setRunning] = useState<boolean>(true);
  const [pending, setPending] = useState<boolean>(true);
  const [failed, setFailed] = useState<boolean>(true);

  const handleNamespaceChange = (event: SelectChangeEvent<string>) => {
    setSelectedNamespace(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    switch (name) {
      case "completed":
        setCompleted(checked);
        break;
      case "running":
        setRunning(checked);
        break;
      case "pending":
        setPending(checked);
        break;
      case "failed":
        setFailed(checked);
        break;
      default:
        break;
    }
  };

  return (
    <Container sx={{ p: 1, py: 4 }}>
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        p={1}
      >
        <Grid item xs={12} sm={6} md={2}>
          <NamespaceSelect
            selectedNamespace={selectedNamespace}
            handleChange={handleNamespaceChange}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={8}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Box display="flex" justifyContent="space-between">
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={completed}
                    onChange={handleCheckboxChange}
                    name="completed"
                  />
                }
                label="Completed"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={running}
                    onChange={handleCheckboxChange}
                    name="running"
                  />
                }
                label="Running"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={pending}
                    onChange={handleCheckboxChange}
                    name="pending"
                  />
                }
                label="Pending"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={failed}
                    onChange={handleCheckboxChange}
                    name="failed"
                  />
                }
                label="Failed"
              />
            </FormGroup>
          </Box>
        </Grid>
      </Grid>
      <Divider variant="middle" />
      <Grid container py={2} px={1}>
        {/* <WorkflowList visit={selectedVisit} /> */}
      </Grid>
    </Container>
  );
};

export default Workflows;
