import { graphQLClient } from '../backend';

export const fetchCheckout = async () => {
  const query = `
    query {
      cart {
        grantTotal
        qproducts{
            product{
                uid
                name
                price
                discount
                image
            }
            quantity
        }
      }
    }
  `;

  try {
    const data = await graphQLClient.request(query);
    return data.cart;
  } catch (error) {
    console.error('Error fetching allProducts:', error);
    throw error;
  }
};
