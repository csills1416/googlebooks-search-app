import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;
export const SEARCH_BOOKS = gql`
  query SearchBooks($searchTerm: String!) {
    searchBooks(searchTerm: $searchTerm) {
      bookId
      title
      authors
      description
      image
      link
    }
  }
`;

