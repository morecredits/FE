import React from "react";
import Banner from "containers/Banner/Banner";
// import CategoriesSection from "./CategoriesSection";
import Vacancies from "./VacanciesSection";
import InfoSection from "./InfoSection";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "contexts/auth/auth.context";
import UserContext from "contexts/user/user.provider";
import seekerImg from "image/happy_seeker.webp";
import interviewerImg from "image/interviewer.webp";
import rotaractorImg from "image/rotaractor.webp";
import employerImg from "image/happy_employer.webp";
import hireImg from "image/hire.webp";
// import reviewImg from "image/review.webp";
import onboardImg from "image/onboard.webp";
import cardsImg from "image/yellow_girl.webp";
import rotaryLogo from "image/rotary-logo-color-2019-simplified.svg";

// import Users from "./UsersSection";
import Carousel from "react-material-ui-carousel";
import Fade from "react-reveal/Fade";
import { Carousel as ComponentCarousel } from "react-responsive-carousel";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const paretnersSection = (
  <Grid container spacing={0} sx={{ m: 6, p: 2 }}>
    <Grid item sm={12} lg={4}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Our Partners
        </Typography>
        <hr
          style={{
            width: 50,
            backgroundColor: "#0d47a1",
            height: 4,
          }}
        />
      </Box>
    </Grid>
    <Grid
      item
      sm={12}
      lg={8}
      maxHeight={300}
      alignItems="center"
      justifyContent="center"
    >
      <div className="w-full md:w-full xl:w-3/4 px-4">
        <ComponentCarousel
          showarrows={false}
          autoPlay
          // onchange={onChange}
          // onclickitem={onClickItem}
          // onclickthumb={onClickThumb}

          showThumbs={true}
          showStatus={false}
          infiniteLoop
          emulateTouch
          useKeyboardArrows
          transitionTime={1000}
        >
          <Grid sx={{ maxWidth: 400, height: 200, m: 2 }}>
            <img
              alt="rotary"
              src={rotaryLogo}
              style={{ maxWidth: 400, align: "center" }}
            />
          </Grid>
        </ComponentCarousel>
      </div>
    </Grid>
  </Grid>
);

