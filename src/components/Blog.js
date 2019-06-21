import React, { useState, useEffect } from "react";
import { Paper, Card, CardMedia, CardContent, Typography, Button, CardActionArea, CardHeader } from "@material-ui/core";
import "./Blog.css";
import { animated, useTrail } from "react-spring";
import BlogDialog from "./BlogDialog";
import noImage from "../assets/no-image.png";
import { getRandomValue } from "../functions";

const itemsHardCoded = [
  {
    id: 2,
    title: "A test title",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, dolor?\n" +
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, dolor?\n" +
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, dolor?\n" +
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, dolor?\n",
    img:
      "https://images.pexels.com/photos/2403251/pexels-photo-2403251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  }
];

export default function Blog({ isOwner }) {
  const [id, setId] = useState(0);
  const [items, setItems] = useState([]);
  const [copy, setCopy] = useState(null);

  useEffect(() => {
    setItems(itemsHardCoded);
  }, []);

  const trail = useTrail(items.length, {
    from: {
      opacity: 0,
      transform: `scale(0.9)`
    },
    to: {
      opacity: 1,
      transform: `scale(1)`
    }
  });

  function handleDelete(id) {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    setId(0);
  }

  function handleEdit() {
    const newCopy = JSON.parse(JSON.stringify(items)); // since we have an array of objects, we need a deep clone
    setCopy(newCopy);
  }

  function handleCancel() {
    // if we cancel and the id is -1, remove it
    if (id === -1) {
      const newItems = items.filter(i => i.id !== -1);
      setItems(newItems);
      setId(0);
    } else {
      setItems(copy);
    }
  }

  function handleChange(e) {
    const newData = [...items];
    const index = newData.findIndex(d => d.id === id);
    newData[index][e.target.name] = e.target.value;
    setItems(newData);
  }

  function createNew() {
    const item = { id: -1, title: "", description: "", img: "" };
    const newItems = items.concat(item);
    setItems(newItems);
    setId(-1);
  }

  function handleSave() {
    if (id === -1) {
      const randomId = getRandomValue();
      const index = items.findIndex(el => el.id === -1);
      const newItems = [...items];
      newItems[index].id = randomId;
      setItems(newItems);
      setId(0);
    }
  }

  function handleClose() {
    if (id === -1) {
      const newItems = items.filter(i => i.id !== -1);
      setItems(newItems);
    }
    setId(0);
  }

  const itemsRendered = items.map(item => {
    return (
      <Card>
        <CardActionArea onClick={() => setId(item.id)}>
          <CardMedia component="img" src={item.img} height={100} onError={e => (e.target.src = noImage)} />
          <CardHeader title={item.title} />
          <CardContent>
            <Typography variant="body1" className="description">
              {item.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  });

  let itemToPass = id ? items.find(i => i.id === id) : null;

  return (
    <div className="Blog">
      {isOwner ? (
        <Paper className="menu">
          <Button variant="outlined" color="secondary" onClick={createNew}>
            New blog
          </Button>
        </Paper>
      ) : null}
      <div className="posts">
        {trail.map((props, i) => (
          <animated.div key={i} style={props}>
            {itemsRendered[i]}
          </animated.div>
        ))}
      </div>
      <BlogDialog
        open={id !== 0}
        onClose={handleClose}
        onDelete={handleDelete}
        onCancel={handleCancel}
        onEdit={handleEdit}
        onChange={handleChange}
        onSave={handleSave}
        item={itemToPass}
        isOwner={isOwner}
      />
    </div>
  );
}
