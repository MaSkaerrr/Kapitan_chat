import { createContext, useState, useEffect,useContext } from "react";

const context = createContext({});

export default function AuthContext({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

   const [chatList, setChatList] = useState([
              {img:"https://randomuser.me/api/portraits/men/41.jpg",
              lastMessage:"Hello",
              name:"John",
              userId:1},
              {img:"https://randomuser.me/api/portraits/men/6.jpg",
              lastMessage:"Hello",
              name:"Jecky",
              userId:2},
              {img:"https://randomuser.me/api/portraits/men/58.jpg",
              lastMessage:"Hello",
              name:"Doe",
              userId:3},
      ]);


    

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

  const value = {
    isAuthenticated,
    setIsAuthenticated, 
    login,
    logout,
    chatList,
    setChatList
  }
  return (
    <context.Provider value={value}>
      {children}
    </context.Provider>
  );
}


export const useAuth = () => useContext(context);