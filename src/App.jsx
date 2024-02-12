import React, { useState } from "react";
import "./App.css";
import explorer from "./Data/foldersData";
import Folder from "./Components/Folder/Folder";
import useTraverseTree from "./Hooks/useTraverseTree";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [data, setData] = useState(explorer);

  const { insertNode, removeNode, renameNode } = useTraverseTree();

  const handleInsert = (folderId, itemName, isFolder) => {
    const finalTree = insertNode(data, folderId, itemName, isFolder);
    setData(finalTree);
  };
  const handleRemove = (folderId) => {
    const finalTree = removeNode(data, folderId);
    setData(finalTree);
  };
  const handleRename = (folderId, itemName) => {
    const finalTree = renameNode(data, folderId, itemName);
    setData(finalTree);
  };

  return (
    <React.Fragment>
      <BrowserRouter basename="/File_Explorer">
        <Routes>
          <Route
            path="/"
            element={
              <Folder
                tree={data}
                handleInsert={handleInsert}
                handleRemove={handleRemove}
                handleRename={handleRename}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
