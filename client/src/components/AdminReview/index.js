import React from "react";
import { useMutation } from '@apollo/client';
import { ListGroup, InputGroup, Button, Container, Row, Col} from 'react-bootstrap';
import { REMOVE_REVIEW } from '../../utils/mutations';

const AdminReview = (props) =>
{
    const [removeReview] = useMutation(REMOVE_REVIEW);

    const handleDeleteReview = async (event) =>
    {
        const { id } = event.target.parentNode.children[0].children[1];
        await removeReview({ variables: { removeReviewId: id } });
        window.location.reload();
    };

    return (
        <Container fluid>
            <ListGroup>
                {props.reviewData.reviews.map((review) => (
                    <ListGroup.Item key={review._id} className="mb-1 border-3">
                        <InputGroup as={Row} className="me-1 p-0 mb-1 ms-1">
                            <InputGroup.Text as={Col} sm={2} className="me-1">Text:</InputGroup.Text>
                            <InputGroup.Text as={Col} sm={8} className="me-1" id={review._id}>{review.reviewText}</InputGroup.Text>
                        </InputGroup>
                        <InputGroup as={Row} className="me-1 p-0 mb-1 ms-1">
                            <InputGroup.Text as={Col} sm={2} className="me-1">Rating:</InputGroup.Text>
                            <InputGroup.Text as={Col} sm={8} className="me-1">{review.rating}</InputGroup.Text>
                        </InputGroup>
                        <InputGroup as={Row} className="me-1 p-0 mb-1 ms-1">
                            <InputGroup.Text as={Col} sm={2} className="me-1">Username:</InputGroup.Text>
                            <InputGroup.Text as={Col} sm={8} className="me-1">{review.user.userName}</InputGroup.Text>
                        </InputGroup>
                        <InputGroup as={Row} className="me-1 p-0 mb-1 ms-1">
                            <InputGroup.Text as={Col} sm={2} className="me-1">Product:</InputGroup.Text>
                            <InputGroup.Text as={Col} sm={8} className="me-1">{review.product.name}</InputGroup.Text>
                        </InputGroup>
                        <Button as={Col} sm={2}  type="submit" variant="danger" onClick={handleDeleteReview}>Delete Review</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default AdminReview;