import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./AlbumPictures.css";
import { Button, Fab } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

const portal = document.createElement("div");
document.body.appendChild(portal);

function PortalItem({ item, drag, snapshot, onDelete, index }) {
  const child = (
    <div className="PortalItem">
      <img src={item} height={200} alt="" ref={drag.innerRef} {...drag.draggableProps} {...drag.dragHandleProps} />
      <div className="del-btn">
        <Fab color="secondary" size="small" onClick={() => onDelete(index)}>
          <Delete fontSize="small" />
        </Fab>
      </div>
    </div>
  );

  if (!snapshot.isDragging) {
    return child;
  }

  return ReactDOM.createPortal(child, portal);
}

export default function AlbumPictures(props) {
  const { items, onDelete, onDragEnd, onUpload } = props;
  const fileInputRef = useRef(null);

  console.log("items", items);

  return (
    <div className="AlbumPictures">
      <Button variant="outlined" onClick={() => fileInputRef.current.click()} style={{ marginBottom: 15 }}>
        Upload new
      </Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="droppabe-wrapper">
          <Droppable droppableId={1} direction="horizontal">
            {provided => (
              <div className="drop-n-drop-area" {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((item, index) => (
                  <Draggable draggableId={`d_${index}`} index={index}>
                    {(drag, snapshot) => (
                      <PortalItem item={item} drag={drag} snapshot={snapshot} onDelete={onDelete} index={index} />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      <input type="file" className="hidden" onChange={onUpload} ref={fileInputRef} />
    </div>
  );
}
