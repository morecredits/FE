import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logoimage from "image/db.png";
import styled from "styled-components";
import LogoimageInverted from "image/thedb.png";
import KaziConnectLogo from "image/kclogo.png";
import UserContext from "contexts/user/user.provider";
import { isCategoryPage } from "../../../is-home-page";

export const Logo = styled.div`
  // margin-right: auto;

  // @media only screen and (max-width: 1199px) {
  //   display: none;
  // }
`;
export const LogoImage = styled.img`
  padding: 5px;
  display: block;
  backface-visibility: hidden;
  max-width: 150px;
  max-height: 36px;
`;
export const LeftMenu = ({ isSticky, logo }) => {
  const location = useLocation();

  const { userType, setUserType } = React.useContext(UserContext);
  const path = location.pathname.replace(/\/+$/, "");
  const pathname = path[0] === "/" ? path.substr(1) : path;

  const isHomePage =
    window.location.host.split(".")[0] === "kaziconnect9212"
      ? false
      : isCategoryPage(pathname);

  const isKaziconnectPage =
    window.location.host.split(".")[0] === "kaziconnect9212" ? true : false;

  return (
    <ul style={{ display: "flex", margin: "0", width: "70%", color: "#fff" }}>
      {isKaziconnectPage ? (
        <Link to="/">
          <div
            className={`flex items-center font-medium text-lg ${isHomePage
              ? isSticky
                ? "text-blue-800"
                : "text-white"
              : "text-blue-800"
              } `}
          ></div>
        </Link>
      ) : null}
      <Logo className={`flex items-center`}>
        {!isHomePage ? (
          <Link to="/">
            {isKaziconnectPage ? (
              <div style={{ display: "flex" }}>
                <LogoImage src={KaziConnectLogo} alt="Kazi Connect" />
              </div>
            ) : (
              <LogoImage src={LogoimageInverted} alt="TheDB" />
            )}
          </Link>
        ) : (
          <>
            {isSticky ? (
              <Link to="/">
                <LogoImage src={LogoimageInverted} alt="TheDB" />
              </Link>
            ) : (
              <Link to="/">
                <LogoImage src={Logoimage} alt="TheDB" />
              </Link>
            )}
          </>
        )}
        <Link to="/">
          <div
            className={`flex items-center font-medium text-lg ${isHomePage
              ? isSticky
                ? "text-blue-800"
                : "text-white"
              : "text-blue-800"
              } `}
          >
            {isKaziconnectPage ? null : "TheDatabase"}
          </div>
        </Link>
      </Logo>
      <li style={{ paddingLeft: "20px" }}>
        <Link
          classame={"text-base text-white hover:text-white"}
          style={{ color: "#fff" }}
          id={"current"}
          to={{
            pathname: "",
          }}
          onClick={() => {
            if (userType === "Employer") {
              localStorage.setItem("thedb_user", "Seeker");
              setUserType("Seeker");
            } else if (userType === "Seeker") {
              localStorage.setItem("thedb_user", "Employer");
              setUserType("Employer");
            }
          }}
        >
          {userType === "Seeker" && "As Employer"}
          {userType === "Employer" && "As Seeker"}
        </Link>
      </li>
      <li>
        <Link
          style={{
            color: isHomePage ? (isSticky ? "#7b7b7b" : "#fff") : "#7b7b7b",
          }}
          id={pathname === "contact-us" ? "current" : ""}
          to="/help"
        >
          Help
        </Link>
      </li>
      <li>
        <Link
          style={{
            color: isHomePage ? (isSticky ? "#7b7b7b" : "#fff") : "#7b7b7b",
          }}
          id={pathname === "vacancies" ? "current" : ""}
          to="/vacancies"
        >
          Openings
        </Link>
      </li>

      {/* <li>
        <Link
          style={{
            color: isHomePage ? (isSticky ? "#7b7b7b" : "#fff") : "#7b7b7b",
          }}
          id={
            pathname === "vacancies" || pathname === "categories"
              ? "current"
              : ""
          }
          to={"#"}
        >
          Jobs
        </Link>
        <ul>
          <li>
            <Link to="/vacancies">All Jobs</Link>
          </li>
          <li>
            <Link to="/categories">Job Categories</Link>
          </li>
        </ul>
      </li> */}
    </ul>
  );
};
