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
import request from "graphql-request";
import { gql } from "graphql-request";

export const GET_VISITS = gql`
  query GetVisits(
    $completed: Boolean
    $running: Boolean
    $pending: Boolean
    $failed: Boolean
  ) {
    visits {
      id
      name
      workflows(
        completed: $completed
        running: $running
        pending: $pending
        failed: $failed
      ) {
        id
        status
        tasks {
          id
          parent_task
          workflow_id
          name
          status
        }
      }
    }
  }
`;

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
  status: string;
  tasks: Task[];
}

export interface Visit {
  id: number;
  name: string;
  workflows: Workflow[];
}

const endpoint: string = "http://localhost:4001";

const Workflows: React.FC = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [selectedVisitId, setSelectedVisitId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState<boolean>(true);
  const [running, setRunning] = useState<boolean>(true);
  const [pending, setPending] = useState<boolean>(true);
  const [failed, setFailed] = useState<boolean>(true);

  const fetchData = async (filters = {}) => {
    setLoading(true);
    try {
      const data = await request<GetVisitsResponse>(
        endpoint,
        GET_VISITS,
        filters
      );
      setVisits(data.visits);
      if (selectedVisitId) {
        const visit =
          data.visits.find((visit) => visit.id === parseInt(selectedVisitId)) ||
          null;
        setSelectedVisit(visit);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData({ completed, running, pending, failed });
  }, [completed, running, pending, failed]);

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

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
    </Container>
  );
};

export default Workflows;
