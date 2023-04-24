import React from "react";
import { useHistory } from "react-router";
import { numberWithCommas, formatCurrency } from "utils";

import UserContext from "contexts/user/user.provider";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PixIcon from "@mui/icons-material/Pix";

const Dashboard = () => {
  const { user, setRefetchUser } = React.useContext(UserContext);
  const history = useHistory();

  React.useEffect(() => {
    setRefetchUser((prev) => !prev);
  }, [setRefetchUser]);

  return (
    <div className="product_tour__step_1">
      {/* Content */}
      <Typography variant="h5" sx={{ ml: 1, mb: 2, mt: -1 }}>
        Overview
      </Typography>
      <div className="product_tour__sub_step_1">
        {/* Item */}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} lg={3}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent sx={{ p: 3 }}>
                <Grid container>
                  <Grid item sm={2} lg={3}>
                    <FormatListBulletedIcon sx={{ color: "#66bb6a" }} />
                  </Grid>
                  <Grid item sm={10} lg={9}>
                    <Typography variant="subtitle1">
                      Active Job Listings
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      {numberWithCommas(user?.numberOfActiveJobListings)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box sx={{ m: 1 }}>
                <Button
                  endIcon={<ArrowForwardIcon />}
                  sx={{ textTransform: "none", borderRadius: 3 }}
                  onClick={() => history.push(`/vacancies`)}
                >
                  View active listings
                </Button>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} lg={3}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent sx={{ p: 3 }}>
                <Grid container>
                  <Grid item sm={2} lg={3}>
                    <ContentCopyIcon sx={{ color: "#7e57c2" }} />
                  </Grid>
                  <Grid item sm={10} lg={9}>
                    <Typography variant="subtitle1">
                      {user?.isSeeker && "Total Resumes"}
                      {user?.isEmployer && "My Listings"}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      {numberWithCommas(user?.extra)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box sx={{ m: 1 }}>
                <Button
                  endIcon={<ArrowForwardIcon />}
                  sx={{ textTransform: "none", borderRadius: 3 }}
                  onClick={() =>
                    history.push(
                      user?.isSeeker
                        ? `/dashboard/resume`
                        : user?.isEmployer
                        ? `/dashboard/vacancies/manage-jobs`
                        : ``,
                    )
                  }
                >
                  {user?.isSeeker && " View all resumes"}
                  {user?.isEmployer && "View my listings"}
                </Button>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} lg={3}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent sx={{ p: 3 }}>
                <Grid container>
                  <Grid item sm={2} lg={3}>
                    <AppRegistrationIcon sx={{ color: "#29b6f6" }} />
                  </Grid>
                  <Grid item sm={10} lg={9}>
                    <Typography variant="subtitle1">
                      Total Applications
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      {numberWithCommas(user?.numberOfApplications)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box sx={{ m: 1 }}>
                <Button
                  endIcon={<ArrowForwardIcon />}
                  sx={{ textTransform: "none", borderRadius: 3 }}
                  onClick={() => history.push(`/dashboard/applications`)}
                >
                  View all applications
                </Button>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} lg={3}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent sx={{ p: 3 }}>
                <Grid container>
                  <Grid item sm={2} lg={3}>
                    <TurnedInNotIcon sx={{ color: "#ffca28" }} />
                  </Grid>
                  <Grid item sm={10} lg={9}>
                    <Typography variant="subtitle1">Saved Jobs</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      {numberWithCommas(user?.numberOfJobsBookmarked)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box sx={{ m: 1 }}>
                <Button
                  endIcon={<ArrowForwardIcon />}
                  sx={{ textTransform: "none", borderRadius: 3 }}
                  onClick={() => history.push(`/dashboard/bookmarks`)}
                >
                  View all saved jobs
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </div>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item sm={12} lg={7}>
          <Paper
            elevation={0}
            sx={{
              backgroundColor: "#e0f7fa",
              borderRadius: 6,
              p: 4,
              opacity: "0.9",
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: "#3f51b5", fontWeight: 600 }}
            >
              Your Packages
            </Typography>
            <Box sx={{ m: 1 }} />
            {user?.subscriptions && user?.subscriptions?.length > 0 ? (
              user?.subscriptions?.map((subscription, index) => (
                <ul key={index} className="dashboard-packages">
                  <li>
                    <i className="list-box-icon fa fa-money" />
                    <strong>
                      {subscription?.plan?.title} (
                      {subscription?.plan?.periodType})
                    </strong>
                    <span>
                      {formatCurrency(subscription?.plan?.periodAmountMoney)}
                    </span>
                  </li>
                </ul>
              ))
            ) : (
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  You do not have any active package
                </Typography>
                <Typography variant="body2">
                  Your active packages will show here once get them
                </Typography>
                <Box sx={{ m: 2 }} />
                <Button
                  startIcon={<PixIcon />}
                  variant="contained"
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    backgroundColor: "#0d47a1",
                  }}
                  onClick={() => history.push(`/dashboard/billing`)}
                >
                  View available packages
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} lg={5}>
          <Card sx={{ borderRadius: 6 }}>
            <CardContent sx={{ m: 1 }}>
              <Avatar
                alt={user?.avatar?.alt || "profile"}
                src={user?.avatar?.url}
                sx={{ width: 50, height: 50, mb: 1 }}
              />
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {user?.fullName || "Please provide your full name"}
              </Typography>
              <Typography
                variant="body2"
                noWrap
                sx={{ textOverflow: "ellipsis" }}
              >
                {user?.seeker?.descriptionPlaintext ||
                  user?.employer?.descriptionPlaintext ||
                  "Please add a short decription"}
              </Typography>
              <Box sx={{ m: 1 }} />
              <Button
                endIcon={<ArrowForwardIcon />}
                sx={{
                  borderRadius: 3,
                  textTransform: "none",
                }}
                onClick={() => history.push(`/dashboard/profile`)}
              >
                My profile
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
