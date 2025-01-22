import { fetchData } from "@/graphqlClient";

const GET_GALLERIES_QUERY = `
  query GetGalleries {
    galleries {
      id
      title
      description
    }
  }
`;

export default async function Home() {
  const data = await fetchData(GET_GALLERIES_QUERY);

  return (
    <main>
      <h1>PŁOMIEŃ CAMP</h1>
      <h2>{process.env.HYGRAPH_API_URL}</h2>
      <div>
        <h1>Blog Posts</h1>
        <ul>
          {data.galleries.map((gallery) => (
            <li key={gallery.id}>
              <h2>{gallery.title}</h2>
              <p>{gallery.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
