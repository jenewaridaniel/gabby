import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase"; 

const ProtectedRoute = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user); // true if user exists, false if not
    });

    return () => unsubscribe();
  }, []);

  if (authenticated === null) return <div>Loading...</div>;

  return authenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
