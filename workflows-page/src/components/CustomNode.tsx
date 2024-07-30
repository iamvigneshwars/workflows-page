import { Box, Typography } from "@mui/material";
import React from "react";
import { Handle, Position } from "react-flow-renderer";
import { getStatusIcon } from "../utils/helper";

interface CustomNodeProps {
  data: {
    label: string;
    status: string;
  };
}

const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  return (
    <Box style={{ padding: 8, border: "1px solid #ddd", borderRadius: 8 }}>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
      />
      <Box display={"flex"} alignContent={"space-between"}>
        <Typography variant="body1">{data.label}</Typography>
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
