import { Box, Typography } from "@mui/material";
import React from "react";
import { Handle, Position } from "react-flow-renderer";
import { getStatusIcon } from "../../utils/helper";
import { truncateLabel } from "../../utils/helper";
interface CustomNodeProps {
  data: {
    label: string;
    status: string;
  };
}

const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  const truncatedLabel = truncateLabel(data.label);
  return (
    <Box style={{ padding: 8, border: "1px solid #ddd", borderRadius: 8 }}>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
      />
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        padding={0.5}
        minWidth={110}
      >
        <Typography variant="body1">{truncatedLabel}</Typography>
        {getStatusIcon(data.status)}
      </Box>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
      />
    </Box>
  );
};

export default CustomNode;
