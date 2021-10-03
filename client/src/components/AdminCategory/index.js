import React from "react";
import ReactDOM from 'react-dom'
import { useMutation } from '@apollo/client';
import { ListGroup, InputGroup, FormControl, Form, Button} from 'react-bootstrap';
import { EDIT_CATEGORY } from '../../utils/mutations';

const SubcategoryFormSelect = (props) =>
{
    const subCategoryId = props.subcategory ? props.subcategory._id : props.categories[0]._id;

    const handleDeleteSubcategory = (event) =>
    {
        event.target.parentNode.remove();
    }

    return (
        <React.Fragment>
            <Form.Select name="subcategories" key={subCategoryId} id={props.category}>
            {props.categories.map(listCategory => (
                listCategory._id === subCategoryId) ?
                <option key={listCategory._id} id={listCategory._id} selected>{listCategory.name}</option> :
                <option key={listCategory._id} id={listCategory._id}>{listCategory.name}</option>
            )}
            </Form.Select>
            <Button variant="danger" onClick={handleDeleteSubcategory}>Remove</Button>
        </React.Fragment>
    )
};

const AdminCategory = (props) =>
{
    const [editCategory, { error }] = useMutation(EDIT_CATEGORY);

    const handleSaveCategory = async (event) =>
    {
        const { value, id } = event.target.parentNode.children[0].children[1];
        const subCategoryElements = event.target.parentNode.children[1].children;
        let subcategories = [];
        if(subCategoryElements.length > 1)
        {
            for(let i = 1; i < subCategoryElements.length - 1; i++)
            {
                if(subCategoryElements[i].children[0].selectedOptions)
                    subcategories.push(subCategoryElements[i].children[0].selectedOptions[0].id);
            }
        }
        console.log(value + " " + id + " " + subcategories)
        try
        {
            await editCategory({ variables: { editCategoryId: id, editCategoryName: value, editCategorySubcategories: subcategories } });
        }
        catch (e)   
        {
            console.log(e);
        }
    };

    const handleAddSubcategory = (event) =>
    {
        const parentNode = event.target.parentNode;
        const container = document.createElement("div");
        parentNode.insertBefore(container, event.target);
        ReactDOM.render(<SubcategoryFormSelect category={parentNode.id} categories={props.categoryData.categories}/>, container);
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
                                <div>
                                    <SubcategoryFormSelect subcategory={subcategory} category={category._id} categories={props.categoryData.categories} />
                                </div>
                            ))
                            : null}
                        <Button type="submit" onClick={handleAddSubcategory}>Add Subcategory</Button>
                    </InputGroup>
                    <Button type="submit" onClick={handleSaveCategory}>Save Category</Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default AdminCategory;