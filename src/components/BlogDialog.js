import React, { useState } from "react";
import { Dialog, DialogContent, Button, DialogActions, DialogTitle, TextField } from "@material-ui/core";
import "./BlogDialog.css";

export default function BlogDialog({ open, item, onClose, onDelete }) {
  const [editMode, setEditMode] = useState(false);
  if (!item) return null;

  function handleClose() {
    setEditMode(false);
    onClose();
  }

  const renderBody = !editMode ? (
    <>
      <DialogTitle>{item.title}</DialogTitle>
      <DialogContent>
        <h1>{item.name}</h1>
        {item.description.map(des => (
          <p>{des}</p>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setEditMode(true)}>Edit</Button>
        <Button onClick={() => onDelete(item.id)}>Delete</Button>
      </DialogActions>
    </>
  ) : (
    <>
      <DialogContent>
        <TextField margin="dense" label="Title" value={item.title} fullWidth />
        <br />
        <TextField margin="dense" multiline rows="10" fullWidth value={item.description.join("\n")} />
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={() => setEditMode(false)}>
          Save
        </Button>
        <Button onClick={() => setEditMode(false)}>Cancel</Button>
      </DialogActions>
    </>
  );

  return (
    <Dialog open={open} onClose={handleClose} className="BlogDialog" tran>
      <img src={item.img} height={300} />
      {renderBody}
    </Dialog>
  );
}
