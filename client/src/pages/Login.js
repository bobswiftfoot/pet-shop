import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Auth from '../utils/auth';

function Login(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: { email: formState.email, password: formState.password },
            });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };
    return (

        <>

            <Form>
                <Form.Group onSubmit={handleFormSubmit} className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control placeholder="example123@email.com"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control placeholder="******"
                        name="password"
                        type="password"
                        id="pwd"
                        onChange={handleChange} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>

        </>
    );
}

export default Login;
