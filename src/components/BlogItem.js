import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BlogItem = ({ title, description, imageURL, userName, isUser, id }) => {
  const navigate = useNavigate();

  // const date = new Date().toLocaleDateString();

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/blog/delete/${id}`)
      .catch((err) => console.log(err));

    const data = res.data;
    console.log(data);
    return data;
  };

  const handleDelete = () => {
    deleteRequest().then((data) => console.log(data));
  };
  return (
    <div>
      <Card
        sx={{
          width: "60%",
          height: "30%",
          margin: "auto",
          mt: 4,
          mb: 1,
          padding: 2,

          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName ? userName.charAt(0).toUpperCase() : ""}
            </Avatar>
          }
          title={title}
          subheader={
            <Typography variant="body2">
              {new Date().toLocaleString()}
            </Typography>
          }
        />

        {isUser && (
          <Box display="flex" sx={{ mb: 2 }}>
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardMedia component="img" height="250" image={imageURL} alt="card" />
        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            <b>{userName}</b> {": "} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogItem;
