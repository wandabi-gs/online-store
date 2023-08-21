export const BACKEND_URL = 'http://localhost:8000'
export const API_ENDPOINT = BACKEND_URL + "/api"
export const MEDIA_URL = BACKEND_URL + "/media"

import { GraphQLClient, gql } from 'graphql-request';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndhbmRhYmlAZWNvbS5jb20iLCJleHAiOjE2OTIzMzg2NjksIm9yaWdJYXQiOjE2OTIzMzgzNjl9.Tn2kCgNgMvTReq0GQ7ythMQ0mRWxXlIuKOfqnEx7thg"

export const graphQLClient = new GraphQLClient(API_ENDPOINT, {
  headers: {
    Authorization: `JWT ${token} `
  }
});

export const showMedia = (url) =>{
  return MEDIA_URL+"/"+url
}
