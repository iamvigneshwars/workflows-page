import React, { useState } from "react";
import {
  Stack,
  Paper,
  styled,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import PendingTwoToneIcon from "@mui/icons-material/PendingTwoTone";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import Popover from "@mui/material/Popover";
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
      return <CheckCircleTwoToneIcon color="success" />;
    case "running":
      return <CircularProgress color="info" size={18} />;
    case "pending":
      return <PendingTwoToneIcon color="warning" />;
    case "failed":
      return <ErrorTwoToneIcon color="error" />;
    default:
      return null;
  }
};

interface VariantsProps {
  visit: Visit | null;
}

const WorkflowList: React.FC<VariantsProps> = ({ visit }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedTasks, selectTasks] = useState<Task[]>([]);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    workflow: Workflow
  ) => {
    setAnchorEl(event.currentTarget);
    selectTasks(workflow.tasks);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "tasks-popover" : undefined;

  return (
    <Stack direction="column" spacing={2} sx={{ width: "96%" }}>
      {visit?.workflows?.map((workflow) => (
        <WorkflowPaper key={workflow.id} variant="elevation" elevation={6}>
          <span>Workflow {workflow.id}</span>
          <IconButton onClick={(event) => handleClick(event, workflow)}>
            {getStatusIcon(workflow.status)}
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            PaperProps={{
              style: { maxHeight: "300px", overflow: "auto" },
            }}
          >
            <List>
              {selectedTasks.map((task) => (
                <ListItem key={task.name}>
                  <ListItemText primary={task.name} />
                  <IconButton edge="end">
                    {getStatusIcon(task.status)}
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Popover>
        </WorkflowPaper>
      ))}
    </Stack>
  );
};

export default WorkflowList;
