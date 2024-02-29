import { Navigate } from "react-router-dom"
import useStore from "../pages/login/store";

const PublicOnlyRoute = ({Component}) => {
  const {isLoggedIn } = useStore();
    return (
    isLoggedIn ? <Navigate to="/home" replace /> : <Component />
  )
}

export default PublicOnlyRoute