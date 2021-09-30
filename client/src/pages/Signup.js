import React, { useState } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
=======
import { useMutation } from '@apollo/react-hooks';
import Auth from '../utils/auth';
>>>>>>> 6d43a92140da87e06fe716f6d1fa5d5deb4f17a6
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

<<<<<<< HEAD
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
=======
  const handleFormSubmit = async event => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email, password: formState.password,
        firstName: formState.firstName, lastName: formState.lastName
      }
>>>>>>> 6d43a92140da87e06fe716f6d1fa5d5deb4f17a6
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

<<<<<<< HEAD
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
=======
  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
>>>>>>> 6d43a92140da87e06fe716f6d1fa5d5deb4f17a6
    });
  };

  return (
<<<<<<< HEAD
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
=======
    <div className="container my-1">
      <Link to="/login">
        Go to Login
      </Link>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">First Name:</label>
          <input
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="lastName">Last Name:</label>
          <input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );

>>>>>>> 6d43a92140da87e06fe716f6d1fa5d5deb4f17a6
}

export default Signup;
