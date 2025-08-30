import { apiUrls } from "../../services/api/urls";

export const handleGetEmployees = async (data) => {
  const result = await fetch(apiUrls.employees.get, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await result.json();
  return response
};

export const handleCreateEmployee = async (data) => {
  const result = await fetch(apiUrls.employees.create, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await result.json();
  return response
};

export const handleDeleteEmployee = async (id) => {
  const result = await fetch(apiUrls.employees.delete(id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await result.json();
  return response
};