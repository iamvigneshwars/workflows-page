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
import React, { useEffect, useState } from "react";
import VisitSelect from "./VisitSelect";
import WorkflowList from "./WorkflowAccordian";
import Test from "./SelectNamespace";
interface GetVisitsResponse {
  visits: Visit[];
}

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
  const [visits, setVisits] = useState<Visit[]>([]);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [selectedVisitId, setSelectedVisitId] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(true);
  const [running, setRunning] = useState<boolean>(true);
  const [pending, setPending] = useState<boolean>(true);
  const [failed, setFailed] = useState<boolean>(true);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedVisitId: string = event.target.value as string;
    const visit =
      visits.find((visit) => visit.id === parseInt(event.target.value)) || null;
    setSelectedVisitId(selectedVisitId);
    setSelectedVisit(visit);
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
          <VisitSelect
            visits={visits}
            selectedVisitId={selectedVisitId}
            handleChange={handleChange}
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
        <WorkflowList visit={selectedVisit} />
      </Grid>
      {/* <VisitsComponent /> */}
    </Container>
  );
};

export default Workflows;
