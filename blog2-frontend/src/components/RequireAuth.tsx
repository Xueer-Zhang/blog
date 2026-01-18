// src/components/RequireAuth.tsx
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import type { JSX } from 'react';


export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}