import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { validateEmail, checkPassword } from '../../utils/helpers';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'

import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Button } from 'react-bootstrap';

function SignUp() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef()
  const finalRef = React.useRef()

  const [addUser, { error }] = useMutation(ADD_USER);

  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = formState;
  const [errorMessage, setErrorMessage] = useState(''); 

  //update state based on form input changes
  const handleChange = (e) => {
    if (e.target.name === 'email') {
      const isEmailValid = validateEmail(e.target.value);
      console.log(isEmailValid);
      if(!isEmailValid) {
          setErrorMessage('Your email is invalid');
      } else {
          if (!e.target.value.length) {
              setErrorMessage(`${e.target.name} is required.`);
          } else {
              setErrorMessage('');
          }
      }
  }
  if (e.target.name === 'password') {
    const isPasswordValid = checkPassword(e.target.value);
    console.log(checkPassword);
    if(!isPasswordValid) {
      setErrorMessage('Your password needs to be at least 5 characters');
    } else {
      if(!e.target.value.length) {
        setErrorMessage(`${e.target.name} is required.`);
      } else {
        setErrorMessage('');
      }
    }
  }
  if (!errorMessage) {
      setFormState({...formState, [e.target.name]: e.target.value })
  }
  console.log(errorMessage);
  };

  //submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    onClose()
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token)
    } catch (e) {
      console.error(e);
      alert("Sign up failed")
    }
  };

  return (
    <>
      <Button id="button" onClick={onOpen}>Sign Up</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your Curb Alert account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input placeholder='Username'
                type="text"
                name="username"
                defaultValue={username}
                onChange={handleChange} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input placeholder='Email'
                name="email"
                type="email"
                id="email"
                defaultValue={email}
                onChange={handleChange} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input placeholder='Password'
                name="password"
                type="password"
                id="password"
                defaultValue={password}
                onChange={handleChange} />
            </FormControl>
            {errorMessage && (
                    <div>
                        <p className="error-text">{errorMessage}</p>
                    </div>
                )}
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button id="button" onClick={handleFormSubmit}>Sign up</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SignUp;