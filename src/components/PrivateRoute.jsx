import { Navigate } from "react-router-dom"
import useStore from "../pages/login/store";
import PropTypes from 'prop-types'; // Import PropTypes

const PrivateRoute = ({Component}) => {
  const {isLoggedIn } = useStore();
  return (
    !isLoggedIn ? <Navigate to="/" replace /> : <Component />
  )
}

PrivateRoute.propTypes = {
  Component: PropTypes.elementType.isRequired, // Validate that Component is a valid React element
};

export default PrivateRoute