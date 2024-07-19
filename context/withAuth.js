// components/withAuth.js
"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/context/AuthContext";
const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/login");
      }
    }, [user, router]);

    if (!user) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
