import { Outlet, Route, Routes } from "react-router-dom";
import Main from "./Main/Main";
import NotFound from "./ComponentPage/NotFound";

import "./mainstyle.css";
import SignIn from "./ComponentPage/Sign In";
import SignUp from "./ComponentPage/Sign Up";
import Logout from "./ComponentPage/LogOut";
import AuthProvider from "./Provider/AuthProvider";
import AvatarUpload from "./ComponentPage/AvatarUpload";
import Authentication from "./login-register/authentication"

function App() {
  
  return (
    <AuthProvider> 
      <Routes>
   
        <Route index element={<Main></Main>}></Route>
        <Route path="main" element={<><Main /></>}></Route>
        <Route path="signin" element={<><SignIn /></>}></Route>
        <Route path="signup" element={<><SignUp /></>}></Route>
        <Route path="logout" element={<><Logout /></>}></Route>
        <Route path="avatar" element={<><AvatarUpload /></>}></Route>
        <Route path="*" element={<><NotFound/></>} />
      
      </Routes>
   
      <Outlet />
    </AuthProvider>
  );
}

export default App;