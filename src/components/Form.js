import React, { Component } from 'react';
import { FormControl, Input, Button } from '@material-ui/core';

const InputTextField = ({ name, placeholder, required, _handleChange }) => (
    <FormControl fullWidth style={{ marginTop: 10 }}>
        <Input
            type="text"
            name={name}
            required={required}
            autoComplete="off"
            placeholder={placeholder}
            onChange={_handleChange}
        />
    </FormControl>
)

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: [
                {
                    placeholder: "Name",
                    name: "name",
                    input_type: "text",
                    required: true
                },
                {
                    placeholder: "Email",
                    name: "email",
                    input_type: "text",
                    required: true
                },
                {
                    placeholder: "Prefered time to call you..",
                    name: "contact_time",
                    input_type: "text",
                    required: true
                }
            ]
        }
    }

    handleClick = event => {
        const { fields, ...inputFields } = this.state;
        console.log(inputFields);

        event.preventDefault();
    }

    _handleChange = event => {
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    render() {
        const { fields } = this.state;

        return (
            <div style={{ marginTop: 10 }}>
                {fields.map(form => {
                    return form.input_type === 'text' ?
                        <InputTextField 
                            name={form.name}
                            placeholder={form.placeholder}
                            required={form.required}
                            key={form.placeholder}
                            _handleChange={this._handleChange}
                        />
                    : null
                })}
                <Button variant="contained" color="primary" onClick={this.handleClick} style={{ marginTop: 10 }}>SUBMIT</Button>
            </div>
        )
    }
}
