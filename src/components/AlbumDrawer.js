import React, { useState, useRef, useEffect } from "react";
import { Drawer, TextField, Button, Typography } from "@material-ui/core";
import "./AlbumDrawer.css";
import { format } from "date-fns";
import noImage from "../assets/no-image.png";

export default function AlbumDrawer(props) {
  const { onClose, open, onSave, editMode, onEdit } = props;

  const fileInput = useRef(null);
  const [item, setItem] = useState({
    title: "",
    description: "",
    img: "",
    items: [],
    date: ""
  });

  useEffect(() => {
    console.log(editMode, item);
    if (editMode) {
      setItem(editMode);
    } else {
      setItem({ ...item, date: format(new Date(), "YYYY-MM-DD") });
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
        console.log(res);
        setItem({ ...item, img: res.target.result });
      };
      filereader.readAsDataURL(file);
    }
  }

  function handleClose() {
    setItem({});
    onClose();
  }

  const { title, description, img, items, date } = item;
  return (
    <Drawer anchor="bottom" open={open} onClose={handleClose}>
      <div className="AlbumDrawer">
        <div className="info">
          <Typography variant="caption">General information</Typography>
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
      <input type="file" className="hidden" onChange={handleUpload} ref={fileInput} />
    </Drawer>
  );
}
