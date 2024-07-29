import React, {
  useMemo,
  useEffect,
  useCallback,
  useRef,
  useState,
} from "react";
import { Box } from "@mui/material";
import ReactFlow, {
  Background,
  ReactFlowProvider,
  Node,
  Edge,
  ReactFlowInstance,
  getRectOfNodes,
} from "react-flow-renderer";
import { applyDagreLayout } from "../utils/layout";
import CustomNode from "./CustomNode";
import { Task } from "./Workflows";
import TaskTable from "./TaskTable";

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
  {
    id: "4",
    type: "custom",
    data: { label: "Task 4" },
    position: { x: 0, y: 0 },
  },
  {
    id: "5",
    type: "custom",
    data: { label: "Task 5" },
    position: { x: 0, y: 0 },
  },
  {
    id: "6",
    type: "custom",
    data: { label: "Task 6" },
    position: { x: 0, y: 0 },
  },
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

interface DAGGraphProps {
  tasks: Task[];
}

const DAGGraph: React.FC<DAGGraphProps> = ({ tasks }) => {
  const { nodes, edges } = useMemo(
    () => applyDagreLayout(initialNodes, initialEdges),
    []
  );

  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOverflow, setIsOverflow] = useState(false);

  const onInit = useCallback((instance: ReactFlowInstance) => {
    reactFlowInstance.current = instance;
    instance.fitView();
  }, []);

  useEffect(() => {
    const fitWindowResize = () => {
      if (reactFlowInstance.current) {
        reactFlowInstance.current.fitView();
      }
    };

    const checkOverflow = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const boundingBox = getRectOfNodes(nodes);

        if (boundingBox.width > width || boundingBox.height > height) {
          setIsOverflow(true);
        } else {
          setIsOverflow(false);
        }
      }
    };

    const handleResizeAndOverflow = () => {
      fitWindowResize();
      checkOverflow();
    };

    handleResizeAndOverflow();
    window.addEventListener("resize", handleResizeAndOverflow);

    return () => {
      window.removeEventListener("resize", handleResizeAndOverflow);
    };
  }, [nodes, edges]);

  return (
    <Box display="flex" height="30vh" width="100%">
      <ReactFlowProvider>
        <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
          {isOverflow ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              {/* <TaskTable tasks={{tasks}} /> */}
              <TaskTable tasks={tasks} />
            </Box>
          ) : (
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
          )}
        </div>
      </ReactFlowProvider>
    </Box>
  );
};

export default DAGGraph;
