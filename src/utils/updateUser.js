import { GET_USERS } from "./API";

async function updateUser(id, token, body) {
  return fetch(`${GET_USERS}${id}/update`, {
    method: "PUT",
    headers: { 'token': `Bearer ${token}`, },
    body: JSON.stringify(body),
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

export default updateUser;