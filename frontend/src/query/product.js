import { graphQLClient } from '../backend';

export const fetchAllProducts = async () => {
  const query = `
    query {
      allProducts {
        uid
        name
        price
        discount
        userLiked
        image
        vendor {
          name
        }
        productimageSet {
          image
        }
        category {
          name
        }
        rating
      }
    }
  `;

  try {
    const data = await graphQLClient.request(query);
    return data.allProducts;
  } catch (error) {
    console.error('Error fetching allProducts:', error);
    throw error;
  }
};


export const fetchLatestProducts = async () => {
    const query = `
      query {
        latestProducts {
          uid
          name
          price
          discount
          productSold
          vendor {
            name
          }
          image
          rating
        }
      }
    `;

    try {
        const data =  await graphQLClient.request(query);
        return data.latestProducts;
    } catch (error) {
        console.error('Error fetching top Products:', error);
        throw error;
    }
}

export const fetchProductById = async (productid) => {
  const query = `
    query {
      productById(productUid : "${productid}") {
        uid
        name
        price
        discount
        productSold
        vendor {
          name
        }
        image
        rating
        productimageSet{
          image
        }
        reviews{
          email
          review
          createdAt
        }
      }
    }
  `;

  try {
      const data =  await graphQLClient.request(query);
      return data.productById;
  } catch (error) {
      console.error('Error fetching top Products:', error);
      throw error;
  }
}