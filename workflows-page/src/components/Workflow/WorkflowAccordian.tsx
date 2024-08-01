import React from "react";
import {
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  Box,
  styled,
} from "@mui/material";
import { Visit } from "./WorkflowsPage";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import DAGGraph from "./TasksDAG";
import { getStatusIcon } from "../../utils/helper";

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
      {visit?.workflows?.edges.map((edge) => {
        return (
          <Accordion key={edge.node.id}>
            <AccordionSummary
              expandIcon={getStatusIcon(edge.node.status)}
              sx={{
                "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                  transform: "none",
                },
              }}
            >
              <Typography>{edge.node.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box maxWidth="95%">
                <DAGGraph tasks={edge.node.tasks} />
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Stack>
  );
};

export default WorkflowList;
