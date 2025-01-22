import { GraphQLClient } from "graphql-request";

const hygraphClient = new GraphQLClient(process.env.HYGRAPH_API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.HYGRAPH_AUTH_TOKEN}`,
  },
});

export const fetchData = async (query, variables = {}) => {
  try {
    return await hygraphClient.request(query, variables);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
