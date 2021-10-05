import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      console.log(cart);

      const products = cart.map((item) => item._id);
      console.log(products);

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        console.log(data);

        const productData = data.addOrder.products;
        console.log(productData);

        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }
      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you!</h2>
        <h2>You will now be redirected:</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
