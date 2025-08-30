import { apiUrls } from "../../services/api/urls";

export const handleGetSolicitude = async () => {
  console.log("INGRESANDO A SOLICITUDE")
  const result = await fetch(apiUrls.solicitude.get, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await result.json();
  return response
};

export const handleCreateSolicitude = async (data) => {
  const result = await fetch(apiUrls.solicitude.create, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await result.json();
  return response
};

export const handleDeleteSolicitude = async (id) => {
  const result = await fetch(apiUrls.solicitude.delete(id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await result.json();
  return response
};