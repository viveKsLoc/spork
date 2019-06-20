import React, { useContext } from "react";
import "./CoverPicture.css";
import img1 from "../assets/1.jpeg";
import img2 from "../assets/2.jpeg";
import Context from "./Context";
import { Button, Fab } from "@material-ui/core";
import { Edit, Save } from "@material-ui/icons";
import { useSpring, animated, useTransition } from "react-spring";

export default function CoverPicture() {
  const { tab, editMode, dispatch, auth, user } = useContext(Context);

  function handleCancel() {
    dispatch({ type: "editmode", payload: !editMode });
    dispatch({ type: "reset" });
  }

  const url = tab === 0 ? img1 : img2;

  const animateFab = useSpring({ transform: tab === 0 ? "scale(1)" : "scale(0.5)", opacity: tab === 0 ? 1 : 0 });

  const cancelBtn = useSpring({ transform: editMode ? "translate3d(0,0px,0)" : "translate3d(0,40px,0)", opacity: editMode ? 1 : 0 });

  const transition = useTransition(editMode, null, {
    from: {
      opacity: 0,
      transform: "rotate(360deg)"
    },
    enter: {
      opacity: 1,
      transform: "rotate(0deg)"
    },
    leave: {
      opacity: 0,
      transform: "rotate(0deg)",
      position: "absolute"
    }
  });

  return (
    <div className="CoverPicture">
      <div className="img" style={{ backgroundImage: `url(${url})` }} />
      <div className="edit">
        <div className="edit-center">
          <animated.div className="fab-div" style={animateFab}>
            <Fab
              className="icon"
              color="secondary"
              onClick={() => dispatch({ type: "editmode", payload: !editMode })}
              style={{ display: auth.id === user.id ? "block" : "none" }}
            >
              {transition.map(({ item, _, props }) =>
                item ? (
                  <animated.div style={props}>
                    <Save />
                  </animated.div>
                ) : (
                  <animated.div style={props}>
                    <Edit />
                  </animated.div>
                )
              )}
            </Fab>
            <animated.div style={cancelBtn}>
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
            </animated.div>
          </animated.div>
        </div>
      </div>
    </div>
  );
}
