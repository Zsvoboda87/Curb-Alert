import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { Button } from 'react-bootstrap';


const Message = ({ username }) => {

    console.log(username)
    const { loading, data } = useQuery(QUERY_USER, {
        variables: { username: username }
    });

    const user = data?.user || {};
    console.log(data);

    return (

        <Button id="button-singlePost" variant="primary"><a href={`mailto:${user.email}`} target="_blank">Message the Owner</a></Button>
    )
}

export default Message;