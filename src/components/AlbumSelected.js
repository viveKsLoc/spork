import React from "react";
import { Card, Grid, GridList, GridListTile, Typography, CardContent } from "@material-ui/core";
import CardImage from "./CardImage";
import { useSpring, animated } from "react-spring";

export default function AlbumSelected({ item }) {
  const { img, title, description, date, items } = item;

  const animate = useSpring({
    from: {
      opacity: 0,
      transform: "scale(1.5)"
    },
    to: {
      opacity: 1,
      transform: "scale(1)"
    }
  });

  return (
    <animated.div style={animate}>
      <Card>
        <CardImage src={img} height={200} />
        <CardContent>
          <Typography variant="h5">{title}</Typography>
          <Grid container>
            <Typography variant="">{description}</Typography>
            <Typography variant="caption" style={{ marginLeft: "auto" }}>
              {date}
            </Typography>
          </Grid>
          <GridList cellHeight={180} cols={3} style={{ marginTop: 10 }}>
            {items.map((tile, i) => (
              <GridListTile cols={i === 0 || i === 3 ? 2 : 1}>
                <img key={i} src={tile} alt="" />
              </GridListTile>
            ))}
          </GridList>
        </CardContent>
      </Card>
    </animated.div>
  );
}
