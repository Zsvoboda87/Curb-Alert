import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PROFILE } from '../../utils/mutations';
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

import { FormControl, FormLabel, Input, Textarea, } from '@chakra-ui/react';
import { Button } from 'react-bootstrap';
// import { QUERY_USER } from '../../utils/queries';




export default function UpdateProfile() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef()
    const finalRef = React.useRef()

    const [image, setImage] = useState("");
    const [userDescription, setUserDescription] = useState('')

    const [updateProfile, { error }] = useMutation(UPDATE_PROFILE)
    // , {
    // update(cache, { data: { updateProfile } }) {
    //     // read what's currently in the cache
    //     const { user } = cache.readQuery({ query: QUERY_USER });

    //     // prepend the newest thought to the front of the array
    //     cache.writeQuery({
    //         query: QUERY_USER,
    //         data: { user: [updateProfile, ...user] }
    //     });
    // }
    // })

    const handleDescriptionChange = event => {
        if (event.target.value.length <= 280) {
            setUserDescription(event.target.value);
        }
    };

    const uploadImage = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "jtacqkdd")
        data.append("cloud_name", "dqxbjpdda")
        return fetch("https://api.cloudinary.com/v1_1/dqxbjpdda/image/upload",
            {
                method: "post",
                body: data
            })
    }

    const handleFormSubmit = async event => {
        event.preventDefault();
        const responseData = await uploadImage()
        const imageUrlData = await responseData.json()
        onClose()


        try {
            await updateProfile({
                variables: { userDescription, userImage: imageUrlData.url }
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <Button id="button" onClick={onOpen}>UpdateProfile</Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add an item to the curb!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>


                        <FormControl mt={4}>
                            <FormLabel>Tell Us About Yourself:</FormLabel>
                            <Textarea placeholder='Describe this item'
                                type="text"
                                value={userDescription}
                                onChange={handleDescriptionChange} />
                        </FormControl>
                        <FormLabel>Upload a Profile Image:</FormLabel>
                        <Input type="file" onChange={(e) => setImage(e.target.files[0])} />

                    </ModalBody>


                    <ModalFooter justifyContent="center">
                        <Button id="profile-button" colorScheme='blue' mr={3}
                            onClick={handleFormSubmit}
                        >
                            Upload Post!
                        </Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    )
}