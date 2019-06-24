import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, Button, DialogActions, DialogTitle, TextField } from "@material-ui/core";
import "./BlogDialog.css";
import noImage from "../assets/no-image.png";

export default function BlogDialog(props) {
  const { open, item, onClose, onDelete, onCancel, onEdit, onChange, onSave, isOwner } = props;
  const fileInput = useRef(null);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    console.log("useEffect ran", open, item);
    if (item && item.id === -1) {
      console.log("Go edit mode");
      setEditMode(true);
    }
  }, [open]);

  if (!item) return null;

  function handleClose() {
    setEditMode(false);
    onClose();
  }

  function handleCancel() {
    setEditMode(false);
    onCancel();
  }

  function handleEdit() {
    setEditMode(true);
    onEdit();
  }

  function handleSave() {
    setEditMode(false);
    onSave();
  }

  function handleUpload() {
    const file = fileInput.current.files[0];
    if (file) {
      const filereader = new FileReader();

      filereader.onload = e => {
        const dummyEvent = { target: { name: "img", value: e.target.result } };
        onChange(dummyEvent);
      };

      filereader.readAsDataURL(file);
    }
  }

  const descriptionFormatted = item.description
    ? item.description.split("\n").map((des, i) => <p key={i}>{des}</p>)
    : "";

  const renderBody = !editMode ? (
    <>
      <DialogTitle>{item.title}</DialogTitle>
      <DialogContent>
        <h1>{item.name}</h1>
        {descriptionFormatted}
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleClose}>
          Close
        </Button>
        {isOwner && (
          <>
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={() => onDelete(item.id)}>Delete</Button>
          </>
        )}
      </DialogActions>
    </>
  ) : (
    <>
      <DialogContent>
        <TextField margin="dense" label="Title" name="title" value={item.title} onChange={onChange} fullWidth />
        <br />
        <TextField
          margin="dense"
          multiline
          rows="10"
          name="description"
          value={item.description}
          onChange={onChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button color="secondary" variant="contained" onClick={handleSave}>
          Save
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </DialogActions>
    </>
  );

  return (
    <Dialog open={open} onClose={handleClose} className="BlogDialog">
      <div className="img-container">
        <img src={item.img} height={300} alt="Cover" onError={e => (e.target.src = noImage)} />
        {editMode && (
          <div className="btn-container">
            <Button variant="contained" color="secondary" onClick={() => fileInput.current.click()}>
              Upload
            </Button>
          </div>
        )}
      </div>
      {renderBody}
      <input type="file" ref={fileInput} onChange={handleUpload} style={{ display: "none" }} />
    </Dialog>
  );
}
