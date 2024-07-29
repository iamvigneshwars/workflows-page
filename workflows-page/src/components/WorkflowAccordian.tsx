import React from "react";
import {
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  Box,
  styled,
} from "@mui/material";
import { Task, Visit } from "./Workflows";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import DAGGraph from "./Dag";
import { getStatusIcon } from "../utils/helper";

interface VariantsProps {
  visit: Visit | null;
}

interface TaskNode extends Task {
  children?: TaskNode[];
}

const buildTaskTree = (tasks: Task[]): TaskNode[] => {
  const taskMap: { [key: string]: TaskNode } = {};
  const roots: TaskNode[] = [];

  tasks.forEach((task) => {
    taskMap[task.id] = { ...task, children: [] };
  });

  tasks.forEach((task) => {
    if (task.parent_task) {
      if (taskMap[task.parent_task]) {
        taskMap[task.parent_task].children!.push(taskMap[task.id]);
      }
    } else {
      roots.push(taskMap[task.id]);
    }
  });

  return roots;
};

const renderTaskTree = (tasks: TaskNode[]) => {
  return (
    <SimpleTreeView disableSelection>
      {tasks.map((task) => (
        <TreeItem
          itemId={task.name}
          label={
            <Box display="flex" justifyContent="space-between">
              <Typography sx={{ marginLeft: 1 }}>{task.name}</Typography>
              {getStatusIcon(task.status, 20)}
            </Box>
          }
        >
          {task.children &&
            task.children.length > 0 &&
            renderTaskTree(task.children)}
        </TreeItem>
      ))}
    </SimpleTreeView>
  );
};

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
