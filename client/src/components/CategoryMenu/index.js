import React from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_TOPCATEGORIES } from '../../utils/queries';
import { Dropdown, DropdownButton, Navbar, Button } from 'react-bootstrap';

function CategoryMenu() {

  const [state, dispatch] = useStoreContext();

  const { loading, data: topCategoryData } = useQuery(QUERY_TOPCATEGORIES);

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
        <Button onClick={() => { handleClick(null);}} > All </Button>
        {topCategoryData.topCategories.map((category) => (
        <DropdownButton key={category._id}
                        title={category.name}
                        className="m-1">
          {category.subcategories.map((subCategory) => (
            <Dropdown.Item
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
