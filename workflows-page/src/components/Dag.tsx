import React, { useMemo, useEffect, useCallback, useRef } from "react";
import { Box } from "@mui/material";
import ReactFlow, {
  Background,
  ReactFlowProvider,
  Node,
  Edge,
  ReactFlowInstance,
} from "react-flow-renderer";
import { applyDagreLayout } from "./layout";
import CustomNode from "./CustomNode"; 

const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    data: { label: "Task 1" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    type: "custom",
    data: { label: "Task 2" },
    position: { x: 0, y: 0 },
  },
  {
    id: "3",
    type: "custom",
    data: { label: "Task 3" },
    position: { x: 0, y: 0 },
  },
  { id: "4", type: "custom", data: { label: "Task 4" }, position: { x: 0, y: 0 } },
  { id: "5", type: "custom", data: { label: "Task 5" }, position: { x: 0, y: 0 } },
  { id: "6", type: "custom", data: { label: "Task 6" }, position: { x: 0, y: 0 } },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", type: "smoothstep" },
  { id: "e2-3", source: "2", target: "3", type: "smoothstep" },
  { id: "e2-4", source: "2", target: "4", type: "smoothstep" },
  { id: "e2-5", source: "3", target: "5", type: "smoothstep" },
  { id: "e2-6", source: "4", target: "6", type: "smoothstep" },
];

const nodeTypes = {
  custom: CustomNode,
};

const DAGGraph: React.FC = () => {
  const { nodes, edges } = useMemo(
    () => applyDagreLayout(initialNodes, initialEdges),
    []
  );

  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

  const onInit = useCallback((instance: ReactFlowInstance) => {
    reactFlowInstance.current = instance;
    instance.fitView();
  }, []);

  useEffect(() => {
    if (reactFlowInstance.current) {
      reactFlowInstance.current.fitView();
    }
  }, [nodes, edges]);

  return (
    <Box display="flex" height="30vh" width="100%">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onInit={onInit}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          panOnDrag={false}
          zoomOnDoubleClick={false}
          style={{ width: "100%", height: "100%" }}
        >
          <Background color="grey" />
        </ReactFlow>
      </ReactFlowProvider>
    </Box>
  );
};

export default DAGGraph;