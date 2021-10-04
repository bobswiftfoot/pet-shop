import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { EDIT_USER } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';

import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//Modal
function MyVerticallyCenteredModal(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [editUser] = useMutation(EDIT_USER);

    const { loading, data } = useQuery(QUERY_ME);

    const user = data?.me || data?.user || {};

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        console.log("pre-edit");

        const params = {
            editUserId: data.me._id,
            editUserEmail: formState.email,
            editUserFirstName: formState.firstName,
            editUserLastName: formState.lastName,
            editUserUserName: formState.userName
        };

        if (formState.password) {
            params.editUserPassword = formState.password;
        }

        console.log(params);

        const mutationResponse = await editUser({
            variables: params
        });

        console.log("post-edit");

        console.log(mutationResponse.data.editUser.user);
        console.log(mutationResponse.data.editUser.token);
        const token = mutationResponse.data.editUser.token;
        Auth.login(token);
        window.location.assign('/profile');
    };

    // const [editUser, { error }] = useMutation(EDIT_USER);

    // const handleEditSubmit = async (event) =>
    // {
    //     const { value, id } = event.target.parentNode.children[0].children[1];
    //     try
    //     {
    //         await editUser({ variables: { editUserId: id, editUserFirstName: value, 
    //             editUserLastName: value,
    //             editUserUserName: value,
    //             editUserEmail: value,
    //             editUserPassword: value } });
    //     }
    //     catch (e)   
    //     {
    //         console.log(e);
    //     }
    // };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <>
            {console.log(data)}
            {!loading ? (
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Profile
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control placeholder="First Name"
                                    defaultValue={`${data.me.firstName}`}
                                    name="firstName"
                                    type="firstName"
                                    id="firstName"
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control placeholder="Last Name"
                                    defaultValue={`${data.me.lastName}`}
                                    name="lastName"
                                    type="lastName"
                                    id="lastName"
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Username</Form.Label>
                                <Form.Control placeholder="Username"
                                    defaultValue={`${data.me.userName}`}
                                    name="userName"
                                    type="userName"
                                    id="userName"
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control placeholder="example123@email.com"
                                    defaultValue={`${data.me.userName}`}
                                    name="email"
                                    type="email"
                                    id="email"
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control placeholder="******"
                                    name="password"
                                    type="password"
                                    id="pwd"
                                    onChange={handleChange}
                                />
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <Button className='register-btn' variant="primary" type="submit" onClick={props.onHide}>
                    Save!
                </Button> */}
                        <Button className='register-btn' variant="primary" type="submit" onClick={handleEditSubmit}>
                            Save!
                        </Button>
                    </Modal.Footer>
                </Modal>
            ) : null}
        </>
    );
}

function Profile() {
    const { loading, data } = useQuery(QUERY_ME);

    //for Modal
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            {console.log(data)}
            {!loading ? (
                <>
                    <div className="container my-1">
                        <Link to="/">← Back to Home</Link>
                    </div>
                    <div className="container-fluid">
                        <Card className="mb-3 mx-auto profile-card">
                            <Row className="g-0">
                                <div>
                                    {console.log(data)}
                                    <Card.Title><h1>{`${data.me.firstName} ${data.me.lastName}`}</h1></Card.Title>
                                    <Card.Body className='profile-card-body'>
                                        <h3 className="pb-1">Username: {`${data.me.userName}`}</h3>
                                        <h3 className="pb-1">Email: {`${data.me.email}`}</h3><br />
                                        <Button className="btn btn-dark" onClick={() => setModalShow(true)}>Edit Profile</Button>
                                        <MyVerticallyCenteredModal
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                        />
                                    </Card.Body>
                                </div>
                            </Row>
                        </Card>
                    </div>
                    <div>
                        <h2>
                            Order History for {data.me.firstName} {data.me.lastName}
                        </h2>
                        {data.me.orders.map((order) => (
                            <div key={order._id} className="my-2">
                                {console.log(order)}
                                <h3>
                                    {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                                </h3>
                                <div className="flex-row">
                                    {order.products.map(({ _id, name }, index) => (
                                        <div key={index} className="card px-1 py-1">
                                            <Link to={`/products/${_id}`}>
                                                {/* <img alt={name} src={`/images/${image}`} /> */}
                                                <p>{name}</p>
                                            </Link>
                                            {/* <div>
                                                <span>${price}</span>
                                            </div> */}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2>
                            Reviews History for {data.me.firstName} {data.me.lastName}
                        </h2>
                        {data.me.reviews.map((review) => (
                            <div key={review._id} className="my-2">
                                {/* <h3>
                                    {new Date(parseInt(review.purchaseDate)).toLocaleDateString()}
                                </h3>
                                 <div className="flex-row">
                                    {reviews.reviewText.map((index) => (
                                        <div key={index} className="card px-1 py-1">
                                            <Link to={`/products/${_id}`}>
                                                <img alt={name} src={`/images/${image}`} />
                                                <p>{reviewText}</p>
                                            </Link>
                                            <div>
                                                <span>${price}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div> */}
                            </div>
                        ))}
                    </div>
                </>
            ) : null}
        </>)
};

export default Profile;
