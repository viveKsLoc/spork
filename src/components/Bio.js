import React from "react";
import { Typography, TextField } from "@material-ui/core";
import "./Bio.css";

export default function Bio({ editMode, bio, dispatch }) {
  return (
    <div className="bio-wrapper">
      {!editMode ? (
        <Typography variant="caption">{bio}</Typography>
      ) : (
        <TextField
          rows="3"
          multiline
          label="Biography"
          placeholder="Write a short introduction about yourself"
          value={bio}
          name="bio"
          onChange={e => dispatch({ type: "user", payload: { name: e.target.name, value: e.target.value } })}
        />
      )}
    </div>
  );
}
