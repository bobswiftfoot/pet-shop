import React, { useEffect } from 'react';
<<<<<<< HEAD
import { useMutation } from '@apollo/client';
=======
import { useMutation } from '@apollo/react-hooks';
>>>>>>> 6d43a92140da87e06fe716f6d1fa5d5deb4f17a6
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
<<<<<<< HEAD
      const products = cart.map((item) => item._id);

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

=======
      const products = cart.map(item => item._id);
      
      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;
    
>>>>>>> 6d43a92140da87e06fe716f6d1fa5d5deb4f17a6
        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }
<<<<<<< HEAD

=======
        
>>>>>>> 6d43a92140da87e06fe716f6d1fa5d5deb4f17a6
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
<<<<<<< HEAD
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
=======
        <h2>
          Thank you!
        </h2>
        <h2>
          You will now be redirected
        </h2>
      </Jumbotron>
    </div>
  );
};

export default Success;
>>>>>>> 6d43a92140da87e06fe716f6d1fa5d5deb4f17a6
