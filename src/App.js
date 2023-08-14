import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import React, { useEffect, useState } from "react";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import AddBlog from "./components/AddBlog";
import BlogDetails from "./components/BlogDetails";
import UserBlogs from "./components/UserBlogs";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import { authActions } from "./store";

function App() {
  const dispatch = useDispatch();
  //
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login()); /////IMP
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        {/* Pass the toggleDarkMode function and darkMode state to the Header component */}
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <main>
          <Routes>
            {!isLoggedIn ? (
              <Route path="/auth" element={<Auth />} />
            ) : (
              <>
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/addblog" element={<AddBlog />} />
                <Route path="/myBlogs" element={<UserBlogs />} />
                <Route path="/myBlogs/:id" element={<BlogDetails />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
