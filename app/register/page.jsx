"use client";
import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import { useRouter } from "next/navigation";
import { API_URL } from "@/config";

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch(`${API_URL}/api/csrf-token`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch CSRF token");
        }
        const data = await response.json();
        console.log("CSRF Token:", data.csrf_token);
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
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    if (formData.password !== formData.password_confirmation) {
      errors.password_confirmation = "Passwords do not match";
    }
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      try {
        console.log("Submitting form with CSRF Token:", csrfToken);
        console.log("Form Data:", formData);

        const response = await fetch(`${API_URL}/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
          body: JSON.stringify(formData),
          credentials: "include",
        });

        const data = await response.json();
        console.log("API Response Status:", response.status);
        console.log("API Response Data:", data);

        if (!response.ok) {
          throw new Error(data.message || "Network response was not ok");
        }

        // Save token to local storage or context
        localStorage.setItem("token", data.csrfToken);

        // Redirect to another page, e.g., dashboard
        window.location.href = "/register";
      } catch (error) {
        console.error("API Error:", error);
        setApiError(error.message || "There is something wrong..!");
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <>
      <Hero />
      <h3 className="container text-center">Register a User</h3>
      <div className="container-fluid py-5">
        <div className="container py-5 text-center">
          <div className="mx-auto max-w-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="name"
                  className="col-sm-3 col-form-label text-left text-sm-right"
                >
                  Name <span className="text-danger">*</span>
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-control ${
                      formErrors.name ? "is-invalid" : ""
                    }`}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {formErrors.name && (
                    <div className="invalid-feedback text-left">
                      {formErrors.name}
                    </div>
                  )}
                </div>
              </div>
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
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="password_confirmation"
                  className="col-sm-3 col-form-label text-left text-sm-right"
                >
                  Confirm Password <span className="text-danger">*</span>
                </label>
                <div className="col-sm-4">
                  <input
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    className={`form-control ${
                      formErrors.password_confirmation ? "is-invalid" : ""
                    }`}
                    value={formData.password_confirmation}
                    onChange={handleChange}
                  />
                  {formErrors.password_confirmation && (
                    <div className="invalid-feedback text-left">
                      {formErrors.password_confirmation}
                    </div>
                  )}
                </div>
              </div>
              {apiError && (
                <div className="alert alert-danger text-left">{apiError}</div>
              )}
              <div className="row">
                <div className="col-sm-7">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
