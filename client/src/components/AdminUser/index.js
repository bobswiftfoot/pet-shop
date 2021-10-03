import React from "react";
import { useMutation } from '@apollo/client';
import { ListGroup, InputGroup, Button} from 'react-bootstrap';
import { REMOVE_USER } from '../../utils/mutations';

const AdminUser = (props) =>
{    
    const [removeUser] = useMutation(REMOVE_USER);

    const handleDeleteUser = async (event) =>
    {
        const { id } = event.target.parentNode.children[0].children[1];
        await removeUser({ variables: { removeUserId: id } });
        window.location.reload();
    };

    return (
        <ListGroup>
            {props.userData.users.map((user) => (
                <ListGroup.Item key={user._id}>
                    <InputGroup>
                        <InputGroup.Text>First Name:</InputGroup.Text>
                        <InputGroup.Text id={user._id}>{user.firstName}</InputGroup.Text>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Last Name:</InputGroup.Text>
                        <InputGroup.Text>{user.lastName}</InputGroup.Text>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Username:</InputGroup.Text>
                        <InputGroup.Text>{user.userName}</InputGroup.Text>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Email:</InputGroup.Text>
                        <InputGroup.Text>{user.email}</InputGroup.Text>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Admin:</InputGroup.Text>
                        <InputGroup.Checkbox checked={user.admin} readOnly={true} />
                    </InputGroup>
                    <Button type="submit" variant="danger" onClick={handleDeleteUser}>Delete User</Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default AdminUser;