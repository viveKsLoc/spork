import React, { useState } from "react";
import "./Albums.css";
import Album from "./Album";
import { animated, useSprings } from "react-spring";
import { Paper, Button } from "@material-ui/core";

const albums = [
  {
    img: "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Italy",
    date: "2019-04-22",
    items: [0, 1, 2, 3, 4],
    id: 1
  },
  {
    img: "https://images.pexels.com/photos/2106776/pexels-photo-2106776.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Germany",
    date: "2019-04-22",
    items: [0, 1, 2, 3, 4],
    id: 2
  },
  {
    img: "https://images.pexels.com/photos/541518/pexels-photo-541518.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "album",
    date: "2019-04-22",
    items: [0, 1, 2, 3, 4],
    id: 3
  },
  {
    img: "https://images.pexels.com/photos/2178175/pexels-photo-2178175.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "album",
    date: "2019-04-22",
    items: [0, 1, 2, 3, 4],
    id: 4
  },
  {
    img: "https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "album",
    date: "2019-04-22",
    items: [0, 1, 2, 3, 4],
    id: 5
  },
  {
    img: "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Italy",
    date: "2019-04-22",
    items: [0, 1, 2, 3, 4],
    id: 6
  },
  {
    img: "https://images.pexels.com/photos/2106776/pexels-photo-2106776.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Germany",
    date: "2019-04-22",
    items: [0, 1, 2, 3, 4],
    id: 7
  }
];

export default function Albums({ isOwner }) {
  const [selectedAlbum, setSelectedAlbum] = useState({});

  function handleAlbumClick(e) {
    console.log(e);
    setSelectedAlbum(e);
  }

  const albumSelectedAnimate = useSprings(
    albums.length,
    albums.map(al => ({
      from: {
        opacity: 0,
        transform: "translate3d(0,-15px,0)",
        position: "auto"
      },
      to: {
        opacity: selectedAlbum.id && al.id !== selectedAlbum.id ? 0 : 1,
        transform: selectedAlbum.id && al.id !== selectedAlbum.id ? "translate3d(0,-200px,0)" : "translate3d(0,0px,0)",
        position: selectedAlbum.id ? "absolute" : "auto",
        pointerEvents: selectedAlbum.id && al.id !== selectedAlbum.id ? "none" : "auto"
      }
    }))
  );

  return (
    <div>
      <div>
        {isOwner ? (
          <Paper className="menu">
            <Button variant="contained" color="secondary">
              New album
            </Button>
            <Button>Upload new image</Button>
          </Paper>
        ) : null}
        <div className="album-grid">
          {albumSelectedAnimate.map((animation, index) => (
            <animated.div style={animation}>
              <Album item={albums[index]} onClick={handleAlbumClick} selected={albums[index].id === selectedAlbum.id} />
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  );
}
