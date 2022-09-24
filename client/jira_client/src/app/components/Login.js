import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
export default function Login () {

    const [inputs, setInputs] = useState({});
    const isLoggedIn = false;// this.state.isLoggedIn;
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);
    }

    return (
        <>
        { isLoggedIn ?
            <span>username..., logout btn</span>
            :          
            <Form className="d-flex" onSubmit={handleSubmit}>
                <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                className="me-2"
                aria-label="Username"
                value={inputs.username || ""}
                onChange={handleChange}
                />
                <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                className="me-2"
                aria-label="Password"
                value={inputs.password || ""}
                onChange={handleChange}
                />
                <Button variant="outline-success" type="submit">Login</Button>
            </Form>
            }
        </>
    )

}