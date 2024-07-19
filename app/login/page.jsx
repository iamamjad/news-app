"use client";
import React, { useState, useEffect, useContext } from "react";
import Hero from "../components/Hero";
import { useRouter } from "next/navigation";
import { API_URL } from "@/config";
import AuthContext from "@/context/AuthContext";
const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch(`${API_URL}/api/csrf-token`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch CSRF token");
        }
        const data = await response.json();
        setCsrfToken(data.csrf_token);
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    };
    fetchCsrfToken();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validate = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(`${API_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(errorData || "Network response was not ok");
        }
        const data = await response.json();
        const jwt = data.token;
        const user = data.user;
        // Store token and user details
        localStorage.setItem("jwt", jwt);
        localStorage.setItem("user", JSON.stringify(user));
        login(user);
        // Redirect to the dashboard
        router.push("/dashboard");
      } catch (error) {
        console.error("API Error:", error);
        setApiError("Invalid email or password");
      }
    } else {
      setFormErrors(errors);
    }
  };
  return (
    <>
      <Hero />
      <div className="container-fluid py-5">
        <div className="container py-5 text-center">
          <div className="mx-auto max-w-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="email"
                  className="col-sm-3 col-form-label text-left text-sm-right"
                >
                  Email <span className="text-danger">*</span>
                </label>
                <div className="col-sm-4">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${
                      formErrors.email ? "is-invalid" : ""
                    }`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {formErrors.email && (
                    <div className="invalid-feedback text-left">
                      {formErrors.email}
                    </div>
                  )}
                </div>
              </div>
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="password"
                  className="col-sm-3 col-form-label text-left text-sm-right"
                >
                  Password <span className="text-danger">*</span>
                </label>
                <div className="col-sm-4">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`form-control ${
                      formErrors.password ? "is-invalid" : ""
                    }`}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {formErrors.password && (
                    <div className="invalid-feedback text-left">
                      {formErrors.password}
                    </div>
                  )}
                </div>
              </div>
              {apiError && (
                <div className="alert alert-danger text-left">{apiError}</div>
              )}
              <div className="row">
                <div className="col-sm-7 ml-10">
                  <button type="submit" className="btn btn-primary">
                    Sign in
                  </button>
                  {/* <Link
                    href="/register"
                    className="btn btn-primary"
                    style={{ marginLeft: "10px" }}
                  >
                    Register
                  </Link> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
