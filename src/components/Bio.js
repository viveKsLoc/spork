import React from "react";
import { Typography, TextField } from "@material-ui/core";
import "./Bio.css";

export default function Bio({ editMode, bio }) {
  return (
    <div className="bio-wrapper">
      {!editMode ? (
        <Typography variant="caption">{bio}</Typography>
      ) : (
        <TextField rows="3" multiline label="Biography" placeholder="Write a short introduction about yourself" value={bio} />
      )}
    </div>
  );
}
