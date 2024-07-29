import React from 'react';
import { Box, Typography } from '@mui/material';
import { Task } from './Workflows';

interface TaskTableProps {
  tasks: Task[];
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks }) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(150px, 1fr))"
      gap={2}
      padding={2}
    >
      {tasks.map(task => (
        <Box
          key={task.id}
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding={2}
          border={1}
          borderColor="grey.300"
          borderRadius={1}
          sx={{
            backgroundColor: 'background.paper',
            textAlign: 'center',
          }}
        >
          <Typography variant="body1">
            {task.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TaskTable;

