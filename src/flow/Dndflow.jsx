import React, { useState, useRef, useCallback } from "react";
import FlowRenderer, {
  FlowProvider,
  addConnection,
  useCustomNodesState,
  useCustomEdgesState,
  InteractiveControls,
} from "flow-renderer";
import "flow-renderer/dist/style.css";
import DragAndDropSidebar from "../utils/Sidebar.js";
import "../custom-styles.css";

const initialCustomNodes = [
  {
    id: "custom_node_1",
    type: "source",
    data: { label: <form >
        <input type="file" name="" id="" />
    </form>},
    position: { x: 250, y: 5 },
  },
];

const initialCustomEdges = [
  { id: "e1-2", source: "custom_node_1", target: "custom_node_2" },
  { id: "e2-3", source: "custom_node_2", target: "custom_node_3", animated: true },
];

let customId = 0;
const getCustomId = () => `custom_node_${customId++}`;

const CustomFlow = () => {
  const flowWrapper = useRef(null);
  const [customNodes, setCustomNodes, onCustomNodesChange] = useCustomNodesState(initialCustomNodes);
  const [customEdges, setCustomEdges, onCustomEdgesChange] = useCustomEdgesState(initialCustomEdges);
  const [flowInstance, setFlowInstance] = useState(null);

  const onCustomConnect = useCallback(
    (params) => setCustomEdges((edges) => addConnection(params, edges)),
    []
  );

  const onCustomDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onCustomDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/flow-renderer");
      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = flowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getCustomId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setCustomNodes((nodes) => nodes.concat(newNode));
    },
    [flowInstance]
  );

  return (
    <div className="custom-flow">
      <FlowProvider>
        <div className="flow-wrapper" ref={flowWrapper}>
          <FlowRenderer
            customNodes={customNodes}
            customEdges={customEdges}
            onCustomNodesChange={onCustomNodesChange}
            onCustomEdgesChange={onCustomEdgesChange}
            onCustomConnect={onCustomConnect}
            onInit={setFlowInstance}
            onDrop={onCustomDrop}
            onDragOver={onCustomDragOver}
            fitView
          >
            <InteractiveControls />
          </FlowRenderer>
        </div>
        <DragAndDropSidebar />
      </FlowProvider>
    </div>
  );
};

export default CustomFlow;
