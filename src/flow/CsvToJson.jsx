import React, { useState } from 'react';
import  {usePapaParse}  from 'react-papaparse'; // or any other CSV parsing library

const CsvToJsonConverter = () => {
  const [jsonData, setJsonData] = useState(null);

  return (
    <div>
      {jsonData && (
        <div>
          <h2>JSON Data</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CsvToJsonConverter;