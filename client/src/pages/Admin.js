import React from "react";
import { useQuery } from '@apollo/client';
import { ListGroup, InputGroup, FormControl, Form, Tabs, Tab} from 'react-bootstrap';
import { QUERY_ALL_CATEGORIES, QUERY_ALL_PRODUCTS, QUERY_ALL_USERS, QUERY_ALL_REVIEWS } from '../utils/queries';
import AdminCategory from '../components/AdminCategory'

const Admin = () =>
{
    const { loading: loadingCategories, data: categoryData } = useQuery(QUERY_ALL_CATEGORIES);
    const { loading: loadingProducts, data: productData } = useQuery(QUERY_ALL_PRODUCTS);
    const { loading: loadingUsers, data: userData } = useQuery(QUERY_ALL_USERS);
    const { loading: loadingReviews, data: reviewData } = useQuery(QUERY_ALL_REVIEWS);

    return (
        <div>
            <Tabs defaultActiveKey="categories">
                <Tab eventKey="categories" title="Categories">
                    {!loadingCategories ? (
                        <AdminCategory categoryData={categoryData}/>
                    ) : null}
                </Tab>
                <Tab eventKey="products" title="Products">
                    {!loadingProducts && !loadingCategories ? (
                        <ListGroup>
                            {productData.products.map((product) => (
                                <ListGroup.Item key={product._id}>
                                    <InputGroup>
                                        <InputGroup.Text>Name:</InputGroup.Text>
                                        <FormControl type="text" placeholder="Name" defaultValue={product.name}></FormControl>
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
                                            {categoryData.categories.map(listCategory => (
                                                listCategory._id === product.category._id) ?
                                                <option key={listCategory._id} id={listCategory._id} selected>{listCategory.name}</option> :
                                                <option key={listCategory._id} id={listCategory._id}>{listCategory.name}</option>
                                            )}
                                        </Form.Select>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroup.Text>Featured:</InputGroup.Text>
                                        {/* Using createElement to make use of defaultChecked */}
                                        {React.createElement('input',{type: 'checkbox', defaultChecked: product.featuredProduct})}
                                    </InputGroup>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : null}
                </Tab>
                <Tab eventKey="users" title="Users">
                    {!loadingUsers ? (
                            <ListGroup>
                                {userData.users.map((user) => (
                                    <ListGroup.Item key={user._id}>
                                        <InputGroup>
                                            <InputGroup.Text>First Name:</InputGroup.Text>
                                            <InputGroup.Text>{user.firstName}</InputGroup.Text>
                                        </InputGroup>
                                        <InputGroup>
                                            <InputGroup.Text>Last Name:</InputGroup.Text>
                                            <InputGroup.Text>{user.lastName}</InputGroup.Text>
                                        </InputGroup>
                                        <InputGroup>
                                            <InputGroup.Text>Username:</InputGroup.Text>
                                            <InputGroup.Text>{user.userName}</InputGroup.Text>
                                        </InputGroup>
                                        <InputGroup>
                                            <InputGroup.Text>Email:</InputGroup.Text>
                                            <InputGroup.Text>{user.email}</InputGroup.Text>
                                        </InputGroup>
                                        <InputGroup>
                                            <InputGroup.Text>Admin:</InputGroup.Text>
                                            {/* Using createElement to make use of defaultChecked */}
                                            {React.createElement('input',{type: 'checkbox', defaultChecked: user.admin})} 
                                        </InputGroup>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : null}
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                    {!loadingReviews ? (
                            <ListGroup>
                                {reviewData.reviews.map((review) => (
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
                        ) : null}
                </Tab>
            </Tabs>
        </div>
    );
};

export default Admin;
