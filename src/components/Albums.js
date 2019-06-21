import React, { useState } from "react";
import "./Albums.css";
import Album from "./Album";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AlbumAdmin from "./AlbumAdmin";
import AlbumDrawer from "./AlbumDrawer";
import AlbumSelected from "./AlbumSelected";

const albumsHard = [
  {
    img:
      "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Italy",
    date: "2019-04-22",
    items: [
      "https://images.pexels.com/photos/2218344/pexels-photo-2218344.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/346768/pexels-photo-346768.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/346768/pexels-photo-346768.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/346768/pexels-photo-346768.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/346768/pexels-photo-346768.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/2218344/pexels-photo-2218344.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/2218344/pexels-photo-2218344.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/2218344/pexels-photo-2218344.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/2088282/pexels-photo-2088282.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/2088282/pexels-photo-2088282.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    ],
    id: 1,
    description: ""
  },
  {
    img:
      "https://images.pexels.com/photos/2106776/pexels-photo-2106776.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Germany",
    date: "2019-04-22",
    items: [
      "https://images.pexels.com/photos/2218344/pexels-photo-2218344.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/2218344/pexels-photo-2218344.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/2088282/pexels-photo-2088282.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    ],
    id: 2,
    description: ""
  }
];

export default function Albums({ isOwner }) {
  const [albums, setAlbums] = useState(albumsHard);
  const [selectedAlbum, setSelectedAlbum] = useState({});
  const [showDrawer, setShowDrawer] = useState(0);
  const [editMode, setEditMode] = useState(null);

  function handleAlbumClick(e) {
    console.log(e);
    setSelectedAlbum(e);
  }

  const albumSelected = selectedAlbum.id;

  function handleDragEnd({ destination, source }) {
    if (!destination) {
      return;
    }

    if (destination.index !== source.index) {
      const newAlbum = [...albums];
      const oldDest = newAlbum[destination.index];
      newAlbum[destination.index] = newAlbum[source.index];
      newAlbum[source.index] = oldDest;
      setAlbums(newAlbum);
    }
  }

  function handleCreateAlbum() {
    setShowDrawer(true);
  }

  function handleSave(item) {
    const newAlbums = [].concat(item, albums);
    setAlbums(newAlbums);
    setShowDrawer(false);
  }

  function enableEditMode(item) {
    setShowDrawer(true);
    setEditMode(item);
  }

  function handleClose() {
    setShowDrawer(false);
    setEditMode(false);
  }

  function handleEdit(item) {
    const index = albums.findIndex(i => i.id === item.id);
    const newAlbums = [...albums];
    newAlbums[index] = item;
    setAlbums(newAlbums);
    setEditMode(false);
  }

  return (
    <div>
      <div>
        {isOwner && (
          <AlbumAdmin
            albumSelected={albumSelected}
            onClickNewAlbum={handleCreateAlbum}
            setSelectedAlbum={setSelectedAlbum}
          />
        )}
        <DragDropContext onDragEnd={handleDragEnd}>
          {albumSelected ? (
            <AlbumSelected item={selectedAlbum} />
          ) : (
            <Droppable droppableId={1}>
              {provided => (
                <div ref={provided.innerRef} className="album-grid" {...provided.droppableProps}>
                  {albums.map((item, index) => (
                    <Draggable draggableId={`d_${index}`} index={index} isDragDisabled={Boolean(albumSelected)}>
                      {drag => (
                        <div {...drag.draggableProps} {...drag.dragHandleProps} ref={drag.innerRef}>
                          <Album
                            item={item}
                            onClick={handleAlbumClick}
                            selected={albumSelected}
                            isOwner={isOwner}
                            onEdit={enableEditMode}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </DragDropContext>
        <AlbumDrawer
          open={showDrawer}
          onClose={handleClose}
          onSave={handleSave}
          editMode={editMode}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}
