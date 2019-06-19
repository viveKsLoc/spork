import React, { useState, useEffect } from "react";
import { Paper, Card, CardMedia, CardContent, Typography, Button, CardActionArea } from "@material-ui/core";
import "./Blog.css";
import { useTransition, animated, useTrail, useSpring } from "react-spring";
import BlogDialog from "./BlogDialog";

const itemsHardCoded = [
  {
    id: 2,
    title: "Secondhand priser",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, dolor?\n" +
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, dolor?\n" +
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, dolor?\n" +
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, dolor?\n",
    img: "https://images.pexels.com/photos/2403251/pexels-photo-2403251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  }
];

export default function Blog() {
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
    console.log("stored in copy is", copy);
    setItems(copy);
  }

  function handleChange(e) {
    const newData = [...items];
    const index = newData.findIndex(d => d.id === id);
    newData[index][e.target.name] = e.target.value;
    setItems(newData);
  }

  const itemsRendered = items.map(item => {
    return (
      <Card>
        <CardActionArea onClick={() => setId(item.id)}>
          <CardMedia component="img" src={item.img} height={100} />
          <CardContent>
            <Typography variant="h5">{item.title}</Typography>
            <Typography variant="body1" className="description">
              {item.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  });

  return (
    <div className="Blog">
      <Paper className="menu">
        <Button variant="outlined" color="secondary">
          New blog
        </Button>
      </Paper>
      <Paper>
        <div className="posts">
          {trail.map((props, i) => (
            <animated.div style={props}>{itemsRendered[i]}</animated.div>
          ))}
        </div>
      </Paper>
      <BlogDialog
        open={Boolean(id)}
        onClose={() => setId(0)}
        onDelete={handleDelete}
        onCancel={handleCancel}
        onEdit={handleEdit}
        onChange={handleChange}
        item={id ? items.find(i => i.id === id) : null}
      />
    </div>
  );
}
