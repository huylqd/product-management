import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
 
  
  console.log(userInfo);
  

  if (!userInfo) {
    // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
    return <Navigate to="/login" />;
  }

  if (userInfo.isAdmin !== true) {
    // Nếu không phải là admin, chuyển hướng về trang chủ
    return <Navigate to="/" />;
  }

  // Nếu là admin, cho phép truy cập vào component con (trang admin)
  return <Outlet />;
};

export default AdminRoute;
