import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  UPDATE_TOPCATEGORIES,
  UPDATE_SUBCATEGORIES
} from '../../utils/actions';
import { QUERY_TOPCATEGORIES } from '../../utils/queries';
import { QUERY_SUBCATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import wolf from '../../assets/images/wolf.jpg';
import tiger from '../../assets/images/tiger.jpg';
import shark from '../../assets/images/whale-shark.jpg';
import reptile from '../../assets/images/reptile.jpg';
import eagle from '../../assets/images/eagle.jpg';
import rodent from '../../assets/images/rodent.jpg';
import gorilla from '../../assets/images/gorilla.jpg';

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { topCategories, subCategories } = state;

  const { loading, data: topCategoryData } = useQuery(QUERY_TOPCATEGORIES);

  const { loading1, data: subCategoryData } = useQuery(QUERY_SUBCATEGORIES);


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

  useEffect(() => {
    if (subCategoryData) {
      dispatch({
        type: UPDATE_SUBCATEGORIES,
        subCategories: subCategoryData.subcategories,
      });
      subCategoryData.subcategories.forEach((subCategory) => {
        idbPromise('subCategories', 'put', subCategory);
      });
    } else if (!loading1) {
      idbPromise('subCategories', 'get').then((subCategories) => {
        dispatch({
          type: UPDATE_SUBCATEGORIES,
          subCategories: subCategories,
        });
      });
    }
  }, [subCategoryData, loading1, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  if (loading || loading1) {
    return (<div>
      Loading...
    </div>)
  }

  console.log(topCategoryData.topCategories);

  return (
  <div>
    <h2>Choose a Category</h2>
    {topCategoryData.topCategories.map((category) => (
    <DropdownButton key={category._id}
                    onClick={() => {
                    handleClick(category._id);}}  
                    id="dropdown-item-button" 
                    title={category.name}
    >
      {/* {category.subCategories.map((subCategory) => ( */}
        <Dropdown.Item  
                      // as='button'
                      //   key={subCategory._id}
                      //   onClick={() => {
                      //   handleClick(subCategory._id);}}  
                      //   id="dropdown-item" 
                      //   title={subCategory.name}
        >
                        {/* {subCategory.name} */}
        </Dropdown.Item>
      {/* ))}   */}

    </DropdownButton>
    ))}
  </div>
  );
}

export default CategoryMenu;
