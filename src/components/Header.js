import React, { useState } from "react";
import { Switch } from "@mui/material";
//
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { useStyles } from "./utils";
function Header({ toggleDarkMode, darkMode }) {
  const styles = useStyles();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const [value, setValue] = useState();

  return (
    <div>
      <AppBar
        position="sticky"
        sx={{
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
        }}
      >
        <Toolbar>
          <Typography
            className={styles.font}
            sx={{
              color: "#68a869",
            }}
            variant="h4"
          >
            TravelBlog
          </Typography>

          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            color="primary"
          />

          {isLoggedIn && (
            <Box display="flex" marginLeft={"auto"} marginRight="auto">
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab
                  className={styles.font}
                  LinkComponent={Link}
                  to="/blogs"
                  label="ALL BLOGS"
                />
                <Tab
                  className={styles.font}
                  LinkComponent={Link}
                  to="/myblogs"
                  label="MY BLOG"
                />
                <Tab
                  className={styles.font}
                  LinkComponent={Link}
                  to="/addblog"
                  label="ADD BLOG"
                />
              </Tabs>
            </Box>
          )}

          <Box display="flex" marginLeft="auto">
            {!isLoggedIn && (
              <>
                <Button
                  LinkComponent={Link}
                  to="/auth"
                  variant="contained"
                  sx={{
                    margin: 1,
                    borderRadius: 10,
                    background:
                      "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
                  }}
                >
                  Login
                </Button>
                <Button
                  LinkComponent={Link}
                  to="/auth"
                  variant="contained"
                  sx={{
                    margin: 1,
                    borderRadius: 10,
                    background:
                      "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
                  }}
                >
                  SignUp
                </Button>
              </>
            )}
            {isLoggedIn && (
              <Button
                onClick={() => dispatch(authActions.logout())}
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{
                  margin: 1,
                  borderRadius: 10,
                  background:
                    "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
                }}
              >
                Log Out
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
