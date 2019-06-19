import React, { useState, useEffect } from "react";
import { Paper, Card, CardMedia, CardContent, Typography, Button, CardActionArea } from "@material-ui/core";
import "./Blog.css";
import { useTransition, animated, useTrail, useSpring } from "react-spring";
import BlogDialog from "./BlogDialog";

const itemsHardCoded = [
  {
    id: 6,
    title: "Project YouTube",
    description: [
      "I've started to release coding videos on YouTube. So far I've just released a few and I realize there are many improvements to be made as of now, but we'll get there.",
      "I'm planning to release one video a week, so let's see if we can maintain that goal.",
      "The main objective is to find some area of programming using JavaScript that haven't been covered and make a video to show people how I have done it.",
      "Hit me up for any ideas you might have."
    ],
    img: "https://images.pexels.com/photos/2403251/pexels-photo-2403251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  {
    id: 1,
    title: "Secondhand priser",
    description: [
      "This website intended use is for looking up secondhand goods in Denmark.",
      "In Denmark there are many websites where you can buy/sell used items and it can be pain to check them all out one by one.",
      "This site solves the problem by fetching all the products from the different sites and putting them in one place.",
      "One of the key features is that it also scrapes items off Facebook Marketplace, which cannot be done by a simple webscraper tool."
    ],
    img: "https://images.pexels.com/photos/2403251/pexels-photo-2403251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  {
    id: 2,
    title: "Secondhand priser",
    description: [
      "This website intended use is for looking up secondhand goods in Denmark.",
      "In Denmark there are many websites where you can buy/sell used items and it can be pain to check them all out one by one.",
      "This site solves the problem by fetching all the products from the different sites and putting them in one place.",
      "One of the key features is that it also scrapes items off Facebook Marketplace, which cannot be done by a simple webscraper tool."
    ],
    img: "https://images.pexels.com/photos/2403251/pexels-photo-2403251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  {
    id: 3,
    title: "Secondhand priser",
    description: [
      "This website intended use is for looking up secondhand goods in Denmark.",
      "In Denmark there are many websites where you can buy/sell used items and it can be pain to check them all out one by one.",
      "This site solves the problem by fetching all the products from the different sites and putting them in one place.",
      "One of the key features is that it also scrapes items off Facebook Marketplace, which cannot be done by a simple webscraper tool."
    ],
    img: "https://images.pexels.com/photos/2403251/pexels-photo-2403251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  }
];

export default function Blog() {
  const [id, setId] = useState(0);
  const [items, setItems] = useState([]);

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

  const itemsRendered = items.map(item => {
    return (
      <Card>
        <CardActionArea onClick={() => setId(item.id)}>
          <CardMedia component="img" src={item.img} height={100} />
          <CardContent>
            <Typography variant="h5">{item.title}</Typography>
            <Typography variant="body1" className="description">
              {item.description[0]}
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
      <BlogDialog open={Boolean(id)} onClose={() => setId(0)} onDelete={handleDelete} item={id ? items.find(i => i.id === id) : null} />
    </div>
  );
}
