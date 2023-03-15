import { LOGIN } from "./API";

async function loginUser(credentials) {
  return fetch(LOGIN, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export default loginUser;