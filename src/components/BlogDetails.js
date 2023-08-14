import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BlogDetails() {
  const id = useParams().id;
  const navigate = useNavigate();
  const labelStyles = { mt: 2, mb: 1, fontSize: "24px", fontWeight: "bold" };

  const [input, setInput] = useState();

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/blog/getid/${id}`)
      .catch((err) => console.log(err));
    const data = res.data;
    console.log(data);
    return data;
  };

  useEffect(() => {
    fetchDetails().then((data) =>
      setInput({
        title: data.blog.title,
        description: data.blog.description,
        imageURL: data.blog.image,
      })
    );
  }, [id]);
  console.log(input);

  const updateRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/blog/updateblog/${id}`, {
        title: input.title,
        description: input.description,
        image: input.imageURL,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBlogs"));
  };

  return (
    <div>
      {input && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="green"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin={3}
            display="flex"
            flexDirection={"column"}
            width={"80%"}
          >
            <Typography
              fontWeight={"bold"}
              padding={3}
              color="grey"
              variant="h3"
              textAlign={"center"}
            >
              Post Your Blog
            </Typography>

            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              value={input.title}
            />

            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              name="description"
              onChange={handleChange}
              value={input.description}
            />

            <InputLabel sx={labelStyles}>ImageURL</InputLabel>
            <TextField
              name="imageURL"
              onChange={handleChange}
              value={input.imageURL}
            />

            <Button
              sx={{ mt: 2, borderRadius: 3 }}
              variant="contained"
              color="warning"
              type="submit"
            >
              Update
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
}

export default BlogDetails;
