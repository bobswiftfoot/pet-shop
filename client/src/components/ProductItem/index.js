import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import dogfood from '../../assets/images/dogfood.jpg';

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
//     <div className="card px-1 py-1">
//       <Link to={`/products/${_id}`}>
//         <img
//           alt={name}
//           src={`/images/${image}`}
//         />
//         <p>{name}</p>
//       </Link>
//       <div>
//         <div>{quantity} {pluralize("item", quantity)} in stock</div>
//         <span>${price}</span>
//       </div>
//       <button onClick={addToCart}>Add to cart</button>
// </div>

 <Row xs={1} md={1} className="prod-g-4">
  {Array.from({ length: 1 }).map((_, idx) => (
    <Col className='product-page-col'>
      <Card className='product-page-cards'>

        <Card.Img className='product-page-img'variant="top" src={dogfood} />
        <Card.Body>
        <Link to={`/products/${_id}`}>
          <Card.Title className='product-card-h2'>{name}</Card.Title>
          <Card.Text>
            ${price}
          </Card.Text>
          </Link >
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row> 
  );
}

export default ProductItem;
