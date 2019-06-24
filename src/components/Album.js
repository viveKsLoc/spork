import React from "react";
import { Card, Typography, CardActions, IconButton } from "@material-ui/core";
import "./Albums.css";
import CardImage from "./CardImage";
import { Edit, Photo } from "@material-ui/icons";

export default function Album({ item, onClick, isOwner, onEdit }) {
  const { img, title } = item;

  return (
    <Card>
      <CardImage src={img} height={150} />
      <CardActions style={{ padding: "8px 16px" }}>
        <Typography variant="h5">{title}</Typography>
        <div style={{ flexGrow: 1 }} />
        <IconButton onClick={() => onClick(item)} color="secondary">
          <Photo />
        </IconButton>
        {isOwner && (
          <IconButton onClick={() => onEdit(item)}>
            <Edit />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}
