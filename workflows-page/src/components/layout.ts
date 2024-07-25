import dagre from "dagre";
import { Node, Edge } from "react-flow-renderer";

export function applyDagreLayout(
  nodes: Node[],
  edges: Edge[]
): { nodes: Node[]; edges: Edge[] } {
  const g = new dagre.graphlib.Graph();

  g.setGraph({ rankdir: "LR" });
  g.setDefaultEdgeLabel(() => ({}));

  nodes.forEach((node) => {
    g.setNode(node.id, { width: 150, height: 40 });
  });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  nodes.forEach((node) => {
    const nodeData = g.node(node.id);
    if (nodeData) {
      node.position = { x: nodeData.x || 0, y: nodeData.y || 0 };
    }
  });

  return { nodes, edges };
}
