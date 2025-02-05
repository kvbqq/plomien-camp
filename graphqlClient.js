import { GraphQLClient } from "graphql-request";

const hygraphClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_API_URL,
  {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_AUTH_TOKEN}`,
    },
  }
);

export const fetchData = async (query, variables = {}) => {
  try {
    const data = await hygraphClient.request(query, variables);
    return data;
  } catch (error) {
    console.error("Błąd GraphQL:", error?.message || error);

    if (!error.response) {
      console.error(
        "Brak odpowiedzi z serwera – sprawdź URL API lub połączenie!"
      );
      throw new Error(
        "Serwer GraphQL nie odpowiada. Sprawdź `HYGRAPH_API_URL`."
      );
    }

    throw new Error("Błąd pobierania danych z GraphQL");
  }
};
