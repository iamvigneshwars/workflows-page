import { Container, Grid } from "@mui/material";
import React from "react";
import VisitSelect from "./components/VisitSelect";
import WorkflowCheckboxes from "./components/WorkflowCheckboxes";
import Divider from "@mui/material/Divider";

const Workflows: React.FC = () => {
  return (
    <Container sx={{ p: 1 }}>
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        p={1}
      >
        <Grid item xs={12} sm={6} md={2}>
          <VisitSelect />
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
    </Container>
  );
};

export default Workflows;
