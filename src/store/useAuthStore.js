import { authService } from "@/services/auth-service.js";

import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (payload) => {
    set({ loading: true, error: null });
    try {
      const response = await authService.login(payload);
      const { access_token, refresh_token } = response.data;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      console.log("login response:", response);

      const user = await authService.get();
      set({
        user: user,
        isAuthenticated: true,
        loading: false,
      });
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        loading: false,
      });
      return false;
    }
  },

  logout: async (params) => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    set({ user: null, isAuthenticated: false });
  },
  register: async (formData) => {
    set({ loading: true, error: null });
    try {
      const payload = {
        ...formData,
        avatar:
          "https://sm.ign.com/t/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.600.jpg",
      };
      await authService.register(payload);
      set({ loading: false });
      return true;
    } catch (error) {
      console.log("Register error:", error);
      set({
        loading: false,
        error:
          error.response?.data?.message || error.message || "Register error",
      });
      return false;
    }
  },
  checkAuth: async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      set({ user: null, isAuthenticated: false });
      return;
    }

    try {
      const user = await authService.get();
      set({ user: user, isAuthenticated: true });
    } catch (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      set({ user: null, isAuthenticated: false });
    }
  },
}));
