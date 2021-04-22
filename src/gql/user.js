import { gql } from "@apollo/client";

// Querys


export const GET_USER = gql`
 query getUser($id: ID, $username: String){
    getUser(id: $id, username: $username){
      id
      name
      username
      email
      siteWeb 
      description
      avatar
      avatar_id
    }
  }
`;


export const SEARCH = gql`
query search($search: String){
  search(search: $search){
    username
    name
    avatar
  }
}
`;






// Mutations


export const REGISTER = gql`
mutation register($input: UserInput ){
    register(input: $input){
        id
        name
        username
        email
        createAt
    }
}`;


export const LOGIN = gql`
mutation login($input: LoginInput){
    login(input: $input){
        token
    }
}`;




export const UPDATE_AVATAR = gql`
mutation updateAvatar($file:Upload){
  updateAvatar(file:$file){
    status,
    urlAvatar
  }
}
`;
export const UPDATE_IMAGE = gql`
mutation updateImage($input: ImageInput){
  updateImage(input: $input){
    secure_url
  }
}`;

export const DELETE_AVATAR = gql`
mutation deleteAvatar{
  deleteAvatar
}
`;

export const UPDATE_USER = gql`
mutation updateUser($input: UserUpdateInput){
  updateUser(input: $input)
}
`;

