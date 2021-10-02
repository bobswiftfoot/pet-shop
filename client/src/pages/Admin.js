import React, { useState } from "react";
import { useQuery } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { QUERY_ALL_CATEGORIES } from '../utils/queries';

const Admin = () =>
{
    const [showCategories, setshowCategories] = useState(false);

    const { loading: loadingCategories, data: categoryData } = useQuery(QUERY_ALL_CATEGORIES);


    function toggleCategories()
    {
        setshowCategories(!showCategories);
        console.log(categoryData);
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
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : null}
        </div>
    );
};

export default Admin;
