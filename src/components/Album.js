import React from "react";
import { Card, CardContent, CardMedia, Typography, CardActions, CardActionArea } from "@material-ui/core";
import "./Albums.css";
import AlbumSelected from "./AlbumSelected";
import { animated, useTrail, useSpring } from "react-spring";

export default function Album({ item, onClick, selected }) {
  const { img, title, items, date } = item;

  console.log("selected", selected);

  const trail = useTrail(items.length, {
    from: {
      opacity: 0,
      transform: `scale(0)`
    },
    to: {
      opacity: 1,
      transform: `scale(1)`
    },
    delay: 500
  });

  const anim = useSpring({
    opacity: 1
  });

  return (
    <Card>
      {selected ? (
        <animated.div style={anim}>
          <CardMedia height={150} src={img} component="img" />
          <CardContent>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="caption">{date}</Typography>
            <div className="album-img-grid">
              {trail.map((props, i) => (
                <animated.div style={props} key={i}>
                  <img src="https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" />
                </animated.div>
              ))}
            </div>
          </CardContent>
        </animated.div>
      ) : (
        <CardActionArea onClick={() => onClick(item)}>
          <CardMedia height={150} src={img} component="img" />
          <CardActions>
            <Typography variant="caption">{title}</Typography>
          </CardActions>
        </CardActionArea>
      )}
    </Card>
  );
}
