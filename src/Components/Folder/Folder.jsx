import React, { useEffect, useState } from "react";
import "./Folder.scss";

const Folder = ({ tree, handleInsert, handleRemove, handleRename }) => {
  const [open, setOpen] = useState(false);
  const [addInput, setAddInput] = useState(true);
  const [showName, setShowName] = useState(true);
  const [moreButtons, setMoreButtons] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  function handleAddClick(isFolder) {
    setOpen(true);
    setAddInput(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  }

  function handleAdd(e) {
    if (e.keyCode == 13 && e.target.value) {
      handleInsert(tree.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  }

  function showMoreOptions(e) {
    e.preventDefault();
    setMoreButtons(true);
  }

  function handleDelete() {
    handleRemove(tree.id);
  }

  function handleEditClick() {
    setShowName(false);
    setAddInput(false);
    setShowInput({ ...showInput, visible: true });
  }

  function handleEdit(e) {
    if (e.keyCode == 13 && e.target.value) {
      handleRename(tree.id, e.target.value);
      setShowName(true);

      setShowInput({ ...showInput, visible: false });
    }
  }

  useEffect(() => {
    const onMouseOut = () => setMoreButtons(false);
    window.addEventListener("click", onMouseOut);

    // return () => window.removeEventListener("click", onMouseOut);
  }, []);

  if (tree && tree.isFolder) {
    return (
      <div className="Folders">
        <div className={"Folders" + "__Folder"}>
          {/**Folder name */}
          <section
            onClick={() => setOpen(!open)}
            onContextMenu={showMoreOptions}
          >
            <p className={"Folders" + "__Folder" + "__Name"}>
              {open ? "▼" : "▶"}📁{showName ? tree.name : ""}
            </p>
            {showInput.visible && (
              <div className={"Folders" + "__editInput"}>
                {!addInput ? (
                  <React.Fragment>
                    {/**Input for editing name of the folder */}
                    <input
                      type="text"
                      autoFocus
                      onKeyDown={handleEdit}
                      onBlur={() => {
                        setShowInput({ ...showInput, visible: false });
                        setShowName(true);
                      }}
                    />
                  </React.Fragment>
                ) : (
                  ""
                )}
              </div>
            )}
          </section>

          {/**Edit / Rename and delete buttons */}
          <section className={"Folders" + "__Folder" + "__Btns"}>
            {moreButtons && (
              <div className={"extraBtns"}>
                <button
                  className={"extraBtns" + "__deleteBtn"}
                  onClick={handleDelete}
                >
                  Delete
                </button>

                <button
                  className={"extraBtns" + "__editBtn"}
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              </div>
            )}
            <button
              className={"Folders" + "__Folder" + "__Btns" + "__addBtn"}
              onClick={() => handleAddClick(true)}
            >
              Folder +
            </button>
            <button
              className={"Folders" + "__Folder" + "__Btns" + "__addBtn"}
              onClick={() => handleAddClick(false)}
            >
              File +
            </button>
          </section>
        </div>

        {/**If clicked on folder name it will it's items */}
        {open ? (
          <div className="moreFolders">
            {/**Input fields for adding file or folder and for renaming */}
            {showInput.visible && (
              <div className={"Folders" + "__addInput"}>
                {addInput ? (
                  <React.Fragment>
                    {/**Input for adding file or folder */}
                    <span>{showInput.isFolder ? "📁" : "📄"}</span>
                    <input
                      type="text"
                      autoFocus
                      onKeyDown={handleAdd}
                      onBlur={() =>
                        setShowInput({ ...showInput, visible: false })
                      }
                    />
                  </React.Fragment>
                ) : (
                  ""
                )}
              </div>
            )}

            {/**Looping to get all items of all trees */}
            {tree.items &&
              tree.items.map((item) => {
                return (
                  <Folder
                    tree={item}
                    key={item.id}
                    handleInsert={handleInsert}
                    handleRemove={handleRemove}
                    handleRename={handleRename}
                  />
                );
              })}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <div className="File" onContextMenu={showMoreOptions}>
          <p className={"File" + "__Name"}>📄 {showName ? tree.name : ""}</p>
          {/**Input Field  for editing the file name*/}
          {showInput.visible && (
            <div className="input">
              <input
                type="text"
                autoFocus
                onKeyDown={handleEdit}
                className={"File" + "__inputField"}
                onBlur={() => {
                  setShowInput({ ...showInput, visible: false });
                  setShowName(true);
                }}
              />
            </div>
          )}
          {/**Edit and delete buttons */}
          {moreButtons && (
            <div className="extraBtns">
              <button
                className={"extraBtns" + "__deleteBtn"}
                onClick={handleDelete}
              >
                Delete
              </button>

              <button
                className={"extraBtns" + "__editBtn"}
                onClick={handleEditClick}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
};

export default Folder;
