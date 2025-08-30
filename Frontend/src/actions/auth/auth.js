import { apiUrls } from "../../services/api/urls";

export const handleCreateUser = async (data) => {
  console.log("url: ", apiUrls.auth.create)
  const result = await fetch(apiUrls.auth.create, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await result.json();

  console.log("respuestaaaa: ", response)
  return response
};

export const handleLogin = async (data) => {
  const result = await fetch(apiUrls.auth.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await result.json();
  return response
};