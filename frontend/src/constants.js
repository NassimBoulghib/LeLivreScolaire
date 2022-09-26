export const GRAPHQL_API_URL = "https://api-dev.lelivrescolaire.fr/graphql";

export const GET_BOOKS_QUERY = `
query books {
    viewer {
      books {
        hits {
          id
          displayTitle
          url
          subjects {
            name
            color
            slug
          }
          levels {
            name
          }
          valid
        }
      }
    }
  }`;

export const GET_CHAPTERS_FROM_BOOK = `
query chapters($bookId: Int) {
  viewer {
    chapters(bookIds: [$bookId]) {
      hits {
        id
        title
        url
        valid
        slug
        number
      }
    }
  }
}
  `;

export const GET_BOOK_QUERY = `
query book($ids: [Int]) {
  viewer {
    books(ids: $ids) {
      hits {
        year
        displayTitle
        url
        subjects {
          name
          color
        }
      }
    }
  }
}
`;
