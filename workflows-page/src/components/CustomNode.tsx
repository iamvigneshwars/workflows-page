import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

interface CustomNodeProps {
  data: {
    label: string;
  };
}

const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  return (
    <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 3 }}>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
      />
      <div>{data.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default CustomNode;