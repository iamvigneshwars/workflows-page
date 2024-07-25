import React, { useMemo } from "react";
import ReactFlow, {
  Controls,
  Background,
  ReactFlowProvider,
  Node,
  Edge,
} from "react-flow-renderer";
import { applyDagreLayout } from "./layout";

const initialNodes: Node[] = [
  { id: "1", data: { label: "Task 1" }, position: { x: 0, y: 0 } },
  { id: "2", data: { label: "Task 2" }, position: { x: 0, y: 0 } },
  { id: "3", data: { label: "Task 3" }, position: { x: 0, y: 0 } },
  { id: "4", data: { label: "Task 4" }, position: { x: 0, y: 0 } },
];

const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];

const DAGGraph: React.FC = () => {
  const { nodes, edges } = useMemo(
    () => applyDagreLayout(initialNodes, initialEdges),
    []
  );

  return (
    <div style={{ height: "30vh" }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          style={{ width: "100%", height: "100%" }}
        >
          <Controls />
          <Background color="grey" />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default DAGGraph;
