import React from "react";
import { ListGroup, InputGroup} from 'react-bootstrap';

const AdminUser = (props) =>
{
    return (
        <ListGroup>
            {props.userData.users.map((user) => (
                <ListGroup.Item key={user._id}>
                    <InputGroup>
                        <InputGroup.Text>First Name:</InputGroup.Text>
                        <InputGroup.Text>{user.firstName}</InputGroup.Text>
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
                        {/* Using createElement to make use of defaultChecked */}
                        {/* {React.createElement('input', { type: 'checkbox', defaultChecked: user.admin })} */}
                        <InputGroup.Checkbox checked={user.admin} />
                    </InputGroup>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default AdminUser;