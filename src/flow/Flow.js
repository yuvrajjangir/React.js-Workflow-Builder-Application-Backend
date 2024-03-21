import React, { useCallback, useEffect, useState, useRef } from "react";
import ReactFlow, {
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider
} from "reactflow";
import Sidebar from "../sidebar/sidebar";
import CustomNode from "../components/node"
import { isAllNodeisConnected } from "../utils/utils";
import {
  nodes as initialNodes,
  edges as initialEdges
} from "../utils/elements";


import "reactflow/dist/style.css";
import "../styles/dnd.css";
import "../styles/updatenode.css";

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = { node: CustomNode };

const OverviewFlow = () => {
  const reactFlowWrapper = useRef(null);
  const textRef = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [flag, setFlag] = useState(false)

  const [timer, setTimer] = useState(60)

  const onInit = (reactFlowInstance) => setReactFlowInstance(reactFlowInstance);

  const handleFileChange = (event) => {

    setInterval(()=> {
      setTimer(prev=> prev-1)
    }, 1000)

    setTimeout(()=> {

      const file = event.target.files[0];
    const reader = new FileReader();
    const result = [];

    reader.onload = (e) => {
      const content = e.target.result;
      const lines = content.split('\n');
      const headers = lines[0].split(',');

      
      for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
          obj[headers[j].trim()] = currentLine[j].trim();
        }

        result.push(obj);
      }
    };

    setFlag(true)
      setJsonData(result);
    reader.readAsText(file);

    }, 5000)
    

  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

    console.log(event);
    const type = event.dataTransfer.getData("application/reactflow");
    console.log(type);
    const label = event.dataTransfer.getData("content");
    console.log(label);
    console.log(reactFlowInstance, "reactIns");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top
    });
  
    if(label == 'csv'){
      const newNode = {
        id: getId(),
        type,
        position,
        data: { heading: "Upload CSV", content: <>
        
        <input type="file" onChange={handleFileChange} id="myFile" name="filename"/>
        </> }
      };
    
      console.log(newNode);
      setNodes((es) => es.concat(newNode));
      setSelectedNode(newNode.id);
    }
    else if(label == 'wait'){
      
        const newNode = {
          id: getId(),
          type,
          position,
          data: { heading: "Wait For 60 sec", content: timer}
        };
      
        console.log(newNode);
        setNodes((es) => es.concat(newNode));
        setSelectedNode(newNode.id);
      
    }
    else if(label == 'convert'){

      const newNode = {
        id: getId(),
        type,
        position,
        data: { heading: "Convert To JSON", content: <>
        {flag && (
        <div>
          <h2>JSON Data</h2>
          <p>{JSON.stringify(jsonData, null, 2)}</p>
        </div>
      )}
        </>}
      };
    
      console.log(newNode);
      setNodes((es) => es.concat(newNode));
      setSelectedNode(newNode.id);

    }
  };
  

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, markerEnd: { type: "arrowclosed" } }, eds)
      ),
    [setEdges]
  );

  const [nodeName, setNodeName] = useState("Node 1");

  useEffect(() => {
    const node = nodes.filter((node) => {
      if (node.selected) return true;
      return false;
    });
    if (node[0]) {
      setSelectedNode(node[0]);
      setIsSelected(true);
    } else {
      setSelectedNode("");
      setIsSelected(false);
    }
  }, [nodes]);
  useEffect(() => {
    setNodeName(selectedNode?.data?.content || selectedNode);
  }, [selectedNode]);
  useEffect(() => {
    textRef?.current?.focus();
  }, [selectedNode]);
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode?.id) {
          node.data = {
            ...node.data,
            content: nodeName || " "
          };
        }
        return node;
      })
    );
  }, [nodeName, setNodes]);

  const saveHandler = () => {
    if (isAllNodeisConnected(nodes, edges)) alert("Congrats its correct");
    else alert("Please connect source nodes (Cannot Save Flow)");
  };

  return (
    <>
      <button style={{marginLeft:'50vw', width:'100px', height:'30px', borderRadius:'10px', border:'none', marginTop:'5px', cursor:'pointer', border:'1px solid grey'}} onClick={saveHandler}>Save</button>
      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={onInit}
              onDrop={onDrop}
              onDragOver={onDragOver}
              attributionPosition="top-right"
            >
              <Background color="red" gap={16} />
            </ReactFlow>
          </div>

          <Sidebar
            isSelected={isSelected}
            textRef={textRef}
            nodeName={nodeName}
            setNodeName={setNodeName}
          />
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default OverviewFlow;