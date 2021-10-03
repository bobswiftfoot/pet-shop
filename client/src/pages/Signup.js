import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("pre-reg");

    const mutationResponse = await addUser({
      variables: {
        addUserEmail: formState.email,
        addUserPassword: formState.password,
        addUserFirstName: formState.firstName,
        addUserLastName: formState.lastName,
        addUserUserName: formState.userName
      },
    });

    console.log("post-reg");

    console.log(mutationResponse.data.addUser.user);
    console.log(mutationResponse.data.addUser.token);
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
    window.location.assign('/');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>First Name</Form.Label>
    <Form.Control placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Last Name</Form.Label>
    <Form.Control placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Username</Form.Label>
    <Form.Control placeholder="User"
            name="userName"
            type="userName"
            id="userName"
            onChange={handleChange} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicEmail">
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
    <Form.Control  placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange} />
  </Form.Group>

  <Button variant="primary" type="submit">
    Register
  </Button>
</Form>
  );
}

export default Signup;
