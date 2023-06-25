import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }: any) => {
  if (localStorage.getItem('token')) {
    return <Navigate to="/dashboard" />;
  } else {
    return children;
  }
};
export default PublicRoute;
