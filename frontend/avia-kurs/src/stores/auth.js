import { create } from "zustand";


const useAuthStore = create((set) => ({
  isAuth: false,
  error: "",
  user: {email: "Arthur1203@yandex.ru", password: "" },

  setAuth: (flag) => set(() => ({ isAuth: flag })),

  login: async (email, password) => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        set({ error: errorData.error });
        return;
      } 

      const user = await response.json();
      set({ user: user, isAuth: true}); 
      localStorage.setItem("user", JSON.stringify({id: user.id, email: email, password: password}));
    } catch (err) {
      set({ error: err.message });
    }  
  },
  logout: () => {
      set((state) => ({ user: { ...state.user, email: "", password: ""}, isAuth: false})); 
  },
}));

export default useAuthStore;