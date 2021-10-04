import React from 'react';
import { useMutation } from '@apollo/client';
import { ListGroup, InputGroup, FormControl, Form, Button, Row, Col, Container } from 'react-bootstrap';
import { EDIT_PRODUCT, REMOVE_PRODUCT } from '../../utils/mutations';
import { calculateRating } from '../../utils/helpers'

const AdminProduct = (props) =>
{
    const [editProduct] = useMutation(EDIT_PRODUCT);
    const [removeProduct] = useMutation(REMOVE_PRODUCT);

    const handleSaveProduct = async (event) =>
    {
        const { value: nameValue, id } = event.target.parentNode.children[0].children[1].children[0];
        const { value: descriptionValue } = event.target.parentNode.children[1].children[1].children[0];
        const { value: imageValue } = event.target.parentNode.children[2].children[1].children[0];
        const priceValue = parseFloat(event.target.parentNode.children[3].children[1].children[0].value);
        const { id: categoryValue } = event.target.parentNode.children[5].children[1].children[0].selectedOptions[0];
        const featuredValue = event.target.parentNode.children[6].children[1].children[0].value === 'true';

        try
        {
            await editProduct({ variables: { editProductId: id, editProductName: nameValue, editProductDescription: descriptionValue, editProductImage: imageValue,  editProductPrice: priceValue,editProductCategory: categoryValue,editProductFeaturedProduct: featuredValue } });
        }
        catch (e)   
        {
            console.log(e);
        }
    };    

    const handleDeleteProduct = async (event) =>
    {
        const { id } = event.target.parentNode.children[0].children[1].children[0];
        await removeProduct({ variables: { removeProductId: id } });
        window.location.reload();
    };

    return (
        <Container fluid>
            <ListGroup>
                {props.productData.products.map((product) => (
                    <ListGroup.Item key={product._id} className="mb-1 border-3">
                        <InputGroup as={Row} className="me-1 p-0 mb-1 ms-1">
                            <InputGroup.Text as={Col} sm={2} className="me-1">Name:</InputGroup.Text>
                            <Col sm={8}>
                                <FormControl type="text" placeholder="Name" id={product._id} defaultValue={product.name}></FormControl>
                            </Col>
                        </InputGroup>
                        <InputGroup as={Row} className="me-1 p-0 mb-1 ms-1">
                            <InputGroup.Text as={Col} sm={2} className="me-1">Description:</InputGroup.Text>
                            <Col sm={8}>
                                <FormControl type="text" placeholder="Description" defaultValue={product.description}></FormControl>
                            </Col>
                        </InputGroup>
                        <InputGroup as={Row} className="me-1 p-0 mb-1 ms-1">
                            <InputGroup.Text as={Col} sm={2} className="me-1">Image:</InputGroup.Text>
                            {/* TODO: Change this to a drop down containing all image chioces*/}
                            <Col sm={8}>
                                <FormControl type="text" placeholder="Image" defaultValue={product.image}></FormControl>
                            </Col>
                        </InputGroup>
                        <InputGroup as={Row} className="me-1 p-0 mb-1 ms-1">
                            <InputGroup.Text as={Col} sm={2} className="me-1">Price:</InputGroup.Text>
                            <Col sm={8}>
                                <FormControl type="text" placeholder="Price" defaultValue={product.price}></FormControl>
                            </Col>
                        </InputGroup>
                        <InputGroup as={Row} className="me-1 p-0 mb-1 ms-1">
                            <InputGroup.Text as={Col} sm={2} className="me-3">Rating:</InputGroup.Text>
                            <InputGroup.Text as={Col} sm={8}>{calculateRating(product.reviews)}</InputGroup.Text>
                        </InputGroup>
                        <InputGroup as={Row} className="me-1 p-0 mb-1 ms-1">
                            <InputGroup.Text as={Col} sm={2} className="me-1">Category:</InputGroup.Text>
                            <Col sm={8}>
                                <Form.Select key={product.category._id} defaultValue={product.category._id}>
                                    {props.categoryData.categories.map(listCategory => 
                                        { 
                                            return(<option key={listCategory._id} value={listCategory._id}>{listCategory.name}</option>)
                                        })}
                                </Form.Select>
                            </Col>
                        </InputGroup>
                        <InputGroup as={Row} className="me-1 p-0 mb-1 ms-1">
                            <InputGroup.Text as={Col} sm={2} className="me-1">Featured:</InputGroup.Text>
                            <Col sm={8}>
                                <Form.Select defaultValue={product.featuredProduct}>
                                    <option key={0} value={true}>True</option>
                                    <option key={1} value={false}>False</option>
                                </Form.Select>
                            </Col>
                        </InputGroup>
                        <Button as={Col} sm={2} className="me-1" type="submit" onClick={handleSaveProduct}>Save Product</Button>
                        <Button as={Col} sm={2} className="me-1" type="submit" variant="danger" onClick={handleDeleteProduct}>Delete Product</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default AdminProduct;