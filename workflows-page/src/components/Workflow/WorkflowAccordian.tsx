import React from "react";
import {
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  Box,
  styled,
} from "@mui/material";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import DAGGraph from "./TasksDAG";
import { getStatusIcon } from "../../utils/helper";
import { Workflow } from "./WorkflowsPage";

interface WorkflowsProps {
  workflows: Workflow[];
}

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const WorkflowList: React.FC<WorkflowsProps> = ({ workflows }) => {
  return (
    <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
      {workflows.map((workflow) => {
        return (
          <Accordion key={workflow.id}>
            <AccordionSummary
              expandIcon={getStatusIcon(workflow.status)}
              sx={{
                "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                  transform: "none",
                },
              }}
            >
              <Typography>{workflow.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box maxWidth="95%">
                <DAGGraph tasks={workflow.tasks} />
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Stack>
  );
};

export default WorkflowList;
