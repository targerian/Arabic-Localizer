import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://mawared.pro/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiYWEyZWYwYjVhODgzNzIyYWFjNzU2MTMyMjUzYzc0YTMzNmMzNTA3MGI0MGIxNzgwOTY2MzViY2NkNDlhYmJlMWRiN2I4MzNmYzU1MDk1NTgiLCJpYXQiOjE2NDAzNTQ1NjIsIm5iZiI6MTY0MDM1NDU2MiwiZXhwIjoxNjcxODkwNTYxLCJzdWIiOiI5NSIsInNjb3BlcyI6W119.G55nuKqz35LzaQvisH7Xh9coKm_5FTEQXVoAFLTMPVX90wX5GDITF3ctXINltFo6VVFY9YoQdEA9kvfhvrJ5RDo4uKbuV7Neet4Qii7iT-sUIr3mhJn9QFEPqY1wnUOjCFYBHNOOvLA4Y0AJ0a4C_qx7TCSdDUqoaBpbiiMflXFkupIAND3BAo-XgFPXf7XCIjQMKy1tQxmr3kw950Dh-a7SUSaHohapfOFWfF_DJuEiYfchOxRRyg8fTgBIxhzqK0lDP8DPGiSPe7KcF8YtewNm2IUtgYVxodr7NjUdkXucun6gE7sPgu_12n8YUrXyG8e57NbWaNMnkkYkWhjLgnkY_OcpZZoXyYNBT6FzL5BLn1_We2k5AVb3ucG296gdyA4cPFa9BZ5uHbc1ASSjYlqmDFA-oT0FNqUE10y5mCdO-AJIh_rVnS37hnouw1dFvLtpaEg0r5g37zBAsljrgmas7IoBnK-AombOf0IRCq3Nw2trnIxVT-UgOJFTcffKGPYlUaEuni5qVXITwrchRdknhVvQcp01wOlQ_SDnAZzby2r86Vml8zzJ7AHWKZ6TlcoM90fQIPCE9j9gXWL4Dgeq9WVtybYt-ZHE8S14BDHbVnMY0MtP3SfhbcZEZfY8e5j7QOi3YMa2799_B6PKnofH2seIeAzmnVZ731TdgMA";
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
