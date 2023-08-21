import { graphQLClient } from '../backend';

export const toggleLike = async (productUid) => {
  const mutation = `
    mutation($productUid: UUID!) {
      toggleLike(productUid: $productUid) {
        success
      }
    }
  `;

  try {
    const variables = { productUid };
    const data = await graphQLClient.request(mutation, variables);
    return data.toggleLike;
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error;
  }
};

export const ChangeRatingg = (productUid) => async (rating) => {
  const mutation = `
    mutation{
      changeRating(productUid: "${productUid}", rating : ${rating}) {
        success
      }
    }
  `;

  try {
    const data = await graphQLClient.request(mutation);
    return data.success;
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error;
  }
};

export const ChangeRating = async (rdata) => {
  const mutation = `
    mutation($productUid: UUID!, $rating: Int!) {
      changeRating(productUid: $productUid, rating : $rating) {
        success
      }
    }
  `;

  try {
    const productUid = rdata.uid;
    const rating = rdata.rating;
    const variables = { productUid, rating };
    const data = await graphQLClient.request(mutation, variables);
    return data.success;
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error;
  }
};