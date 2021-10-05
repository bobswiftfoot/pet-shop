import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CURRENT_CATEGORY,
  UPDATE_TOPCATEGORIES,
} from '../../utils/actions';
import { QUERY_TOPCATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import { Dropdown, DropdownButton, Navbar, Button } from 'react-bootstrap';

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { topCategories } = state;

  const { loading, data: topCategoryData } = useQuery(QUERY_TOPCATEGORIES);

  useEffect(() => {
    if (topCategoryData) {
      dispatch({
        type: UPDATE_TOPCATEGORIES,
        topCategories: topCategoryData.topCategories,
      });
      topCategoryData.topCategories.forEach((category) => {
        idbPromise('topCategories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('topCategories', 'get').then((topCategories) => {
        dispatch({
          type: UPDATE_TOPCATEGORIES,
          topCategories: topCategories,
        });
      });
    }
  }, [topCategoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  if (loading) {
    return (<div>
      Loading...
    </div>)
  }

  return (
    <Navbar>
      <h2> Choose a Category: </h2>
        <Button onClick={() => { handleClick(null);}} > All </Button>
        {topCategoryData.topCategories.map((category) => (
        <DropdownButton key={category._id}
                        title={category.name}
                        className="m-1">
          {category.subcategories.map((subCategory) => (
            <Dropdown.Item  
                          as='button'
                            key={subCategory._id}
                            onClick={() => {
                            handleClick(subCategory._id);}}  
                            id="dropdown-item" 
                            title={subCategory.name}>
                            {subCategory.name}
            </Dropdown.Item>
          ))}  

        </DropdownButton>
        ))}
    </Navbar>
  );
}

export default CategoryMenu;
