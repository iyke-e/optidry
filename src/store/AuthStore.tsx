import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
}

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  signup: (fullName: string, email: string, password: string) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      signup: (fullName, email, password) => {
        const existingUsersJSON = localStorage.getItem("users");
        const users: User[] = existingUsersJSON
          ? JSON.parse(existingUsersJSON)
          : [];

        const userExists = users.some((u) => u.email === email);
        if (userExists) return false;

        const newUser: User = {
          id: crypto.randomUUID(),
          fullName,
          email,
          password,
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        return true;
      },

      login: (email, password) => {
        const existingUsersJSON = localStorage.getItem("users");
        if (!existingUsersJSON) return false;

        const users: User[] = JSON.parse(existingUsersJSON);
        const matchedUser = users.find(
          (u) => u.email === email && u.password === password
        );

        if (!matchedUser) return false;

        set({ user: matchedUser, isLoggedIn: true });
        return true;
      },

      logout: () => {
        set({ user: null, isLoggedIn: false });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
