import apiInstance from ".";

export const register = async (payload) => {
  try {
    const response = await apiInstance.post("/users/register", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const login = async (payload) => {
  try {
    const response = await apiInstance.post("/users/login", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await apiInstance.get("/users/get-user-info");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
