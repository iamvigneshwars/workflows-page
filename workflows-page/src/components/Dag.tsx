import React, {
  useMemo,
  useEffect,
  useCallback,
  useRef,
  useState,
} from "react";
import { Box } from "@mui/material";
import ReactFlow, {
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

const generateNodesAndEdges = (
  taskNodes: TaskNode[]
): { nodes: Node[]; edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const traverse = (tasks: TaskNode[], parentId?: string) => {
    tasks.forEach((task) => {
      nodes.push({
        id: task.id.toString(),
        type: "custom",
        data: { label: task.name, status: task.status },
        position: { x: 0, y: 0 },
      });

      if (parentId) {
        edges.push({
          id: `e${parentId}-${task.id.toString()}`,
          source: parentId,
          target: task.id.toString(),
          type: "smoothstep",
        });
      }

      if (task.children && task.children.length > 0) {
        traverse(task.children, task.id.toString());
      }
    });
  };

  traverse(taskNodes);
  return { nodes, edges };
};

interface DAGGraphProps {
  tasks: Task[];
}

const DAGGraph: React.FC<DAGGraphProps> = ({ tasks }) => {
  const taskTree = useMemo(() => buildTaskTree(tasks), [tasks]);
  const { nodes, edges } = useMemo(
    () => generateNodesAndEdges(taskTree),
    [taskTree]
  );

  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
    () => applyDagreLayout(nodes, edges),
    [nodes, edges]
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
        const boundingBox = getRectOfNodes(layoutedNodes);

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
  }, [layoutedNodes, layoutedEdges]);

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
              <TaskTable tasks={tasks} />
            </Box>
          ) : (
            <ReactFlow
              nodes={layoutedNodes}
              edges={layoutedEdges}
              nodeTypes={{ custom: CustomNode }}
              onInit={onInit}
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
              zoomOnScroll={false}
              zoomOnPinch={false}
              panOnDrag={false}
              zoomOnDoubleClick={false}
              style={{ width: "100%", height: "100%" }}
            ></ReactFlow>
          )}
        </div>
      </ReactFlowProvider>
    </Box>
  );
};

export default DAGGraph;
