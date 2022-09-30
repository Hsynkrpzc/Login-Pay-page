import React, { useEffect, useState } from "react";
import useApi from "./hooks/useApi";

const Header = () => {
  const api = useApi();
  const [user, setUser] = useState(null);
  // const test = true;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api
        .get("user/appData")
        .then((response) => {
          console.log(">> APP DATA RESP", response);
          setUser(response.data.data.user);
        })
        .catch((err) => {
          console.log(">> ERR", err);
        });
    }
  }, []);

  const onLogoutBtnClick = () => {
    api
      .get("auth/logout")
      .then((response) => {
        console.log(">> LOGOUT RESP", response);
      })
      .catch((err) => {
        console.log(">> ERR", err);
      })
      .finally(() => {
        localStorage.removeItem("token");
        window.location.href = "/#";
        setTimeout(() => {
          window.location.reload();
        }, 111);
      });
  };

  return (
    <header>
      <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center text-dark text-decoration-none"
        >
          <i className="fa-regular fa-credit-card fa-2x"></i>
          <span className="fs-4 ms-2">Ödeme Sayfası</span>
        </a>

        {/* <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
            <strong className="me-3 py-2 mx-2">
              {test=== true ? ("test değeri true") : ("test değeri false")}
            

            <br/>

            <span style={{display : test ? "block" : "none"}}>TEST DEĞERİ TRUE</span>
            <span style={{display : test === false ? "block" : "none"}}>TEST DEĞERİ FALSE</span>
            </strong>
        </nav> */}

        {user ? (
          <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
            <strong className=" me-3 py-2">{user.fullname}</strong>
            <button className="btn btn-primary py-2" onClick={onLogoutBtnClick}>
              Logout
            </button>
          </nav>
        ) : (
          <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
            <a
              className="btn btn-sm btn-outline-primary me-3 py-2 mx-2"
              href="/login"
            >
              <i className="fa-regular fa-user"></i> Login
            </a>
            <a className="btn btn-outline-primary py-2" href="/register">
              Register
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
