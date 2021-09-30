import React, { useState } from 'react';
<<<<<<< HEAD
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
=======
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations'
import Auth from '../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e)
    }
  };

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

=======
    <div className="container my-1">
      <Link to="/signup">
        Go to Signup
      </Link>

      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email address:</label>
          <input
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
        {
          error ? <div>
            <p className="error-text" >Please try again</p>
          </div> : null
        }
        <div className="flex-row flex-end">
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}


>>>>>>> 6d43a92140da87e06fe716f6d1fa5d5deb4f17a6
export default Login;
