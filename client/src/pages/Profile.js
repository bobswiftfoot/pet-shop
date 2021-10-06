import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { EDIT_USER } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getImage } from '../utils/images';

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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <>
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

    if(!loading && !data)
    {
        window.location.assign("/");
    }

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
                        <Card id="profile-card" className="mb-3 profile-card w-90">
                            <Row className="g-0">
                                <div>
                                    <Card.Title id="profile-card-header" className='mx-auto'><h1>{`${data.me.firstName} ${data.me.lastName}`}</h1></Card.Title>
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
                    </div><br />
                    <div>
                        <h2 id='profile-page-headers' className="text-center mx-auto">
                            Order History for {data.me.firstName} {data.me.lastName}
                        </h2>
                        <Container className="mx-auto px-auto">
                                {data.me.orders.map((order, index) => (
                                    <>
                                    <h3 id='order-history-date' className="text-center my-3">
                                        {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                                    </h3>
                                    <div className='flex-row justify-content-around my-5 mx-auto' key={`Order${index}`}>
                                        {order.products.map((product, index) => (
                                                <Col className='col-md-4' key={index}>
                                                    <Link className="mb-4 px-auto mx-auto" to={`/products/${product._id}`}>
                                                        <p>{product.name}</p>
                                                        <img className='profile-page-img' alt={product.name} src={getImage(product.image)} /><br />
                                                        <span>${product.price}</span>
                                                    </Link><br />
                                                </Col>
                                        ))}
                                    </div>
                                    </>
                                ))}
                        </Container><br />
                    </div><br />
                    <div>
                        <h2 id='profile-page-headers' className='text-center mx-auto'>
                            Reviews from {data.me.firstName} {data.me.lastName}
                        </h2>
                        <Container className="mx-auto px-auto">
                            <div className='flex-row justify-content-around mx-auto my-3'>
                                {data.me.reviews.map((review, index) => (
                                    <>
                                        <Col className="col-md-4" key={index}>
                                            <Link className="mb-4 px-auto mx-3" to={`/products/${review.product._id}`}>
                                                <h3>{review.product.name}</h3>
                                                <img className='profile-page-img' alt={review.product.name} src={getImage(review.product.image)} />
                                                <p>{review.reviewText}</p>
                                                <p>Rating: {review.rating}</p>
                                            </Link><br />
                                        </Col>
                                    </>
                                ))}
                            </div>
                        </Container>
                    </div>
                </>
            ) : null}
        </>)
};

export default Profile;
