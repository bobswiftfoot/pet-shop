import React from "react";
import { useMutation } from '@apollo/client';
import { ListGroup, InputGroup, Button, Container, Row, Col} from 'react-bootstrap';
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
        <Container fluid>
            <ListGroup>
                {props.userData.users.map((user) => (
                    <ListGroup.Item key={user._id} className="mb-1 border-3">
                        <InputGroup as={Row} className="me-1 p-0 mb-1 ms-1">
                            <InputGroup.Text as={Col} sm={2} className="me-1">First Name:</InputGroup.Text>
                            <InputGroup.Text as={Col} sm={8} className="me-1" id={user._id}>{user.firstName}</InputGroup.Text>
                        </InputGroup>
                        <InputGroup as={Row} className="me-1 p-0 mb-1 ms-1">
                            <InputGroup.Text as={Col} sm={2} className="me-1">Last Name:</InputGroup.Text>
                            <InputGroup.Text as={Col} sm={8} className="me-1">{user.lastName}</InputGroup.Text>
                        </InputGroup>
                        <InputGroup as={Row} className="me-1 p-0 mb-1 ms-1">
                            <InputGroup.Text as={Col} sm={2} className="me-1">Username:</InputGroup.Text>
                            <InputGroup.Text as={Col} sm={8} className="me-1">{user.userName}</InputGroup.Text>
                        </InputGroup>
                        <InputGroup as={Row} className="me-1 p-0 mb-1 ms-1">
                            <InputGroup.Text as={Col} sm={2} className="me-1">Email:</InputGroup.Text>
                            <InputGroup.Text as={Col} sm={8} className="me-1">{user.email}</InputGroup.Text>
                        </InputGroup>
                        <InputGroup as={Row} className="me-1 p-0 mb-1 ms-1">
                            <InputGroup.Text as={Col} sm={2} className="me-1">Admin:</InputGroup.Text>
                            <Col sm={8} className="p-0 me-1">
                                <InputGroup.Checkbox checked={user.admin} readOnly={true} className="m-1 p-1" />
                            </Col>
                        </InputGroup>
                        <Button as={Col} sm={2} className="me-1" type="submit" variant="danger" onClick={handleDeleteUser}>Delete User</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default AdminUser;