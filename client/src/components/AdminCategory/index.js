import React from "react";
import ReactDOM from 'react-dom'
import { useMutation } from '@apollo/client';
import { ListGroup, InputGroup, FormControl, Form, Button} from 'react-bootstrap';
import { EDIT_CATEGORY, REMOVE_CATEGORY } from '../../utils/mutations';

const SubcategoryFormSelect = (props) =>
{
    const subCategoryId = props.subcategory ? props.subcategory._id : props.category;
  
    const handleDeleteSubcategory = (event) =>
    {
        event.target.parentNode.remove();
    }
    return (
        <React.Fragment>
            <Form.Select name="subcategories" key={subCategoryId} id={props.category}>
            {props.categories.map(listCategory => 
                {
                    //Don't show the parent Category
                    if(listCategory._id !== props.category)
                    {
                        let hide = false;
                        props.subCategories.forEach(subcategory => 
                            {
                                //Don't show options that other subcategories are set to
                                if(subcategory._id === listCategory._id && subcategory._id !== subCategoryId)
                                {
                                    hide = true;
                                }
                            })
                        if(hide)
                            return null;
                        return (listCategory._id === subCategoryId) ?
                            <option key={listCategory._id} id={listCategory._id} selected>{listCategory.name}</option> :
                            <option key={listCategory._id} id={listCategory._id}>{listCategory.name}</option>
                    }
                    return null;
                }
            )}
            </Form.Select>
            <Button variant="danger" onClick={handleDeleteSubcategory}>Remove</Button>
        </React.Fragment>
    )
};

const AdminCategory = (props) =>
{
    const [editCategory] = useMutation(EDIT_CATEGORY);
    const [removeCategory] = useMutation(REMOVE_CATEGORY);

    const handleSaveCategory = async (event) =>
    {
        const { value, id } = event.target.parentNode.children[0].children[1];
        const subCategoryElements = event.target.parentNode.children[1].children;
        let subcategories = new Set();
        console.log(subCategoryElements)
        if(subCategoryElements.length > 1)
        {
            for(let i = 1; i < subCategoryElements.length - 1; i++)
            {
                if(subCategoryElements[i].children[0].selectedOptions)
                    subcategories.add(subCategoryElements[i].children[0].selectedOptions[0].id);
            }
        }
        try
        {
            await editCategory({ variables: { editCategoryId: id, editCategoryName: value, editCategorySubcategories: Array.from(subcategories) } });
            window.location.reload();
        }
        catch (e)   
        {
            console.log(e);
        }
    };
    
    const handleDeleteCategory = async (event) =>
    {
        const { id } = event.target.parentNode.children[0].children[1];
        await removeCategory({ variables: { removeCategoryId: id } });
        window.location.reload();
    };

    const handleAddSubcategory = (event) =>
    {
        const parentNode = event.target.parentNode;
        const container = document.createElement("div");
        container.id = parentNode.id;
        parentNode.insertBefore(container, event.target);
        let subcategories = [];
        props.categoryData.categories.forEach(category =>
        {
            if(category._id === parentNode.id)
            {
                subcategories = category.subcategories;
            }
        });
        ReactDOM.render(<SubcategoryFormSelect category={parentNode.id} categories={props.categoryData.categories} subCategories={subcategories}/>, container);
    };    

    return (
        <ListGroup>
            {props.categoryData.categories.map((category) => (
                <ListGroup.Item key={category._id}>
                    <InputGroup>
                        <InputGroup.Text>Name:</InputGroup.Text>
                        <FormControl type="text" placeholder="Name" name="name" id={category._id} defaultValue={category.name}></FormControl>
                    </InputGroup>
                    <InputGroup id={category._id}>
                        <InputGroup.Text>Subcategories:</InputGroup.Text>
                        {(category.subcategories.length > 0) ?
                            category.subcategories.map((subcategory) => (
                                <div key={subcategory._id} >
                                    <SubcategoryFormSelect subcategory={subcategory} category={category._id} categories={props.categoryData.categories} subCategories={category.subcategories} />
                                </div>
                            ))
                            : null}
                        <Button type="submit" onClick={handleAddSubcategory}>Add Subcategory</Button>
                    </InputGroup>
                    <Button type="submit" onClick={handleSaveCategory}>Save Category</Button>
                    <Button type="submit" variant="danger" onClick={handleDeleteCategory}>Delete Category</Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default AdminCategory;