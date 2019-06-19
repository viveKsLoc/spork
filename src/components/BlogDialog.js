import React, { useState } from "react";
import { Dialog, DialogContent, Button, DialogActions, DialogTitle, TextField } from "@material-ui/core";
import "./BlogDialog.css";

export default function BlogDialog(props) {
  const { open, item, onClose, onDelete, onCancel, onEdit, onChange } = props;

  const [editMode, setEditMode] = useState(false);
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

  const renderBody = !editMode ? (
    <>
      <DialogTitle>{item.title}</DialogTitle>
      <DialogContent>
        <h1>{item.name}</h1>
        {item.description.split("\n").map(des => (
          <p>{des}</p>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={() => onDelete(item.id)}>Delete</Button>
      </DialogActions>
    </>
  ) : (
    <>
      <DialogContent>
        <TextField margin="dense" label="Title" name="title" value={item.title} onChange={onChange} fullWidth />
        <br />
        <TextField margin="dense" multiline rows="10" name="description" fullWidth onChange={onChange} value={item.description} />
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={() => setEditMode(false)}>
          Save
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </DialogActions>
    </>
  );

  return (
    <Dialog open={open} onClose={handleClose} className="BlogDialog" tran>
      <div className="img-container">
        <img src={item.img} height={300} />
        {editMode && (
          <div className="btn-container">
            <Button variant="contained" color="secondary">
              Upload
            </Button>
          </div>
        )}
      </div>
      {renderBody}
    </Dialog>
  );
}
