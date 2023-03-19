import { GET_USERS } from "./API";

async function updateUser(id, token, body) {
  let a = `${GET_USERS}${id}/update`;
  console.log(JSON.stringify(body))
  return fetch(`${GET_USERS}${id}/update`, {
    method: "PUT",
    headers: { 'token': `Bearer ${token}`, 'Content-type': 'application/json'},
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(data => {
      console.log(a);
      return data;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export default updateUser;