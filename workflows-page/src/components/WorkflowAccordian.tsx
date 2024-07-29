import React from "react";
import {
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  Box,
  styled,
} from "@mui/material";
import { Visit } from "./Workflows";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import DAGGraph from "./Dag";
import { getStatusIcon } from "../utils/helper";

interface VariantsProps {
  visit: Visit | null;
}

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const WorkflowList: React.FC<VariantsProps> = ({ visit }) => {
  return (
    <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
      {visit?.workflows?.map((workflow) => {
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
              <Typography>Workflow {workflow.id}</Typography>
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
