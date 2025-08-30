import { apiUrls } from "../../services/api/urls";

export const handleGetProducts = async (data) => {
  const result = await fetch(apiUrls.products.products, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await result.json();
  return response
};

export const handleCreateProduct = async (data) => {
  const result = await fetch(apiUrls.products.products, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await result.json();
  return response
};

export const handleUpdateProduct = async (data) => {
  const result = await fetch(apiUrls.products.products, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await result.json();
  return response
};

export const handleDeleteProduct = async (id) => {
  const result = await fetch(apiUrls.products.products, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({_id: id}),
  });
  const response = await result.json();
  return response
};