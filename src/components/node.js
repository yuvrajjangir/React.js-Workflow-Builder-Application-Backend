import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { updatedStyle } from "./NodeStyles";

const CustomNode = ({ data, selected }) => {
  let nodeTitle = { ...updatedStyle.title };
  nodeTitle.backgroundColor = "#cccccc";
  nodeTitle.textAlign = 'center';
  nodeTitle.fontWeight = 'bold';

  return (
    <div className="custom-node">
      <div style={{ ...updatedStyle.body, ...(selected ? updatedStyle.selected : []) }}>
        <div style={nodeTitle}>{data.heading}</div>
        <div style={updatedStyle.Wrapper}>{data.content}</div>
      </div>
      <Handle type="source" position={Position.Top} id="b" />
      <Handle type="target" position={Position.Bottom} id="a" />
    </div>
  );
};

export default memo(CustomNode);
