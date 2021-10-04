<<<<<<< HEAD
import React from 'react';
import { useMutation } from '@apollo/client';
import { ListGroup, InputGroup, FormControl, Form, Button, Row, Col, Container } from 'react-bootstrap';
import { EDIT_PRODUCT, REMOVE_PRODUCT } from '../../utils/mutations';
import { calculateRating } from '../../utils/helpers'
=======
import React from "react";
import { useMutation } from '@apollo/client';
import { ListGroup, InputGroup, FormControl, Form, Button } from 'react-bootstrap';
import { EDIT_PRODUCT } from '../../utils/mutations';
>>>>>>> alan

const AdminProduct = (props) =>
{
    const [editProduct] = useMutation(EDIT_PRODUCT);
<<<<<<< HEAD
    const [removeProduct] = useMutation(REMOVE_PRODUCT);

    const handleSaveProduct = async (event) =>
    {
        const { value: nameValue, id } = event.target.parentNode.children[0].children[1].children[0];
        const { value: descriptionValue } = event.target.parentNode.children[1].children[1].children[0];
        const { value: imageValue } = event.target.parentNode.children[2].children[1].children[0];
        const priceValue = parseFloat(event.target.parentNode.children[3].children[1].children[0].value);
        const { id: categoryValue } = event.target.parentNode.children[5].children[1].children[0].selectedOptions[0];
        const featuredValue = event.target.parentNode.children[6].children[1].children[0].value === 'true';
=======

    const handleSaveProduct = async (event) =>
    {
        const { value: nameValue, id } = event.target.parentNode.children[0].children[1];
        const { value: descriptionValue } = event.target.parentNode.children[1].children[1];
        const { value: imageValue } = event.target.parentNode.children[2].children[1];
        const priceValue = parseFloat(event.target.parentNode.children[3].children[1].value);
        const { id: categoryValue } = event.target.parentNode.children[4].children[1].selectedOptions[0];
        const featuredValue = event.target.parentNode.children[5].children[1].checked;
>>>>>>> alan

        try
        {
            await editProduct({ variables: { editProductId: id, editProductName: nameValue, editProductDescription: descriptionValue, editProductImage: imageValue,  editProductPrice: priceValue,editProductCategory: categoryValue,editProductFeaturedProduct: featuredValue } });
<<<<<<< HEAD
=======
            window.location.reload();
>>>>>>> alan
        }
        catch (e)   
        {
            console.log(e);
        }
<<<<<<< HEAD
    };    

    const handleDeleteProduct = async (event) =>
    {
        const { id } = event.target.parentNode.children[0].children[1];
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
=======
    };

    return (
        <ListGroup>
            {props.productData.products.map((product) => (
                <ListGroup.Item key={product._id}>
                    <InputGroup>
                        <InputGroup.Text>Name:</InputGroup.Text>
                        <FormControl type="text" placeholder="Name" id={product._id} defaultValue={product.name}></FormControl>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Description:</InputGroup.Text>
                        <FormControl type="text" placeholder="Description" defaultValue={product.description}></FormControl>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Image:</InputGroup.Text>
                        {/* TODO: Change this to a drop down containing all image chioces*/}
                        <FormControl type="text" placeholder="Image" defaultValue={product.image}></FormControl>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Price:</InputGroup.Text>
                        <FormControl type="text" placeholder="Price" defaultValue={product.price}></FormControl>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Category:</InputGroup.Text>
                        <Form.Select key={product.category._id}>
                            {props.categoryData.categories.map(listCategory => (
                                listCategory._id === product.category._id) ?
                                <option key={listCategory._id} id={listCategory._id} selected>{listCategory.name}</option> :
                                <option key={listCategory._id} id={listCategory._id}>{listCategory.name}</option>
                            )}
                        </Form.Select>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Featured:</InputGroup.Text>
                        {/* Using createElement to make use of defaultChecked */}
                        {React.createElement('input', { type: 'checkbox', defaultChecked: product.featuredProduct })}
                    </InputGroup>
                    <Button type="submit" onClick={handleSaveProduct}>Save Product</Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
>>>>>>> alan
    );
};

export default AdminProduct;