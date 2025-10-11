import { Outlet, Route, Routes } from "react-router-dom";
import Main from "./Main/Main";
import Faq from "./ComponentPage/Faq";
import OneTask from "./ComponentPage/OneTask";
import NotFound from "./ComponentPage/NotFound";
import Breadcrumbs from "./ComponentPage/Breadcrumbs/Breadcrumbs";
import Start from "./ComponentPage/Start/Start";
import ToDoListLayout from "./ComponentPage/ToDoListLayout/ToDoListLayout";
function App() {
  return (
    <> 
       <ToDoListLayout></ToDoListLayout>
      <Routes>
   
        <Route index element={<Start></Start>}></Route>
        <Route path="main" element={<><Breadcrumbs/><Main /></>}></Route>
        <Route path="faq" element={<><Breadcrumbs/><Faq/></>} />
        <Route path="onetask" element={<><Breadcrumbs/><OneTask/></>} />
        <Route path="*" element={<><Breadcrumbs/><NotFound/></>} />
      
      </Routes>
   
      <Outlet />
    </>
  );
}

export default App;