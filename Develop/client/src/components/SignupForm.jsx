import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { createUser } from '../utils/API';
import Auth from '../utils/auth';

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Something went wrong with your signup!');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (userFormData.password !== userFormData.confirmPassword) {
      setErrorMessage("Passwords don't match!");
      setShowAlert(true);
      return;
    }

    try {
      const response = await createUser(userFormData);

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const { token, user } = await response.json();
      Auth.login(token);
    } catch (err) {
      setErrorMessage(err.message);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          {errorMessage}
        </Alert>
        // ... [the rest of the form remains unchanged]

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='confirmPassword'>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm your password'
            name='confirmPassword'
            onChange={handleInputChange}
            value={userFormData.confirmPassword}
            required
          />
          <Form.Control.Feedback type='invalid'>Password confirmation is required!</Form.Control.Feedback>
        </Form.Group>

        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password && userFormData.confirmPassword)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
