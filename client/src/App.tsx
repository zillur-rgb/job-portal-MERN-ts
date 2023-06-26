import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import { Box } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PublicRoute from './components/routes/PublicRoute';
import PrivateRoute from './components/routes/PrivateRoute';
import JobPosted from './pages/JobPosted';
import AddAJob from './pages/AddAJob';
import ProfileInformation from './pages/ProfileInformation';
import CheckCandidates from './pages/CheckCandidates';

function App() {
  return (
    <Box h={'auto'} bg="brand.600">
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        {/* <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <JobPosted />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/dashboard/job-posted"
          element={
            <PrivateRoute>
              <JobPosted />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/add-new-job"
          element={
            <PrivateRoute>
              <AddAJob />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <PrivateRoute>
              <ProfileInformation />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/check-candidates"
          element={
            <PrivateRoute>
              <CheckCandidates />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}

export default App;
