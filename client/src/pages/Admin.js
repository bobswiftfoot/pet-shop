import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import { QUERY_ALL_CATEGORIES } from '../utils/queries';

const Admin = () =>
{
    const [showCategories, setshowCategories] = useState(false);

    const { loading: loadingCategories, data: categoryData } = useQuery(QUERY_ALL_CATEGORIES);

    function toggleCategories()
    {
        setshowCategories(!showCategories);
    };

    return (
        <div>
            <Button variant="primary" onClick={toggleCategories}>Categories</Button>
            {!loadingCategories && showCategories ? (
                <ListGroup>
                    {categoryData.categories.map((category) => (
                        <ListGroup.Item key={category.name}>
                            <InputGroup>
                                <InputGroup.Text>Name:</InputGroup.Text>
                                <FormControl type="text" placeholder="Name" defaultValue={category.name}></FormControl>
                            </InputGroup>
                            {(category.subcategories.length > 0) ?
                                <InputGroup>
                                    <InputGroup.Text>Subcategories:</InputGroup.Text>
                                    {category.subcategories.map((subcategory) => (
                                    <Form.Select>
                                        {categoryData.categories.map(listCategory => (
                                            (listCategory._id === subcategory._id) ?
                                                <option id={listCategory._id} selected>{listCategory.name}</option> :
                                                <option id={listCategory._id}>{listCategory.name}</option>
                                        ))}
                                    </Form.Select>
                                    ))}
                                </InputGroup>
                            : null}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : null}
        </div>
    );
};
{/* Use this in Product section 
                            <InputGroup>
                                <InputGroup.Text>Category:</InputGroup.Text>
                                <Form.Select>
                                {categoryData.categories.map(listCategory => (
                                    (listCategory._id === category._id) ?
                                        <option id={listCategory._id} selected>{listCategory.name}</option> :
                                        <option id={listCategory._id}>{listCategory.name}</option>
                                    ))}
                                </Form.Select>
                            </InputGroup> */}
export default Admin;
