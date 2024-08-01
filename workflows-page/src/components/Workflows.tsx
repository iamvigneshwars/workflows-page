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
import { gql_query } from "../utils/query";

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
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const fetchData = async (filters = {}, cursor: string | null = null) => {
    setLoading(true);
    try {
      const variables = {
        limit: 10,
        after: cursor,
        ...filters,
      };
      const data = await request<GetVisitsResponse>(
        endpoint,
        gql_query,
        variables
      );
      const newVisits = data.visits.map((visit) => ({
        ...visit,
        workflows: {
          edges: visit.workflows.edges,
          pageInfo: visit.workflows.pageInfo,
        },
      }));

      setVisits((prevVisits) =>
        cursor ? [...prevVisits, ...newVisits] : newVisits
      );
      setEndCursor(selectedVisit?.workflows.pageInfo.endCursor || null);
      setHasNextPage(selectedVisit?.workflows.pageInfo.hasNextPage || false);
      // setEndCursor(data.visits[0]?.workflows.pageInfo.endCursor || null);
      // setHasNextPage(data.visits[0]?.workflows.pageInfo.hasNextPage || false);

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

  const loadMore = () => {
    if (hasNextPage) {
      fetchData({ completed, running, pending, failed }, endCursor);
    }
  };

  if (loading) return <p>Loading...</p>;
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
      {hasNextPage && (
        <Box display="flex" justifyContent="center" py={2}>
          <button onClick={loadMore}>Load More</button>
        </Box>
      )}
    </Container>
  );
};

export default Workflows;
