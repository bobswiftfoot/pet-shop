import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
// import { EDIT_USER } from '../utils/queries';
import { QUERY_ME } from '../utils/queries';
// import { useMutation } from '@apollo/client';

import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//Modal
function MyVerticallyCenteredModal(props) {
    // const [formState, setFormState] = useState({ email: '', password: '' });
    // const [editUser] = useMutation(EDIT_USER);

    // const handleFormSubmit = async (event) => {
    //   event.preventDefault();
    //   console.log("pre-reg");

    //   const mutationResponse = await editUser({
    //     variables: {
    //       editUserEmail: formState.email,
    //       editUserPassword: formState.password,
    //       editUserFirstName: formState.firstName,
    //       editUserLastName: formState.lastName,
    //       editUserUserName: formState.userName
    //     },
    //   });

    //   console.log("post-reg");

    //   console.log(mutationResponse.data.editUser.user);
    //   console.log(mutationResponse.data.editUser.token);
    //   const token = mutationResponse.data.editUser.token;
    //   Auth.login(token);
    // };

    // const handleChange = (event) => {
    //   const { name, value } = event.target;
    //   setFormState({
    //     ...formState,
    //     [name]: value,
    //   });
    // };

    return (
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
                        <Form.Control placeholder="First"
                            defaultValue=""
                            name="firstName"
                            type="firstName"
                            id="firstName"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control placeholder="Last"
                            name="lastName"
                            type="lastName"
                            id="lastName"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Username</Form.Label>
                        <Form.Control placeholder="User"
                            name="userName"
                            type="userName"
                            id="userName"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control placeholder="example123@email.com"
                            name="email"
                            type="email"
                            id="email"
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control placeholder="******"
                            name="password"
                            type="password"
                            id="pwd"
                        />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className='register-btn' variant="primary" type="submit" onClick={props.onHide}>
                    Save!
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function Profile() {
    const { loading, data } = useQuery(QUERY_ME);

    const user = data?.me || data?.user || {};

    // let user;

    // if (data) {
    //     user = data.user;
    // }

    //for Modal
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            {console.log(data)};
            {!loading ? (
                <>
                    <div className="container my-1">
                        <Link to="/">← Back to Home</Link>
                    </div>
                    <div className="container-fluid">
                        <Card className="mb-3 mx-auto profile-card">
                            <Row className="g-0">
                                <div>
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
