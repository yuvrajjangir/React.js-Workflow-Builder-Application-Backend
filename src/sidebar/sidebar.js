import React from "react";
import EditMessage from './message/index';

const SideDrawer = ({ isSelected, textRef, nodeName, setNodeName }) => {
  const onDragStart = (event, nodeType, content) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("content", content);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleUploadCSVDragStart = (event) => {
    onDragStart(event, "node", "csv");
  };

  return (
    <aside>
      {isSelected ? (
        <EditMessage
          textRef={textRef}
          nodeName={nodeName}
          setNodeName={setNodeName}
        />
      ) : (
        <>
          <div
            style={{ border: '1px solid red', background:"orange", color:"whitesmoke", fontWeight:"500", borderRadius:"10px", marginTop:"9rem"}}
            className="dndnode input"
            draggable
            onDragStart={handleUploadCSVDragStart}
          >
            Upload CSV
          </div>
          <div
            style={{ border: '1px solid green', background:"#2cf651", color:"white", fontWeight:"500", borderRadius:"10px", marginTop:"5rem" }}
            className="dndnode input"
            onDragStart={(event) => onDragStart(event, "node", "wait")}
            draggable
          >
            Wait
          </div>
          <div
            style={{ border: '1px solid blue', background:"#3dc8ff", color:"whitesmoke", fontWeight:"500", borderRadius:"10px", marginTop:"5rem" }}
            className="dndnode input"
            onDragStart={(event) => onDragStart(event, "node", "convert")}
            draggable
          >
            Convert to JSON
          </div>
          <div
            style={{ border: '1px solid #e8960f ', background:"#f7d100", color:"whitesmoke", fontWeight:"500", borderRadius:"10px", marginTop:"5rem" }}
            className="dndnode input"
            onDragStart={(event) => onDragStart(event, "node", "convert")}
            draggable
          >
            POST Request
          </div>
        </>
      )}
    </aside>
  );
};

export default SideDrawer;
