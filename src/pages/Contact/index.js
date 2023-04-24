import React from "react";

const Contact = () => {
  return (
    <div>

      {/* Titlebar
================================================== */}
      <div id="titlebar" className="single">
        <div className="container-x">
          <div className="sixteen columns">
            <h2>Contact</h2>
            <nav id="breadcrumbs">
              <ul>
                <li>You are here:</li>
                <li>
                  <a href>Home</a>
                </li>
                <li>Contact</li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {/* Content
================================================== */}
      {/* Container */}
      <div className="container-x">
      <div className="five columns">
          {/* Information */}
          <h3 className="margin-bottom-10">Information</h3>
          <div className="widget-box">
            <p>
              TheDatabase Kenya{" "}
            </p>
            <ul className="contact-informations">
              <li>Kiambere Flats, Hse. D6</li>
              <li>Nairobi, Kenya</li>
            </ul>
            <ul className="contact-informations second">
              <li>
                <i className="fa fa-phone" /> <p>+254795945366</p>
              </li>
              <li>
                <i className="fa fa-envelope" /> <p>hello@thedatabase.co.ke</p>
              </li>
              <li>
                <i className="fa fa-globe" /> <p>thedatabase.co.ke</p>
              </li>
            </ul>
          </div>
          {/* Social */}
          <div className="widget margin-top-10">
            <h3 className="margin-bottom-5">Social Media</h3>
            <ul className="social-icons">
              <li>
                <a className="facebook" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/thedatabase.co.ke">
                  <i className="icon-facebook" />
                </a>
              </li>
              <li>
                <a className="twitter" target="_blank" rel="noopener noreferrer" href="https://twitter.com/ThedatabaseKe">
                  <i className="icon-twitter" />
                </a>
              </li>
              <li>
                <a className="linkedin" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/thedb/">
                  <i className="icon-linkedin" />
                </a>
              </li>
            </ul>
            <div className="clearfix" />
            <div className="margin-bottom-50" />
          </div>
        </div>
      <div className="eleven columns">
          <h3 className="margin-bottom-20">Our Office</h3>
          {/* Google Maps */}
          <section className="google-map-container">
            <div id="googlemaps" className="google-map google-map-full">
              <iframe 
                title="map" 
                height="100%"
                width="100%"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15955.133565688766!2d36.818523!3d-1.3050457!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x8edebb7bc5af5682!2sTheDatabase!5e0!3m2!1sen!2ske!4v1662544060676!5m2!1sen!2ske">
              </iframe>  
            </div>
          </section>
          {/* Google Maps / End */}
        </div>
        {/* Container / End */}
        {/* Sidebar
================================================== */}
      </div>
      {/* Container / End */}

            {/* Container */}
            <div className="container-x">

      </div>
      {/* Container / End */}
    </div>
  );
};

export default Contact;
