import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';


function AddPost() {

    const [image, setImage] = useState("");
    const [imageURL, setImageURL] = useState("");

    const [itemTitle, setItemTitle] = useState('')
    const [itemDescription, setItemDescription] = useState('')
    const [itemCategory, setItemCategory] = useState('')

    const [addPost, { error }] = useMutation(ADD_POST)


    const handleTitleChange = event => {
        if (event.target.value.length <= 280) {
            setItemTitle(event.target.value);
        }
    };

    const handleDescriptionChange = event => {
        if (event.target.value.length <= 280) {
            setItemDescription(event.target.value);
        }
    };
    const handleCategoryChange = event => {
        if (event.target.value.length <= 280) {
            setItemCategory(event.target.value);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        const responseData = await uploadImage()
        const imageUrlData = await responseData.json()
        console.log(imageUrlData.url)
        setImageURL(imageUrlData.url)

        try {
            await addPost({
                variables: { itemTitle, itemDescription, imageURL, itemCategory }
            });
        } catch (e) {
            console.error(e);
        }

    };



    const uploadImage = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "zmzaqmwv")
        data.append("cloud_name", "dqxbjpdda")
        return fetch("https://api.cloudinary.com/v1_1/dqxbjpdda/image/upload",
            {
                method: "post",
                body: data
            })
    }

    return (
        <div>
            <label>Item Title</label>
            <input
                type="text"
                value={itemTitle}
                onChange={handleTitleChange}
            ></input>
            <label>Item Description</label>
            <input
                type="text"
                value={itemDescription}
                onChange={handleDescriptionChange}
            ></input>
            <label>Item Category</label>
            <input
                type="text"
                value={itemCategory}
                onChange={handleCategoryChange}
            ></input>

            <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
            <button onClick={handleFormSubmit}>/Submit</button>
            <div>
                <img src={imageURL} alt="uploaded" />

            </div>
        </div >
    )



}

export default AddPost;