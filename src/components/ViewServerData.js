import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableHead, TableRow, TableCell, Button, Input } from '@material-ui/core';
import axios from 'axios';

export default function ViewServerData() {
    const [ data, setData ] = useState([]);
    const [ filteredData, setFilteredData ] = useState([]);

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/todos`)
        .then((response) => {
            console.log(response.data)
            setData(response.data);
            setFilteredData(response.data);
        })
    }, []);

    const searchHandle = (e) => {
        setFilteredData(data.filter((item) => item.title.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0));
    }

    return (
        <div>
            <h1>Todos</h1>
            <Input placeholder="Search todos..." fullWidth onChange={searchHandle} />
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
                    {filteredData.map((item,index) => (
                        <TableRow key={index}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell style={{ textTransform: 'capitalize' }}>{item.title}</TableCell>
                            <TableCell>{item.userId}</TableCell>
                            <TableCell>{item.completed === true ? 'Completed' : 'Pending'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
