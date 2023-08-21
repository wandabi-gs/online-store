import { graphQLClient } from '../backend';

export const fetchUserCart = async () => {
  const query = `
    query {
      cart {
        grantTotal
        qproducts{
            product{
                uid
                name
                price
                vendor{
                    name
                }
                discount
                image
            }
            quantity
            productTotal
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
