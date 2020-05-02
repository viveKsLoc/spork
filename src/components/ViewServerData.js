import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';
import axios from 'axios';

export default function ViewServerData() {
    const [ data, setData ] = useState([]);

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/todos`)
        .then((response) => {
            console.log(response.data)
            setData(response.data)
        })
    }, []);

    return (
        <div>
            <h1>Todos</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Todo ID</TableCell>
                        <TableCell>Todo Title</TableCell>
                        <TableCell>User ID</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item,index) => (
                        <tr key={index}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell style={{ textTransform: 'capitalize' }}>{item.title}</TableCell>
                            <TableCell>{item.userId}</TableCell>
                            <TableCell>{item.completed === true ? 'Completed' : 'Pending'}</TableCell>
                        </tr>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
