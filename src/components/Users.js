import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Avatar } from "@material-ui/core";
import { dataUsers } from "../vars";

export default function Users() {
  return (
    <Paper style={{ overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Profile picture</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(dataUsers).map(userKey => (
            <TableRow>
              <TableCell>
                <Avatar src={dataUsers[userKey].pic} />
              </TableCell>
              <TableCell>{dataUsers[userKey].name}</TableCell>
              <TableCell>{dataUsers[userKey].location}</TableCell>
              <TableCell />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
