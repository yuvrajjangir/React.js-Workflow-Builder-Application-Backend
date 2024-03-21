import React, { useCallback } from "react";
import Flow from './flow/Flow';
import Sidebar from "./utils/Side";
import CsvToJsonConverter from "./flow/CsvToJson";
export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <CsvToJsonConverter/>
      <Flow/>
    </div>
  );
}