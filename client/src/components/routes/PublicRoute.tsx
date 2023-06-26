import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }: any) => {
  if (localStorage.getItem('token')) {
    return <Navigate to="/dashboard/job-posted" />;
  } else {
    return children;
  }
};
export default PublicRoute;
