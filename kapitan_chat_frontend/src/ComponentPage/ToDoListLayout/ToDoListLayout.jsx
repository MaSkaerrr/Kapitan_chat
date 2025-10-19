import { NavLink } from "react-router-dom";
import LanguageSettings from "../../Component/SettingsComp/languageSettings";
export default function ToDoListLayout() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav me-auto">
        
            <NavLink 
            className="nav-link" 
            aria-current="page" 
            to="/" 
          
          >
            Home
          </NavLink>
          <NavLink 
            className="nav-link" 
            to="/main" 
          
          >
            Main
          </NavLink>
          <NavLink 
            className="nav-link" 
            to="/faq" 
            
          >
            FAQ
          </NavLink>
          <NavLink 
            className="nav-link" 
            to="/onetask" 
         
          >
            OneTask
          </NavLink>
          
        </div>

        <div className="navbar-nav ms-auto">
          <button>
            asdasdasd
          </button>

          <LanguageSettings />
        </div>





      </div>
    </nav>
  );
}