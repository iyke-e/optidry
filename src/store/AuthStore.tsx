import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  id: string;
  fullName: string;
  email: string;
  name: string;
}

type AuthStore = {
  user: User | null;
  isLoggedin: boolean;
  signup: (fullName: string, email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set, get) => ({
      // initial state there is currently no user
      user: null,
      // initial authetication state is false since there is no user
      isLoggedin: false,

      signup: (fullName, email, password) => {
        // check for existing user from local storage
        const existingUsers = localStorage.getItem("users");
        // convert the string from localstorage to a json object is there are existing users else return an empty user list
        const users = existingUsers ? JSON.parse(existingUsers) : [];
        // from the user list find a user that matches the email provided
        const userExist = users.find((u: any) => u.email === email);
        // if the user already exist return false meaning user can't signup again
        if (userExist) return false;

        // if user doesnt exist go ahead and add the user to the users list
        users.push({ fullName, email, password });
        // proceed to store the updated users file to local storage
        localStorage.setItem("users", JSON.stringify(users));
        // return true to signal successful signup
        return true;
      },

      login: (email, password) => {
        // get existing users
        const existingUsers = localStorage.getItem("users");
        // if there are non return false
        if (!existingUsers) return false;
        // convert existing users to json
        const users = JSON.parse(existingUsers);
        // validate user password and email
        const matchUser = users.find(
          (u: any) => u.email === email && u.password === password
        );
        // if password and email dont match return false
        if (!matchUser) return false;
        // if password actually matches a user set user to the matched user and log user in
        set({ user: matchUser, isLoggedin: true });
      },

      logout: () => {
        set({ user: null, isLoggedin: false });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
