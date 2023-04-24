import * as React from "react";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();
function Banner(props) {
  const { content } = props;
  const history = useHistory();
  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${content.backimage})`,
        borderRadius: 4,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {
        <img
          style={{ display: "none" }}
          src={content.backimage}
          alt={content.backimageText}
        />
      }
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
          borderRadius: 4,
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <img src={content.logoimage} alt="kaziconnect" />
            <Button
              onClick={() => history.push(`${content.link}`)}
              variant="contained"
              color="secondary"
              sx={{
                ml: 5,
                mt: -1,
                textTransform: "none",
                fontSize: 18,
                borderRadius: 2,
                fontWeight: 600,
                p: 1.5,
                pl: 4,
                pr: 4,
                [theme.breakpoints.down("sm")]: {
                  p: 1.2,
                  m: 1,
                  fontWeight: 500,
                },
              }}
            >
              {content.button}
            </Button>
            <Box sx={{ m: 2 }} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Banner;
