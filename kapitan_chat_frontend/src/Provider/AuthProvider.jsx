
import { createContext, useState, useEffect,useContext,useRef } from "react";
import axios from "axios";
const context = createContext({});

export default function AuthContext({ children }) {

  const [{JWTaccessToken,JWTrefreshToken}, setToken] = useState(
    {JWTaccessToken:localStorage.getItem('access'),JWTrefreshToken:localStorage.getItem('refresh')});

  const [userid, setUserid] = useState(1);
  const [me, setMe] = useState(null);

  const [langChoiceList, setLangChoiceList] = useState([]);
  const [local, setLocal] = useState({});
  //theme true is dark false is light
  const [settingparams, setSettingparams] = useState({user:1,language:"en",theme:false});

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
  const BASEAPI ="http://127.0.0.1:8000/api/"
  async function getSettings (url = SETTINGSURL) {
    const res = await axios.get(url);
    return res.data;
  }

  async function putSettings (url = SETTINGSURL) {
    const res = await axios.put(url, settingparams);
    console.log(res.data);
    return res.data;
  }

  

  function UserApi(URL =`${BASEAPI}users/`){
    const api = axios.create({
      baseURL: URL,
      headers: {
        Authorization: `Bearer ${JWTaccessToken}`,
      }
    })

    return{
      getList: async () => api.get('').then((res) => res.data),
      get: async (id) => api.get(`${id}`).then((res) => res.data),
      getMe: async () => api.get('me/').then((res) => res.data),
      register: async (data) => api.post('register/', data).then((res) => res.data),
      token: async ({username, password}) => (await api.post('token/', {username, password})).data,
      tokenRefresh: async () => api.post('token/refresh/', JWTrefreshToken).then((res) => res.data),
      tokenVerify: async () => api.post('token/verify/', JWTaccessToken).then((res) => res.data),

    }
  }

  function ChatApi(URL =`${BASEAPI}chat/`){
    const api = axios.create({
      baseURL: URL,
      headers: {
        Authorization: `Bearer ${JWTaccessToken}`,
      }

    })

    return{
      getList: async () => api.get('').then((res) => res.data),
      get: async (id) => api.get(`${id}/`).then((res) => res.data),
      post: async (data) => api.post('', data).then((res) => res.data),

      //сейчас пута нету, так как другая система создания
      // put: async (id, data) => api.put(`${id}/`, data).then((res) => res.data),
      delete: async (id) => api.delete(`${id}/`).then((res) => res.data),
    }
  }

  function MessageApi(URL =`${BASEAPI}message/`){
    const api = axios.create({
      baseURL: URL,
      headers: {
        Authorization: `Bearer ${JWTaccessToken}`,
      }

    })

    return{
      getList: async () => api.get('').then((res) => res.data),
      get: async (id) => api.get(`${id}/`).then((res) => res.data),
      post: async(data) => api.post('', data).then((res) => res.data),
      put: async (id, data) => api.put(`${id}/`, data).then((res) => res.data),
      delete: async (id) => api.delete(`${id}/`).then((res) => res.data),
    }
  }


  //первоначальная загрузка
  useEffect(() => {
    try {
      getSettings().then((res) => {
        setLangChoiceList(res.language_choices);
        setLocal(res.locale);
        setSettingparams({user:res.user,language:res.language,theme:res.theme});
      });
      (async()=>
      {
        let access  = localStorage.getItem('access');
        let refresh = localStorage.getItem('refresh');
        if(!access || !refresh){
          // временно 
          const t = await UserApi().token({ username: "maskerrr", password: "Admin_123" });
          access = t.access; refresh = t.refresh;
          localStorage.setItem("access", access);
          localStorage.setItem("refresh", refresh);
        }

        console.log('token',access);
      
        const me = await UserApi().getMe();
        console.log('me',me);
        
        const chat = await ChatApi().getList();

        const finalchat = await Promise.all(
          chat.map(async (item) =>
          {
            const users = item.users;
            const anotherUserid = users.find((u) => u != me.id)
            const anotherUser = await UserApi().get(anotherUserid)
            console.log('anotherUser',anotherUser)
            return {...item, active:false,name: anotherUser.username}
          })
        );
        setChatList(finalchat)
      })();
      
    }
    catch (error) {
      console.warn("возможно не активен сервер", error);
    }
  
  }, []);

  // useEffect(() => {
  //   console.log('token',JWTaccessToken);
  // }, [JWTaccessToken]);
useEffect(()=>
{
  console.log(chatList)
},[chatList])
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
    setSettingparams,

    UserApi,
    ChatApi,
    MessageApi,
  }
  return (
    <context.Provider value={value}>
      {children}
    </context.Provider>
  );
}


export const useAuth = () => useContext(context);