export const GRAPHQL_API_URL = "https://api-dev.lelivrescolaire.fr/graphql";

export const GET_BOOKS_QUERY = `
query books {
    viewer {
      books {
        total
        hits {
          id
          title
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
        }
      }
    }
  }
  `;
