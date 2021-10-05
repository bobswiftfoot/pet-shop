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
import Col from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import dogfood from '../assets/images/dogfood.jpg';

//Modal
function MyVerticallyCenteredModal(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [editUser] = useMutation(EDIT_USER);

    const { loading, data } = useQuery(QUERY_ME);

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
            params.editUserPassword= formState.password;
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
            {!loading ? (
                <>
                    <div className="container my-1">
                        <Link to="/">← Back to Home</Link>
                    </div>                    
                    <div className="container my-1">
                        {data.me.admin ? <Link to="/admin">Admin Panel</Link>: null}
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
                    <div className ='order-history-container'>
                        <h2>
                            Order History for {data.me.firstName} {data.me.lastName}
                        </h2>
                        {data.me.orders.map((order) => (
                            <Container fluid>
                                <Row>
                                    <Row>
                                        <h3>
                                            {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                                        </h3>
                                    </Row>
                                    <Row>
                                    {order.products.map((product, index) => (
                                        <Col key={index} id="profile-product-col">
                                            <Link to={`/products/${product._id}`}  id="profile-product-link">
                                                <p>{product.name}</p>
                                                <img alt={product.name} src={(product.image) ? `/images/${product.image}` : dogfood} />
                                                <span>${product.price}</span>
                                            </Link>
                                        </Col>
                                    ))}
                                    </Row>
                                </Row>
                            </Container>
                        ))}
                    </div>
                    <div className ='reviews-container'>
                        <h2 className='reviews-container-h2'>
                            Reviews from {data.me.firstName} {data.me.lastName}
                        </h2>
                        <Container fluid>
                            <Row>
                            {data.me.reviews.map((review, index) => (
                                <Col key={index}  id="profile-product-col">
                                    <Link to={`/products/${review.product._id}`}  id="profile-product-link">
                                        <h3>{review.product.name}</h3>
                                        <img alt={review.product.name} src={(review.product.image) ? `/images/${review.product.image}` : dogfood} />
                                        <p>{review.reviewText}</p>
                                        <p>Rating: {review.rating}</p>
                                    </Link>

                                </Col>
                            ))}
                            </Row>
                        </Container>
                    </div>
                </>
            ) : null}
        </>)
};

export default Profile;
