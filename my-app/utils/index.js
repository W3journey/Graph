import axios from "axios";

export async function subgraphQuery(query) {
  try {
    const SUBGRAPH_URL =
      "https://api.studio.thegraph.com/query/44136/learnweb3/v0.0.2";
    const response = await axios.post(SUBGRAPH_URL, {
      query,
    });
    if (response.data.errors) {
      console.error(response.data.errors);
      throw new Error(`Error making subgraph query ${response.data.errors}`);
    }
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw new Error(`Could not query the subgraph ${err.message}`);
  }
}
