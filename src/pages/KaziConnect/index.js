import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "contexts/auth/auth.context";
import UserContext from "contexts/user/user.provider";
import { useHistory } from "react-router-dom";
import Banner from "./Banner";

import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import Vacancies from "../LandingPage/VacanciesSection";

import Fade from "react-reveal/Fade";

//images
import KaziConnectWhite from "./images/white_logo_transparent_background.png";
import BackImage from "./images/Addis-Ababa-Arial.jpeg";
import DistrictLogo from "./images/district-9212.png";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#0d47a1",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffca28",
      main: "#ff8f00",
      dark: "#f57c00",
      contrastText: "#fff",
    },
  },
});

const StyledButton = styled(ButtonBase)(({ theme }) => ({
  m: 1,
  position: "relative",
  height: 50,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 50,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "2px solid currentColor",
      borderRadius: 2,
    },
  },
  borderRadius: 2,
}));

const ButtonMarked = styled("span")(({ theme }) => ({
  height: 2,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

function KaziConnect({ deviceType }) {
  const {
    authState: { isAuthenticated },
  } = React.useContext(AuthContext);
  const { userType } = React.useContext(UserContext);
  const history = useHistory();

  const handleRedirect = () => {
    if (isAuthenticated) {
      history.push(`/dashboard`);
    } else {
      userType === "Employer"
        ? history.push(`/auth/business`)
        : history.push(`/auth/seeker`);
    }
  };

  const IntroSection = (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={7}>
        <Card elevation={3} sx={{ p: 2, borderRadius: 4 }}>
          <Grid container spacing={0} sx={{ m: 2 }}>
            <Grid item xs={12} lg={4}>
              <img
                src={DistrictLogo}
                alt="district 9212"
                style={{ maxWidth: 220 }}
              />
            </Grid>
            <Grid item xs={12} lg={7} sx={{ ml: 1 }}>
              <Typography>
                The Database in collaboration with Rotary District 9212 (Kenya,
                Ethiopia, South Sudan &Eritrea) is working to facilitate the
                professional development of Rotaractors by allowing Rotarians to
                offer roles to Rotaractors who share mutual interests and ethics
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12} lg={5}>
        <Card
          elevation={3}
          sx={{
            p: 2,
            backgroundColor: "#0d47a1",
            borderRadius: 4,
            color: "#fff",
          }}
        >
          <Box sx={{ m: 2 }}>
            <Box sx={{ m: 1 }}>
              <Typography variant="h5" color="inherit">
                {userType === "Employer" ? "Find Talent" : "Find Opportunities"}
              </Typography>
              <Typography variant="body2" color="inherit">
                {userType === "Employer"
                  ? "Attract, engage and recruit talent with ease"
                  : "Explore and discover the right job opportunities "}
              </Typography>
            </Box>
            <Box sx={{ m: 2 }} />
            <StyledButton onClick={handleRedirect} color="inherit">
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: "relative",
                  p: 1,
                }}
              >
                Get Started
                <ButtonMarked className="MuiImageMarked-root" />
              </Typography>
            </StyledButton>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ m: 12 }} />
      <React.Fragment>
        {userType === "Employer" && (
          <Box
            sx={{
              [theme.breakpoints.down("sm")]: {
                m: 0.5,
              },
              m: 4,
            }}
          >
            <Banner
              content={{
                backimage: BackImage,
                logoimage: KaziConnectWhite,
                button: "Find The Right People",
                link: "/auth/business",
              }}
            />
            <Box sx={{ m: 8 }} />
            <Box sx={{ p: 2 }}>{IntroSection}</Box>
          </Box>
        )}
        {userType === "Seeker" ? (
          <Box
            sx={{
              [theme.breakpoints.down("sm")]: {
                m: 0.5,
              },
              m: 4,
            }}
          >
            <Banner
              content={{
                backimage: BackImage,
                logoimage: KaziConnectWhite,
                button: "Get Started",
                link: "/auth/seeker",
              }}
            />
            <Box sx={{ m: 8 }} />
            <Box sx={{ p: 2 }}>{IntroSection}</Box>

            <Box sx={{ m: 10 }} />
            <Vacancies />

            <Box sx={{ m: 8 }} />
          </Box>
        ) : (
          <Container maxWidth="lg">
            <Box sx={{ m: 10 }} />

            <Box>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Why Kazi Connect?
              </Typography>
              <hr
                style={{
                  width: 70,
                  backgroundColor: "#0d47a1",
                  height: 4,
                  margin: 3,
                }}
              />
            </Box>
            <Box sx={{ m: 3 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} lg={9}>
                <Fade left>
                  <Card elevation={3} sx={{ m: 2, p: 4, borderRadius: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#424242" }}
                    >
                      Automated shortlisting
                    </Typography>
                    <Typography variant="body2" sx={{ mr: 2 }}>
                      Candidates are automaticelly matched to your job
                      description making it quicker to find top talent
                    </Typography>
                  </Card>
                </Fade>
                <Fade left>
                  <Card elevation={3} sx={{ m: 2, p: 4, borderRadius: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#424242" }}
                    >
                      Screening interviews
                    </Typography>
                    <Typography variant="body2" sx={{ pr: 2 }}>
                      Thorough background checks are conducted on candidates to
                      ensure they are qualified
                    </Typography>
                  </Card>
                </Fade>
                <Fade left>
                  <Card elevation={3} sx={{ m: 2, p: 4, borderRadius: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#424242" }}
                    >
                      Timely hiring experience
                    </Typography>
                    <Typography variant="body2" sx={{ pr: 2 }}>
                      Promptly fill open positions with the right candidate and
                      increase productivity
                    </Typography>
                  </Card>
                </Fade>
              </Grid>
            </Grid>
            <Box sx={{ m: 8 }} />
          </Container>
        )}
      </React.Fragment>
    </ThemeProvider>
  );
}

export default KaziConnect;
