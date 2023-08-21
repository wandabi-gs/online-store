import { request } from 'graphql-request';
import { API_ENDPOINT } from '../backend';

export const UserLogin = async (data) => {
    var email = data["email"];
    var password = data["password"];

    const mutation = `
      mutation{
        tokenAuth(email: "${email}", password: "${password}") {
            token
        }
      }
    `;
  
    try {
      const data = await request(API_ENDPOINT, mutation);
      return data.tokenAuth.token;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };
  