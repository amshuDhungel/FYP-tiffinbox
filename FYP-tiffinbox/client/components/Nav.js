import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar } from "antd";

const Nav = () => {
  const [current, setCurrent] = useState("");
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    setCurrent(window.location.pathname);
  }, []);

  const router = useRouter();

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };

  return (
    <nav className="nav d-flex justify-content-between bg-[#fcb100] fixed top-0 w-full z-10">
      <Link href="/" className="nav-link text-light logo">
        <Avatar src={"/images/logo.png"} /> TiffinBox
      </Link>

      {state !== null ? (
        <>
          {/* Additional links */}
          <div className="flex items-center">
            <Link
              href="/dashboard"
              className={`nav-link text-light ${
                current === "/dashboard" && "active"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/order"
              className={`nav-link text-light ${
                current === "/order" && "active"
              }`}
            >
              Order
            </Link>
            <Link
              href="/notification"
              className={`nav-link text-light ${
                current === "/notification" && "active"
              }`}
            >
              Notification
            </Link>
          </div>
          {/* <div className="flex items-center">
            <Link
              href="/login"
              className={`nav-link text-light mr-2 ${
                current === "/login" && "active"
              }`}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={`nav-link text-light ${
                current === "/register" && "active"
              }`}
            >
              Register
            </Link>
          </div> */}
          <div className="dropdown">
            <button
              className="btn dropdown-toggle text-light"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {state && state.user && state.user.name}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link
                  href="/user/dashboard"
                  className={`nav-link dropdown-item ${
                    current === "/user/dashboard" && "active"
                  }`}
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/user/profile/update"
                  className={`nav-link dropdown-item ${
                    current === "/user/profile/update" && "active"
                  }`}
                >
                  Profile
                </Link>
              </li>
              <li>
                <a
                  onClick={logout}
                  className="nav-link dropdown-item "
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center">
            <Link
              href="/login"
              className={`nav-link text-light mr-2 ${
                current === "/login" && "active"
              }`}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={`nav-link text-light ${
                current === "/register" && "active"
              }`}
            >
              Register
            </Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;
