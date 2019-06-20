import React from "react";
import { Paper, List, ListItem, Avatar, ListItemText, ListSubheader, ListItemAvatar, Divider } from "@material-ui/core";

export default function FriendList({ friends, dispatch }) {
  return (
    <Paper>
      <List subheader={<ListSubheader>Friends</ListSubheader>}>
        <Divider />
        {friends.map(friend => (
          <ListItem button onClick={() => dispatch({ type: "switchUser", payload: friend })}>
            <ListItemAvatar>
              <Avatar src={friend.pic} />
            </ListItemAvatar>
            <ListItemText primary={friend.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
