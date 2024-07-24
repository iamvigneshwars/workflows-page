import { Container, Grid, Divider, SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";
import VisitSelect from "./VisitSelect";
import WorkflowList from "./WorkflowAccordian";
import WorkflowCheckboxes from "./WorkflowCheckboxes";
import request from "graphql-request";
import { gql } from "graphql-request";

export const GET_VISITS = gql`
  query GetVisits {
    visits {
      id
      name
      workflows {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await request<GetVisitsResponse>(endpoint, GET_VISITS);
        setVisits(data.visits);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedVisitId: string = event.target.value as string;
    const visit =
      visits.find((visit) => visit.id === parseInt(event.target.value)) || null;
    setSelectedVisitId(selectedVisitId);
    setSelectedVisit(visit);
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
          <WorkflowCheckboxes />
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
