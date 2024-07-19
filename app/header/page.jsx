import React, { useContext } from "react";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
const Header = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <>
      {/* Navbar start */}
      <div className="container-fluid fixed-top">
        <div className="container px-0">
          <nav className="navbar navbar-light bg-white navbar-expand-xl">
            <Link href="/" className="navbar-brand">
              <h1 className="text-primary display-6">News App</h1>
            </Link>
            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="fa fa-bars text-primary" />
            </button>
            <div
              className="collapse navbar-collapse bg-white"
              id="navbarCollapse"
            >
              <div className="navbar-nav mx-auto">
                <Link href="/" className="nav-item nav-link active">
                  Home
                </Link>
                {user ? (
                  <>
                    {/* <span className="nav-item nav-link">{`Hello, ${user.name}`}</span> */}
                    <a href="/" className="nav-item nav-link" onClick={logout}>
                      Logout
                    </a>
                  </>
                ) : (
                  <>
                    <Link href="/users" className="nav-item nav-link active">
                      Users
                    </Link>
                    <Link href="/register" className="nav-item nav-link">
                      Register
                    </Link>
                    <Link href="/login" className="nav-item nav-link">
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* Navbar End */}
    </>
  );
};
export default Header;
