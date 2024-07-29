import { Box } from '@mui/material';
import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

interface CustomNodeProps {
  data: {
    label: string;
  };
}

const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  return (
    <Box style={{ padding: 10, border: '1px solid #ddd', borderRadius: 8 }}>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
      />
      <Box>{data.label}</Box>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555' }}
      />
    </Box>
  );
};

export default CustomNode;