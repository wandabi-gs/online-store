import { graphQLClient } from '../backend';

export const addCart = async (productUid) => {
  const mutation = `
    mutation{
      addCart(productUid: "${productUid}") {
        cart{
          id
        }
      }
    }
  `;

  try {
    const variables = { productUid };
    const data = await graphQLClient.request(mutation);
    return data.addCart.cart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const reduceCart = async (productUid) => {
  const mutation = `
      mutation{
        reduceCart(productUid: "${productUid}") {
          cart{
            id
          }
        }
      }
    `;

  try {
    const variables = { productUid };
    const data = await graphQLClient.request(mutation);
    return data.reduceCart.cart;
  } catch (error) {
    console.error('Error reducing cart quantity:', error);
    throw error;
  }
};

export const removeCart = async (productUid) => {
  const mutation = `
      mutation{
        removeCart(productUid: "${productUid}") {
          cart{
            id
          }
        }
      }
    `;

  try {
    const variables = { productUid };
    const data = await graphQLClient.request(mutation);
    return data.removeCart.cart;
  } catch (error) {
    console.error('Error reducing cart quantity:', error);
    throw error;
  }
};
