import Header from "./components/elements/Header/Header";
import AppRouter from "./components/elements/AppRouter/AppRouter";
import "./styles/App.scss";
import { useEffect } from "react";
import useAuthStore from "./stores/auth";

function App() {
  const {login } = useAuthStore((state) => ({
    login: state.login,
  }));


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    if (user) {
      login(user.email, user.password)
    }
  }, [])

  return (
    <div className="App">
        <Header/>
        <AppRouter/>
    </div>
  );
}

export default App;
