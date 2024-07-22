import React from "react";
import {
  Stack,
  styled,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListSubheader,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import PendingRoundedIcon from "@mui/icons-material/PendingRounded";
import ErrorIcon from "@mui/icons-material/Error";
import { Task, Visit, Workflow } from "../graphql";

const WorkflowPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(2),
  ...theme.typography.body1,
  textAlign: "right",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircleIcon color="success" />;
    case "running":
      return <HourglassBottomIcon color="info" />;
    case "pending":
      return <PendingRoundedIcon color="warning" />;
    case "failed":
      return <ErrorIcon color="error" />;
    default:
      return null;
  }
};

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
    <List disablePadding>
      {tasks.map((task) => (
        <ListItem key={task.id} sx={{ pl: task.parent_task ? 4 : 2 }}>
          <ListItemText primary={task.name} />
          {/* <IconButton edge="end">{getStatusIcon(task.status)}</IconButton> */}
          {task.children && task.children.length > 0 && renderTaskTree(task.children)}
        </ListItem>
      ))}
    </List>
  );
};

const WorkflowList: React.FC<VariantsProps> = ({ visit }) => {
  return (
    <Stack direction="column" spacing={2} sx={{ width: "96%" }}>
      {visit?.workflows?.map((workflow) => {
        const taskTree = buildTaskTree(workflow.tasks);
        return (
          <Accordion key={workflow.id}>
            <AccordionSummary expandIcon={getStatusIcon(workflow.status)}>
              <Typography>Workflow {workflow.id}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {renderTaskTree(taskTree)}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Stack>
  );
};

export default WorkflowList;
