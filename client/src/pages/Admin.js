import React from "react";
import { useQuery } from '@apollo/client';
import { Tabs, Tab } from 'react-bootstrap';
import { QUERY_ALL_CATEGORIES, QUERY_ALL_PRODUCTS, QUERY_ALL_USERS, QUERY_ALL_REVIEWS } from '../utils/queries';
import AdminCategory from '../components/AdminCategory';
import AdminProduct from '../components/AdminProduct';
import AdminUser from '../components/AdminUser';
import AdminReview from '../components/AdminReview';

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
                        <AdminCategory categoryData={categoryData} />
                    ) : null}
                </Tab>
                <Tab eventKey="products" title="Products">
                    {!loadingProducts && !loadingCategories ? (
                        <AdminProduct categoryData={categoryData} productData={productData} />
                    ) : null}
                </Tab>
                <Tab eventKey="users" title="Users">
                    {!loadingUsers ? (
                        <AdminUser userData={userData} />
                    ) : null}
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                    {!loadingReviews ? (
                        <AdminReview reviewData={reviewData}/>
                    ) : null}
                </Tab>
            </Tabs>
        </div>
    );
};

export default Admin;
