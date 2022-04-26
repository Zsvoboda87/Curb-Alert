import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

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

  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [addUser, { error }] = useMutation(ADD_USER);

  //update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
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
    }
  };

  return (
    <>
      <Button id="profile-button" onClick={onOpen}>Sign Up</Button>

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
                value={formState.username}
                onChange={handleChange} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input placeholder='Email'
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input placeholder='Password'
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button id="profile-button" onClick={handleFormSubmit}>Sign up</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SignUp;