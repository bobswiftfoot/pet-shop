import React from "react";
import { useQuery } from '@apollo/client';
import { Tabs, Tab } from 'react-bootstrap';
import { QUERY_ALL_CATEGORIES, QUERY_ALL_PRODUCTS, QUERY_ALL_USERS, QUERY_ALL_REVIEWS, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth'
import AdminCategory from '../components/AdminCategory';
import AdminProduct from '../components/AdminProduct';
import AdminUser from '../components/AdminUser';
import AdminReview from '../components/AdminReview';

const Admin = () =>
{
    if(!Auth.loggedIn())
        window.location.assign('/');

    const { loading: loadingCategories, data: categoryData } = useQuery(QUERY_ALL_CATEGORIES);
    const { loading: loadingProducts, data: productData } = useQuery(QUERY_ALL_PRODUCTS);
    const { loading: loadingUsers, data: userData } = useQuery(QUERY_ALL_USERS);
    const { loading: loadingReviews, data: reviewData } = useQuery(QUERY_ALL_REVIEWS);
    const { loading: loadingUser, data: currentUserData } = useQuery(QUERY_ME);

    if(loadingUser)
        return (<div>Loading...</div>);

    if(!currentUserData?.me.admin)
    {
        window.location.assign('/');
        return (<div>Loading...</div>);
    }

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
