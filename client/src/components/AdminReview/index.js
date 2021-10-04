import React from "react";
import { useMutation } from '@apollo/client';
import { ListGroup, InputGroup, Button} from 'react-bootstrap';
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
        <ListGroup>
            {props.reviewData.reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                    <InputGroup>
                        <InputGroup.Text>Text:</InputGroup.Text>
                        <InputGroup.Text id={review._id}>{review.reviewText}</InputGroup.Text>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Rating:</InputGroup.Text>
                        <InputGroup.Text>{review.rating}</InputGroup.Text>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Username:</InputGroup.Text>
                        <InputGroup.Text>{review.user.userName}</InputGroup.Text>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Product:</InputGroup.Text>
                        <InputGroup.Text>{review.product.name}</InputGroup.Text>
                    </InputGroup>
                    <Button type="submit" variant="danger" onClick={handleDeleteReview}>Delete Review</Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default AdminReview;