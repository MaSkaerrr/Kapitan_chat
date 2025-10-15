import { createContext, useState, useEffect,useContext } from "react";

const context = createContext({});

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(auth);
  }, []);


  const login = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
   
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  return (
    <context.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </context.Provider>
  );
}


export const useAuth = () => useContext(context);