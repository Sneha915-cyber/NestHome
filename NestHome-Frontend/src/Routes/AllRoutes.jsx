import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from '../components';
import { useAuth } from '../Auth/AuthContext';
import {Home,About,Contact,Login,Register,Services,UserDashboard,ProfessionalDashboard,AdminDashboard,Unauthorized} from '../Pages';

export const AllRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-primary-600 border-solid rounded-full loading-spinner"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route element={<PrivateRoute allowedRoles={['USER']} />}>
        <Route path="/user" element={<UserDashboard />} />
      </Route>
      <Route element={<PrivateRoute allowedRoles={['PROFESSIONAL']} />}>
        <Route path="/professional" element={<ProfessionalDashboard />} />
      </Route>
      <Route element={<PrivateRoute allowedRoles={['ADMIN']} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
