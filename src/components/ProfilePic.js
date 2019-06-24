import React, { useState, useRef, useContext } from "react";
import { useSpring, animated } from "react-spring";
import "./ProfilePic.css";
import { IconButton } from "@material-ui/core";
import { Image } from "@material-ui/icons";
import Context from "./Context";

const yAxis = "-210px";

export default function ProfilePic({ editMode, pic }) {
  const [isHover, setIsHover] = useState(false);
  const { tab, dispatch } = useContext(Context);

  const fileInput = useRef(null);

  function getAnimationValues(tab_) {
    switch (tab_) {
      case 0:
        return ["translate3d(0px,0px,0) scale(1)", "static", "", 200];
      case 1:
        return [`translate3d(0,${yAxis},0) scale(0.9)`, "absolute", 200, 200];
      case 2:
        return [`translate3d(0,${yAxis},0) scale(0.9)`, "absolute", 200, 200];
      default:
        return new Error("No animation values");
    }
  }

  const [transform, position, width, height] = getAnimationValues(tab);

  const profilePic = useSpring({
    transform,
    position,
    width,
    height /* we cannot go from 100% to 200px so 200 -> 200 for now */
  });

  const profilePicWrapper = useSpring({ height: tab === 1 || tab === 2 ? 0 : 200 });

  const newPic = useSpring({ opacity: isHover ? 1 : 0, pointerEvents: isHover ? "auto" : "none" });

  function handleUpload(e) {
    if (e.target.files[0]) {
      dispatch({ type: "message", payload: { type: "success", text: "You uploaded the file!" } });
    }
  }

  function handleUploadClick() {
    fileInput.current.click();
  }

  return (
    <animated.div
      className="profile-pic-wrapper"
      style={profilePicWrapper}
      onMouseEnter={() => {
        if (editMode) setIsHover(true);
      }}
      onMouseLeave={() => setIsHover(false)}
    >
      <animated.div style={profilePic}>
        <div className="profile-pic" style={{ backgroundImage: `url("${pic}")` }} />
      </animated.div>
      <animated.div className="profile-pic-new" style={newPic}>
        <IconButton onClick={handleUploadClick}>
          <Image color="secondary" />
        </IconButton>
      </animated.div>
      <input type="file" ref={fileInput} onChange={handleUpload} style={{ display: "none" }} />
    </animated.div>
  );
}
