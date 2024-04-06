// import { Outlet } from 'react-router';
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';

// export const ProtectedRoute = () => {
//   const daDangNhap = useSelector((state) => state.auth.daDangNhap);
//   console.log('daDangNhap=', daDangNhap);
//   if (!daDangNhap) return <Navigate to="/login" />;
//   else return <Outlet />;
// };
import { Outlet } from 'react-router';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = () => {
  const result = localStorage.getItem('result');
  const daDangNhap = result ? true : false;
  console.log('daDangNhap=', daDangNhap);
  if (!daDangNhap) return <Navigate to="/login" />;
  else return <Outlet />;
};
