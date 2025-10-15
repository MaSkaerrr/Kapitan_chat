import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";

export default function Logout() {
  const navigate = useNavigate();
  const {logout} = useAuth();
  useEffect(() => {
    
    logout();
    navigate("/");

   
   // window.location.reload();
  }, [navigate]);

  return null;
}
