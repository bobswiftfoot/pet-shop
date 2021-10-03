import React from "react";
import { ListGroup, InputGroup} from 'react-bootstrap';

const AdminReview = (props) =>
{
    return (
        <ListGroup>
            {props.reviewData.reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                    <InputGroup>
                        <InputGroup.Text>Text:</InputGroup.Text>
                        <InputGroup.Text>{review.reviewText}</InputGroup.Text>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Rating:</InputGroup.Text>
                        <InputGroup.Text>{review.rating}</InputGroup.Text>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Username:</InputGroup.Text>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Product:</InputGroup.Text>
                    </InputGroup>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default AdminReview;