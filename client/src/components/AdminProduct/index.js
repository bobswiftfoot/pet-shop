import React from "react";
import { useMutation } from '@apollo/client';
import { ListGroup, InputGroup, FormControl, Form, Button } from 'react-bootstrap';
import { EDIT_PRODUCT } from '../../utils/mutations';

const AdminProduct = (props) =>
{
    const [editProduct] = useMutation(EDIT_PRODUCT);

    const handleSaveProduct = async (event) =>
    {
        const { value: nameValue, id } = event.target.parentNode.children[0].children[1];
        const { value: descriptionValue } = event.target.parentNode.children[1].children[1];
        const { value: imageValue } = event.target.parentNode.children[2].children[1];
        const priceValue = parseFloat(event.target.parentNode.children[3].children[1].value);
        const { id: categoryValue } = event.target.parentNode.children[4].children[1].selectedOptions[0];
        const featuredValue = event.target.parentNode.children[5].children[1].checked;

        try
        {
            await editProduct({ variables: { editProductId: id, editProductName: nameValue, editProductDescription: descriptionValue, editProductImage: imageValue,  editProductPrice: priceValue,editProductCategory: categoryValue,editProductFeaturedProduct: featuredValue } });
            window.location.reload();
        }
        catch (e)   
        {
            console.log(e);
        }
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
    );
};

export default AdminProduct;