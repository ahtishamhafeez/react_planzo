import axios from "axios";
import {ApiRoutes} from "../../components/apiRoutes";

const API_BASE_URL = ApiRoutes.projects;

export const getActiveProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}?include_users=true`);
    return response.data;
  } catch (error) {
    console.error("Error fetching active projects:", error);
    return [];
  }
};

export const assignUserToProject = async (projectId, userId) => {
  try {
    await axios.post(`${API_BASE_URL}/${projectId}/users/${userId}`);
  } catch (error) {
    console.error("Error assigning user:", error);
  }
};

export const removeUserFromProject = async (projectId, userId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${projectId}/users/${userId}`);
  } catch (error) {
    console.error("Error removing user:", error);
  }
};
