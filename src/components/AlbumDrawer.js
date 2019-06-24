import React, { useState, useRef, useEffect } from "react";
import { Drawer, TextField, Button, Tabs, Tab, AppBar } from "@material-ui/core";
import "./AlbumDrawer.css";
import { format } from "date-fns";
import noImage from "../assets/no-image.png";
import AlbumPictures from "./AlbumPictures";

const defaultItem = {
  title: "",
  description: "",
  img: "",
  items: [],
  date: ""
};

export default function AlbumDrawer(props) {
  const { onClose, open, onSave, editMode, onEdit } = props;

  const fileInput = useRef(null);
  const [tab, setTab] = useState(0);
  const [item, setItem] = useState(defaultItem);

  useEffect(() => {
    if (editMode) {
      setItem(editMode);
    } else {
      setItem(item => ({ ...item, date: format(new Date(), "YYYY-MM-DD") }));
    }
  }, [open]);

  function handleChange(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  function handleUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const filereader = new FileReader();
      filereader.onload = res => {
        setItem({ ...item, img: res.target.result });
      };
      filereader.readAsDataURL(file);
    }
  }

  function handleClose() {
    setItem(defaultItem);
    onClose();
  }

  function handlePhotoDragEnd({ source, destination }) {
    if (!destination) {
      return;
    }

    if (destination.index !== source.index) {
      const newItem = { ...item };
      const itemToMove = item.items[source.index];
      newItem.items.splice(source.index, 1);
      newItem.items.splice(destination.index, 0, itemToMove);
      setItem(newItem);
    }
  }

  function handlePhotoDelete(index) {
    const newItem = { ...item };
    const newItems = newItem.items.filter((el, i) => i !== index);
    newItem.items = newItems;
    setItem(newItem);
  }

  function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const fr = new FileReader();

      fr.onload = e_ => {
        const newData = e_.target.result;
        const newItem = { ...item };
        newItem.items.unshift(newData);
        setItem(newItem);
      };

      fr.readAsDataURL(file);
    }
  }

  const { title, description, img, items, date } = item;
  return (
    <Drawer anchor="bottom" open={open} onClose={handleClose}>
      <AppBar position="static" color="secondary">
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          TabIndicatorProps={{ style: { backgroundColor: "white" } }}
        >
          <Tab label="General" />
          <Tab label="Content" />
        </Tabs>
      </AppBar>
      <div className="AlbumDrawer">
        {tab === 0 ? (
          <div className="Album-grid">
            <div className="info">
              <TextField label="Title" margin="dense" value={title} name="title" onChange={handleChange} />
              <TextField label="Date" type="date" margin="dense" name="date" value={date} onChange={handleChange} />
              <TextField
                label="description"
                multiline
                rows="3"
                name="description"
                value={description}
                onChange={handleChange}
              />
            </div>
            <div className="thumbnail">
              <img
                src={img ? img : noImage}
                height={"100%"}
                alt=""
                onError={e => console.log("error") || (e.target.src = noImage)}
              />
              <Button variant="contained" color="secondary" onClick={() => fileInput.current.click()}>
                Upload new picture
              </Button>
            </div>
            <div style={{ flexDirection: "row" }}>
              {editMode ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => onEdit(item)}
                  disabled={!title || !description}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => onSave(item)}
                  disabled={!title || !description}
                >
                  Save
                </Button>
              )}
              <Button color="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </div>
        ) : null}
        {tab === 1 && (
          <AlbumPictures
            items={items}
            onDelete={handlePhotoDelete}
            onDragEnd={handlePhotoDragEnd}
            onUpload={handlePhotoUpload}
          />
        )}
      </div>
      <input type="file" className="hidden" onChange={handleUpload} ref={fileInput} />
    </Drawer>
  );
}
