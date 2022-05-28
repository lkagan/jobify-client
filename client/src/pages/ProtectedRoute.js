import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
   const context = useAppContext()

   if (context.user) {
      return children;
   } else {
      return <Navigate to="/landing" />
   }
}

export default ProtectedRoute;