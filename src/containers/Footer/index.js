/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { TOS, HELP_PAGE, SDG } from "constants/routes.constants";
import GetStarted from "components/GetStarted/GetStarted";

const isKaziconnectPage =
  window.location.host.split(".")[0] === "kaziconnect9212" ? true : false;

const Footer = () => {
  return (
    <div style={{ marginTop: "auto" }}>
      <div className="" />
      <div
        id="footer"
        style={{
          width: "100%",
          // position: "absolute",
          // bottom: 0,
        }}
      >
        {/* Main */}
        <div className="container-x">
          <Fade left cascade>
            <div className="seven columns">
              <h4>About</h4>
              {isKaziconnectPage ? (
                <p>Kazi Connect</p>
              ) : (
                <p>The Database - Jobs need People.</p>
              )}
              <br />
              <GetStarted floatDirection="left" />
            </div>
            <div className="three columns">
              <h4>We Care</h4>
              <ul className="footer-links">
                <li>
                  <Link to={`${HELP_PAGE}`}>FAQs</Link>
                </li>
                <li>
                  <Link to={`${TOS}`}>Terms of Service</Link>
                </li>
                <li>
                  <Link to={`${TOS}`}>Privacy Policy</Link>
                </li>
              </ul>
            </div>
            <div className="three columns">
              <h4>About</h4>
              <ul className="footer-links">
                <li>
                  <Link to={`${SDG}`}>Our SDGs</Link>
                </li>
              </ul>
            </div>
            <div className="three columns">
              <h4>Others</h4>
              <ul className="footer-links">
                <li>
                  <Link to="/pricing">Pricing</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </Fade>
        </div>
        {/* Bottom */}
        <div className="container-x">
          <div className="footer-bottom">
            <div className="sixteen columns">
              <h4>Follow Us</h4>
              <ul className="social-icons">
                <li>
                  <Link
                    className="facebook"
                    to={{pathname: "https://facebook.com/thedatabase.co.ke"}}
                    target="_blank"
                  >
                    <i className="icon-facebook" />
                  </Link>
                </li>
                <li>
                  <Link
                    className="twitter"
                    to={{pathname: "https://twitter.com/ThedatabaseKe"}}
                    target="_blank"
                  >
                    <i className="icon-twitter" />
                  </Link>
                </li>
                <li>
                  <Link
                    className="instagram"
                    to={{pathname: "https://www.instagram.com/thedatabase.co.ke/"}}
                    target="_blank"
                  >
                    <i className="icon-instagram" />
                  </Link>
                </li>
                <li>
                  <Link
                    className="linkedin"
                    to={{pathname: "https://www.linkedin.com/company/thedb"}}
                    target="_blank"
                  >
                    <i className="icon-linkedin" />
                  </Link>
                </li>
              </ul>
              <div className="copyrights">
                © Copyright {new Date().getFullYear()} by{" "}
                <Link to="/">
                  {isKaziconnectPage ? "Kazi Connect" : "TheDatabase"}
                </Link>
                . All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Back To Top Button */}
      <div id="backtotop">
        <Link to="#"> </Link>
      </div>
    </div>
  );
};

export default Footer;