function LandingPage({ deviceType }) {
  const {
    authState: { isAuthenticated },
  } = React.useContext(AuthContext);
  const { userType } = React.useContext(UserContext);
  const history = useHistory();

  const handleRedirect = () => {
    if (isAuthenticated) {
      history.push(`/dashboard`);
    } else {
      history.push(`/auth/`);
    }
  };
  return (
    <React.Fragment>
      {userType === "Employer" && (
        <div>
          <Carousel animation="slide" interval={4000} duration={1000} autoPlay>
            <Banner
              bannerHeading={"Hire The Right People"}
              bannerSubHeading={
                "People are not your most important asset, The right people are!"
              }
              bannerImage={employerImg}
            />
            <Banner
              bannerHeading={"Interviewed and Proven."}
              bannerSubHeading={
                "We conduct screening interviews and give you the right talent."
              }
              bannerImage={onboardImg}
            />
            <Banner
              bannerHeading={"Fast and Reliable Recruitment"}
              bannerSubHeading={"We are agile and will fill your roles ASAP"}
              bannerImage={hireImg}
            />
          </Carousel>
          <div className="section-background top-0 margin-bottom-0">
            <div className="container-x relative">
              <div className="container relative max-w-4xl flex items-center h-auto flex-wrap mx-auto lg:my-0">
                {/*Main Col*/}
                <div className="container mx-auto my-1">
                  <h3 className="font-bold text-2xl transition duration-500 my-2">
                    What You Get
                  </h3>
                  <hr className="my-1 rounded border-b-2 border-blue-800 w-8" />
                </div>
                <div className="container relative mx-auto my-1 z-10">
                  <div className="relative rounded-lg flex flex-col md:flex-row items-center mx-2">
                    <div className="shadow-xl z-0 order-1 md:order-2 relative w-full md:w-2/5 h-40 md:h-full overflow-hidden rounded-lg md:rounded-none md:rounded-r-lg">
                      <div className="md:hidden absolute inset-0 h-full p-6 pb-6 flex flex-col-reverse justify-start items-start bg-gradient-to-b from-transparent via-transparent to-gray-900">
                        <h3 className="w-full font-bold text-2xl text-white leading-tight mb-2">
                          Larger Workforce
                        </h3>
                      </div>
                      <svg
                        className="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-white -ml-12"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <polygon points="50,0 100,0 50,100 0,100" />
                      </svg>
                    </div>
                    <div className="shadow-xl z-10 order-2 md:order-1 w-full h-full md:w-3/5 flex items-center -mt-6 md:mt-0">
                      <div className="p-4 md:pr-14 md:pl-8 md:py-6 mx-2 md:mx-0 h-full bg-white rounded-lg shadow-xl md:shadow-none">
                        <h3 className="hidden md:block font-bold text-2xl text-gray-700">
                          Larger Workforce
                        </h3>
                        <p className="text-gray-600 text-justify">
                          Interns are valuable support and help to current
                          employees, even if tasks given to them have modest
                          levels of responsibility.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container relative mx-auto my-1 z-10">
                  <div className="relative rounded-lg flex flex-col md:flex-row items-center mx-2">
                    <div className="shadow-xl z-0 order-1 md:order-2 relative w-full md:w-2/5 h-40 md:h-full overflow-hidden rounded-lg md:rounded-none md:rounded-r-lg">
                      <div className="md:hidden absolute inset-0 h-full p-6 pb-6 flex flex-col-reverse justify-start items-start bg-gradient-to-b from-transparent via-transparent to-gray-900">
                        <h3 className="w-full font-bold text-2xl text-white leading-tight mb-2">
                          New Perspective
                        </h3>
                      </div>
                      <svg
                        className="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-white -ml-12"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <polygon points="50,0 100,0 50,100 0,100" />
                      </svg>
                    </div>
                    <div className="shadow-xl z-10 order-2 md:order-1 w-full h-full md:w-3/5 flex items-center -mt-6 md:mt-0">
                      <div className="p-4 md:pr-14 md:pl-8 md:py-6 mx-2 md:mx-0 h-full bg-white rounded-lg shadow-xl md:shadow-none">
                        <h3 className="hidden md:block font-bold text-2xl text-gray-700">
                          New Perspective
                        </h3>
                        <p className="text-gray-600 text-justify">
                          Interns offer a fresh look at a company's day-to-day
                          business and procedures and can share ideas on
                          strategy, plans, policies and more.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container relative mx-auto my-1 z-10">
                  <div className="relative rounded-lg flex flex-col md:flex-row items-center mx-2">
                    <div className="shadow-xl z-0 order-1 md:order-2 relative w-full md:w-2/5 h-40 md:h-full overflow-hidden rounded-lg md:rounded-none md:rounded-r-lg">
                      <div className="md:hidden absolute inset-0 h-full p-6 pb-6 flex flex-col-reverse justify-start items-start bg-gradient-to-b from-transparent via-transparent to-gray-900">
                        <h3 className="w-full font-bold text-2xl text-white leading-tight mb-2">
                          Mentorship Opportunities
                        </h3>
                      </div>
                      <svg
                        className="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-white -ml-12"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <polygon points="50,0 100,0 50,100 0,100" />
                      </svg>
                    </div>
                    <div className="shadow-xl z-10 order-2 md:order-1 w-full h-full md:w-3/5 flex items-center -mt-6 md:mt-0">
                      <div className="p-4 md:pr-14 md:pl-8 md:py-6 mx-2 md:mx-0 h-full bg-white rounded-lg shadow-xl md:shadow-none">
                        <h3 className="hidden md:block font-bold text-2xl text-gray-700">
                          Mentorship Opportunities
                        </h3>
                        <p className="text-gray-600 text-justify">
                          Internship programs give current employees an
                          opportunity to mentor future leaders in the field, and
                          it can promote a healthy work culture and build
                          company morale.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/*Img Col*/}
                <div className="absolute flex w-3/5 lg:w-3/5 h-90 right-8">
                  {/* Big profile image for side bar (desktop) */}
                  <img
                    alt="landing"
                    src={cardsImg}
                    className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
                  />
                  {/* Image from: http://unsplash.com/photos/MP0IUfwrn0A */}
                </div>
              </div>
            </div>
          </div>

          {/* <Users /> */}
          {/* <InfoSection /> */}
          <div className="infobox margin-bottom-0">
            <div className="container-x">
              <div className="sixteen columns">
                <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                  <Fade>
                    <Grid
                      container
                      spacing={0}
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                      sx={{ p: 1 }}
                    >
                      <Typography
                        variant="h4"
                        sx={{ color: "white", fontWeight: "bold" }}
                      >
                        Our Mission
                      </Typography>
                      <hr
                        style={{
                          width: 50,
                          backgroundColor: "white",
                          height: 2,
                        }}
                      />
                      <Typography variant="subtitle1" sx={{ color: "white" }}>
                        To provide a friendly and enabling work environment
                        founded on the principles of respect, dignity and
                        equality. To foster inclusion and singularity of purpose
                        by encouraging innovation and initiative. To provide the
                        highest attainable standards of service and
                        professionalism. To benefit not only our direct clients
                        but the wider community and the nation at large.
                      </Typography>
                    </Grid>
                  </Fade>
                </div>
              </div>
            </div>
          </div>
          {/* <Loader /> */}
          {/* <CounterSection /> */}
          <div className="section-background top-0 margin-bottom-0">
            <div className="container-x">
              <div className="flex flex-wrap -mx-4">
                <div>{paretnersSection}</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {userType === "Seeker" && (
        <div>
          <Carousel animation="slide" interval={4000} duration={1000} autoPlay>
            <Banner
              bannerHeading={"Great Carees Start Here"}
              bannerSubHeading={"We have interesting opportunities for you!"}
              bannerImage={seekerImg}
            />
            <Banner
              bannerHeading={"All That You Need"}
              bannerSubHeading={
                "A one stop shop for all your professional development needs!"
              }
              bannerImage={rotaractorImg}
            />
            <Banner
              bannerHeading={"Personalized Service"}
              bannerSubHeading={
                "Professional interviews and feedback to find your perfect fit!"
              }
              bannerImage={interviewerImg}
            />
          </Carousel>
          <Vacancies />
          <InfoSection />
          <div className="infobox margin-bottom-0">
            <div className="container-x">
              <div className="sixteen columns">
                Start Building Your Own Career Now{" "}
                <Link to={{ pathname: "" }} onClick={handleRedirect}>
                  {" "}
                  Get Started{" "}
                </Link>
              </div>
            </div>
          </div>
          {/* <Loader /> */}

          {/* <CounterSection /> */}
          {/* <CategoriesSection /> */}
          <div className="section-background top-0 margin-bottom-0">
            {paretnersSection}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
export default LandingPage;
