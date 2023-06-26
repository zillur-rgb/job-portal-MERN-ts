import { Navigate, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../helpers/apiHelpers';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { setUser } from '../../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';

const PrivateRoute = ({ children }: any) => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const getUser = async () => {
    if (localStorage.getItem('token')) {
      try {
        dispatch(showLoading());
        const res = await apiRequest.post(
          '/user/get-user',
          { token: localStorage.getItem('token') },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );

        dispatch(hideLoading());

        if (res.data.success) {
          dispatch(setUser(res.data.data));
        } else {
          // localStorage.clear();
          <Navigate to="/login" />;
        }
      } catch (error) {
        // localStorage.clear();
        dispatch(hideLoading());
        console.log('Error', error);
      }
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  });

  if (localStorage.getItem('token')) {
    return children;
  } else {
    <Navigate to={'/login'} />;
  }
};

export default PrivateRoute;
