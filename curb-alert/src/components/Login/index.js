import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

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

import { FormControl, FormLabel, Input} from '@chakra-ui/react';
import { Button } from 'react-bootstrap';


function Login() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const initialRef = React.useRef()
    const finalRef = React.useRef()

    const [formState, setFormState] = useState({ email: '', password: ''});
    const [login, { error }] = useMutation(LOGIN_USER);

    //update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    //submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { ...formState },
            });
            // Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        //clear form values
        setFormState({
            email: '',
            password: '',
        });
    };
  
    return (
      <>
        <Button id="profile-button" onClick={onOpen}>Login</Button>
  
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Log into your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
  
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
              <Button id="profile-button" onClick={handleFormSubmit && onClose}>Log in</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default Login;