import { gql } from '@apollo/client';

export const PUBLISH = gql`

mutation publish($input: ImageInput){
    publish(input: $input){
        secure_url 
    }
}

`;

export const GET_PUBLICATION = gql`
query getPublication($username: String!){
  getPublication(username:$username){
    createAt
    idUser
    id
    public_id
    secure_url
  }
}`;


export const GET_PUBLICATION_FOLLOWEDS = gql`
query getPublicationsFolloweds {
  getPublicationsFolloweds {
    id
    idUser {
      name
      username
      avatar
    }
    secure_url
    createAt
  }
}
`;