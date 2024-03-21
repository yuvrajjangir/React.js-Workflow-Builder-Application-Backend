import React from 'react';

const DragAndDropSidebar = () => {
  const handleDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">Drag these nodes to the right pane.</div>
      <div className="drag-node input" onDragStart={(event) => handleDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div className="drag-node" onDragStart={(event) => handleDragStart(event, 'default')} draggable>
        Default Node
      </div>
      <div className="drag-node output" onDragStart={(event) => handleDragStart(event, 'output')} draggable>
        Output Node
      </div>
      <div className="drag-node output" onDragStart={(event) => handleDragStart(event, '60 SECOND')} draggable>
        60 Second Delay
      </div>
    </aside>
  );
};

export default DragAndDropSidebar;
