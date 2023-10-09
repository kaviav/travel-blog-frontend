import axios from "axios";
import { useEffect, useState } from "react";
import BlogItem from "./BlogItem";

function UserBlogs() {
  const id = localStorage.getItem("userId");

  const [user, setUser] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get(`https://travel-blob-backend.onrender.com/blog/getuser/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);

  console.log(user);
  return (
    <div>
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <BlogItem
            id={blog._id}
            key={index}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={user.name}
          />
        ))}
    </div>
  );
}

export default UserBlogs;
