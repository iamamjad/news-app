"use client";
import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import { API_URL } from "@/config";
const UsersPage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllRegisterUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/users`, {});
        if (!response.ok) {
          throw new Error("Error fetching data from the API");
        }
        const responseData = await response.json();
        setUsers(responseData.users); // Store users in state
      } catch (error) {
        console.error(error);
      }
    };
    getAllRegisterUsers();
  }, []);
  return (
    <>
      <Hero />
      <h3 className="container text-center">Registered Users</h3>
      <div className="container-fluid py-5">
        <div className="container py-5 text-center">
          <div className="mx-auto max-w-lg">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default UsersPage;
