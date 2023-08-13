import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import React from "react";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import AddBlog from "./components/AddBlog";
import BlogDetails from "./components/BlogDetails";
import UserBlogs from "./components/UserBlogs";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/blogs" element={<Blogs />}></Route>
          <Route path="/addblog" element={<AddBlog />}></Route>
          <Route path="/blogdetails/:id" element={<BlogDetails />}></Route>
          <Route path="/myblogs" element={<UserBlogs />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
