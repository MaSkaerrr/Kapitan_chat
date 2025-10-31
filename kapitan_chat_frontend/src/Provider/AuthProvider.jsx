
import { createContext, useState, useEffect,useContext,useRef } from "react";
import axios from "axios";
const context = createContext({});

export default function AuthContext({ children }) {

  
  const [userid, setUserid] = useState(2);
  const [langChoiceList, setLangChoiceList] = useState([]);
  const [local, setLocal] = useState({});
  //theme true is dark false is light
  const [settingparams, setSettingparams] = useState({user:2,language:"en",theme:false});

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chatList, setChatList] = useState([
              {img:"https://randomuser.me/api/portraits/men/41.jpg",
              lastMessage:"Hello",
              name:"John",
              userId:1},
              {img:"https://randomuser.me/api/portraits/men/6.jpg",
              lastMessage:"eshkere",
              name:"Jecky",
              userId:2},
              {img:"https://randomuser.me/api/portraits/men/58.jpg",
              lastMessage:"WHats up",
              active : true,
              name:"Doe",
              userId:3},
      ]);
    
  const SETTINGSURL = `http://127.0.0.1:8000/settings_api/UserSettings/${userid}/`;
  
  async function getSettings (url = SETTINGSURL) {
    const res = await axios.get(url);
    console.log(res.data);
    return res.data;
  }

  async function putSettings (url = SETTINGSURL) {
    const res = await axios.put(url, settingparams);
    console.log(res.data);
    return res.data;
  }
  
  useEffect(() => {
    try {
      getSettings().then((res) => {
        setLangChoiceList(res.language_choices);
        setLocal(res.locale);
        setSettingparams({user:res.user,language:res.language,theme:res.theme});
    });
    }
    catch (error) {
      console.log("возможно не активен сервер", error);
    }
    
  }, []);

  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    putSettings();
  }, [settingparams]);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', settingparams.theme ? "dark" : "light");
  }, [settingparams.theme]);

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
    setChatList,
    langChoiceList,
    setLangChoiceList,
    local,
    settingparams,
    setSettingparams
  }
  return (
    <context.Provider value={value}>
      {children}
    </context.Provider>
  );
}


export const useAuth = () => useContext(context);