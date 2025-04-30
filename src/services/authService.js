import { api, endpoints } from "./api";

const authService = {
  login: async (username, password) => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const response = await api.post(endpoints.login, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response;
    } catch (error) {
      throw new Error(`Failed to login: ${error.message || error}`);
    }
  },

  getVehicles: async () => {
    try {
      const response = await api.get(endpoints.vehicles);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
