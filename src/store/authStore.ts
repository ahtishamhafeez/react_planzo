import { create } from "zustand";
import axios from "axios";
import {ApiRoutes} from "../components/apiRoutes";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  redirect_to: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

type LoginResponse = {
  token: string;
  redirect_to: string;
};

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem("token"),
  redirect_to: null,
  token: localStorage.getItem("token"),

  login: async (email, password) => {
    try {
      const response = await axios.post(ApiRoutes.login, { email, password });
      const apiResponse = response.data as LoginResponse;
      const { token, redirect_to } = apiResponse

      localStorage.setItem("token", token);
      set({ isAuthenticated: true, token, redirect_to });

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ isAuthenticated: false, token: null });
  },
}));

export default useAuthStore;
