import React, { useState, useRef } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Menu,
  Button,
  TextField,
  MenuItem
} from "@material-ui/core";
import { Movie, Book, School, Games, Error, CheckCircle, Cancel, Delete } from "@material-ui/icons";
import "./Media.css";
import { format } from "date-fns";
import { getRandomValue } from "../functions";
import { useSpring, animated } from "react-spring";

const mediaHard = [
  {
    id: 1,
    title: "Lord of the Rings",
    type: "movie",
    date: "2018-04-32"
  },
  {
    id: 2,
    title: "Principles",
    type: "book",
    date: "2018-03-30"
  },
  {
    id: 3,
    title: "Online course: Udemy",
    type: "education",
    date: "2019-04-04"
  },
  { id: 4, title: "Mario Kart", type: "videogame", date: "2019-02-02" }
];

function getLogo(type) {
  switch (type) {
    case "movie":
      return <Movie />;
    case "book":
      return <Book />;
    case "education":
      return <School />;
    case "videogame":
      return <Games />;
    case "error":
      return <Error color="secondary" />;
    default:
      new Error("Unknown logo");
  }
}

const categories = ["movie", "book", "education", "videogame"];

export default function Media({ isOwner }) {
  const [media, setMedia] = useState(mediaHard);
  const avatarRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const animateWrapper = useSpring({
    from: {
      transform: "rotate(10deg)"
    },
    to: {
      transform: "rotate(0deg)"
    }
  });

  function handleCreate() {
    const newItem = {
      id: -1,
      title: "",
      type: "error",
      date: format(new Date(), "YYYY-MM-DD")
    };
    const newMedia = [newItem, ...media];
    setMedia(newMedia);
  }

  function handleChange(e) {
    console.log(e.target.name);
    const newMedia = [...media];
    newMedia[0][e.target.name] = e.target.value;
    setMedia(newMedia);
  }

  function handleMenuChange(value) {
    const newMedia = [...media];
    newMedia[0].type = value;
    setMedia(newMedia);
    setAnchorEl(null);
  }

  function handleSave() {
    const newMedia = [...media];
    newMedia[0].id = getRandomValue();
    setMedia(newMedia);
  }

  function handleCancel() {
    const newMedia = media.filter(mediaItem => mediaItem.id !== -1);
    setMedia(newMedia);
  }

  function handleDelete(index) {
    const newMedia = media.filter((_, i) => i !== index);
    setMedia(newMedia);
  }

  return (
    <div>
      {isOwner && (
        <Paper className="menu">
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCreate}
            disabled={Boolean(media.find(i => i.id === -1))}
          >
            Add new item
          </Button>
        </Paper>
      )}
      <animated.div style={animateWrapper}>
        <Paper>
          <List disablePadding>
            {media.map((item, index) => (
              <ListItem divider key={`mi_${index}`}>
                {item.id !== -1 ? (
                  <>
                    <ListItemAvatar>{getLogo(item.type)}</ListItemAvatar>
                    <ListItemText primary={item.title} secondary={item.date} />
                    {isOwner && (
                      <ListItemSecondaryAction>
                        <IconButton onClick={() => handleDelete(index)}>
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    )}
                  </>
                ) : (
                  <>
                    <div ref={avatarRef} onClick={e => setAnchorEl(e.currentTarget)}>
                      <ListItemAvatar>{getLogo(item.type)}</ListItemAvatar>
                    </div>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
                      {categories.map(type => (
                        <MenuItem key={type} onClick={() => handleMenuChange(type)}>
                          {type}
                        </MenuItem>
                      ))}
                    </Menu>
                    <div className="Media-textfield-area">
                      <TextField placeholder="Title" name="title" onChange={handleChange} />
                      <TextField type="date" name="date" defaultValue={media[0].date} onChange={handleChange} />
                    </div>
                    <ListItemSecondaryAction>
                      <IconButton onClick={handleSave} disabled={media[0].title === "" || media[0].type === "error"}>
                        <CheckCircle />
                      </IconButton>
                      <IconButton onClick={handleCancel}>
                        <Cancel />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </>
                )}
              </ListItem>
            ))}
          </List>
        </Paper>
      </animated.div>
    </div>
  );
}
