import { gql } from "@apollo/client";


export const GET_ONE_AUTHOR = gql`
query getOneAuthor ($username: String!, $password: String!) {
  authors(where: {username: {_eq: $username}, password: {_eq: $password}}) {
    id
    nama
    author_pic
    username
    password
    posts {
      id_penulis
      judul
      isi
      kategori
      post_banner
      tgl_upload
    }
  }
}  
`;

export const ADD_AUTHOR = gql`
mutation AddNewAuthor($nama: String!, $author_pic: String!) {
    insert_authors_one(object: {nama: $nama, author_pic: $author_pic}) {
      id
      nama
    }
  }
`;

export const DELETE_AUTHOR = gql`
mutation deleteAuthor($id: Int!) {
  delete_authors_by_pk(id: $id){
    id
    nama
  }
}
`;

export const UPDATE_AUTHOR = gql`
mutation updateAuthor($id: Int!, $nama: String!, $author_pic: String!) {
  update_authors_by_pk(
    pk_columns: {id: $id},
    _set: {nama: $nama, author_pic: $author_pic}
  ) {
    id
    nama
    author_pic
  }
}
`;