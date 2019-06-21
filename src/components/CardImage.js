import React from "react";
import { CardMedia } from "@material-ui/core";
import noImage from "../assets/no-image.png";

export default function CardImage({ src, height }) {
  return <CardMedia height={height} src={src} component="img" alt="Card Image" onError={e => (e.target.src = noImage)} />;
}
