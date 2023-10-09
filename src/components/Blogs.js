import React, { useEffect, useState } from "react";

import axios from "axios";
import BlogItem from "./BlogItem";

const Blogs = () => {
  const [blogs, setBlogs] = useState();

  const sendRequest = async () => {
    const res = await axios
      .get("https://travel-blob-backend.onrender.com/blog/getall")
      .catch((err) => console.log(err));

    const data = res.data;
    console.log(data);
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blog));
  }, []);
  console.log(blogs);

  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <BlogItem
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.user.name}
          />
        ))}
    </div>
  );
};

export default Blogs;
