import React from "react";
import { Button, Paper } from "@material-ui/core";
import { KeyboardBackspace } from "@material-ui/icons";

const MemoAlbumAdmin = React.memo(AlbumAdmin);

function AlbumAdmin({ albumSelected, setSelectedAlbum, onClickNewAlbum, isOwner }) {
  return (
    <Paper className="menu">
      {isOwner && (
        <Button variant="contained" color="secondary" onClick={onClickNewAlbum}>
          New album
        </Button>
      )}
      {albumSelected && (
        <Button onClick={setSelectedAlbum}>
          <KeyboardBackspace />
        </Button>
      )}
    </Paper>
  );
}
export default MemoAlbumAdmin;
