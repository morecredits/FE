import React, { useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import { SidebarWrapper, MenuWrapper, LogoImage } from "./Sidebar.style";
import UserContext from "contexts/user/user.provider";
import KaziConnectLogo from "image/kclogo.png";
import { groupBy } from "utils/groupBy";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default withRouter(function Sidebar(props) {
  const menuItems = groupBy(props.routes, "category");
  const [activeLink, setActiveLink] = React.useState(false);
  const [openParent, setOpenParent] = React.useState(false);
  const { user } = useContext(UserContext);

  const isKaziconnectPage =
    window.location.host.split(".")[0] === "kaziconnect9212" ? true : false;

  const setLink = (title, isParent) => {
    if (props.onMenuItemClick) {
      if (!isParent) {
        props.onMenuItemClick();
      }
    }

    setActiveLink(title);
  };

  const isOpen = (menuItem) => {
    if (activeLink === menuItem.title && openParent) {
      return true;
    }
    return false;
  };
  const menuHandler = (section, parent = null) => {
    return section.map((menuItem) => {
      if (!menuItem.children || menuItem.children.length === 0) {
        return menuItem.dashboardItem ? (
          <li
            style={
              activeLink === menuItem.title
                ? {
                    borderColor: "#e8eaf6",
                    backgroundColor: "#283593",
                    color: "#fff",
                  }
                : {}
            }
            key={menuItem.title}
          >
            {user.isSeeker ? (
              menuItem.title === "Billing" ? null : (
                <Link
                  style={{ color: "#c5cae9" }}
                  to={{
                    pathname: `${props.path}${parent ? parent.url : ""}${
                      menuItem.url
                    }`,
                    pageProps: menuItem,
                  }}
                  exact={menuItem.exact}
                  onClick={() => setLink(menuItem.title)}
                >
                  {menuItem.title}
                </Link>
              )
            ) : (
              <Link
                style={{ color: "#c5cae9" }}
                to={{
                  pathname: `${props.path}${parent ? parent.url : ""}${
                    menuItem.url
                  }`,
                  pageProps: menuItem,
                }}
                exact={menuItem.exact}
                onClick={() => setLink(menuItem.title)}
              >
                {menuItem.title}
              </Link>
            )}
          </li>
        ) : null;
      }
      return (
        <li
          style={
            activeLink === menuItem.title
              ? { borderColor: "#e8eaf6", backgroundColor: "#283593" }
              : { borderColor: "#e8eaf6", backgroundColor: "#283593" }
          }
          key={menuItem.title}
          onClick={() => {
            setLink(menuItem.title, true);
            setOpenParent((curr) => !curr);
          }}
          className={isOpen(menuItem) ? "active-submenu" : ""}
        >
          <Link
            to={{
              pathname: "",
            }}
            style={{
              color: "#fff",
              textTransform: "uppercase",
              fontWeight: 600,
              fontSize: "12px",
            }}
          >
            {menuItem.title}
          </Link>
          <ul>{menuHandler(menuItem.children, menuItem)}</ul>
        </li>
      );
    });
  };
  return (
    <SidebarWrapper ref={props.refs} style={props.style}>
      {/* {props.isOpen ? (
        <Link to="/">
          <LogoImage src={Logoimage} alt="TheDB" />
        </Link>
      ) : null} */}

      <MenuWrapper>
        <div className="dashboard-nav" style={{ backgroundColor: "#3949ab" }}>
          <div className="dashboard-nav-inner">
            <ul>
              {isKaziconnectPage ? (
                <Box sx={{ mt: 4, mb: 8 }}>
                  <LogoImage src={KaziConnectLogo} alt="Kazi Connect" />
                </Box>
              ) : (
                <Typography
                  variant="h6"
                  sx={{ color: "#fff", m: 2, ml: 4, fontWeight: 600 }}
                >
                  TheDatabase
                </Typography>
              )}
              {!props?.deviceType?.desktop && (
                <li>
                  <Link
                    to={{
                      pathname: "",
                    }}
                  >
                    Hi 👋 {user?.fullName || user?.username}
                  </Link>
                </li>
              )}

              {/* user?.isSeeker && (
                <div>
                  <div
                    // clasName={"sidebar-link-button"}
                    style={{
                      display: "block",
                      borderLeft: "3px solid transparent",
                      transition: "0.3s",
                      lineHeight: "25px",
                      fontSize: "14px",
                      padding: "0 10px",
                    }}
                  >
                    {user?.seeker?.status === "OPEN" && (
                      <div className="sidebar-link">
                        <img
                          alt="open to jobs"
                          src={
                            "https://developers.turing.com/static/media/openToOffers.c87ed54c.svg"
                          }
                        />{" "}
                        Open to offers
                      </div>
                    )}
                    {user?.seeker?.status === "BUSY" && (
                      <div className="sidebar-link">
                        <img
                          alt="open to jobs"
                          src={
                            "https://developers.turing.com/static/media/not_available_for_work.2848971e.svg"
                          }
                        />{" "}
                        Busy
                      </div>
                    )}
                    {user?.seeker?.status === "LOOKING" && (
                      <div className="sidebar-link">
                        <img
                          alt="open to jobs"
                          src={
                            "https://developers.turing.com/static/media/available_for_work.74e15aac.svg"
                          }
                        />{" "}
                        Actively Looking
                      </div>
                    )}
                  </div>
                </div>
                        )*/}
            </ul>
            {Object.keys(menuItems).map((section, i) => (
              <ul key={i} data-submenu-title={section}>
                {menuHandler(menuItems[section])}
              </ul>
            ))}
            <ul>
              <li>
                <Link
                  to={{
                    pathname: "/vacancies",
                  }}
                  style={{ color: "#fff", fontWeight: 600 }}
                >
                  View Listings
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </MenuWrapper>
    </SidebarWrapper>
  );
});
