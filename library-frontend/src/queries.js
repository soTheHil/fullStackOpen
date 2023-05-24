import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
  query {
  allAuthors {
    born
    name
    bookCount
  }
}
`
export const BOOK_ADDED = gql`
  subscription Subscription {
  bookAdded {
    author
    genres
    published
    title
  }
}
`
export const ALL_BOOKS = gql`
    query {
    allBooks {
        author
        title
        published
        genres
    }
    }
`

export const BOOK_BY_GENRE = gql`
  query Query($genre: String) {
  allBooks(genre: $genre) {
    author
    published
    title
    genres
  }
}
`

export const CREATE_BOOK = gql`
mutation Mutation(
     $title: String!,
     $author: String!,
     $published: Int!,
      $genres: [String]!
      )
 {
    addBook(
            title: $title, 
            author: $author,
            published: $published,
            genres: $genres
        )
    {
        author
        title
        published
    }
}
`

export const EDIT_BOOK = gql`
    mutation Mutation($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
        name
        born
    }
    }
`

export const LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`