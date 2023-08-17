import { Routes, Route, Link } from "react-router-dom";
import { AddBlogs } from "./AddBlogs";
import  { useState, useEffect } from 'react';
import "./App.css";
import { TravelBlogCard } from "./TravelBlogCard";
export default function App() {
  return (
    <div className="app-detail">
      <h2>Fly beyond the sky and enjoy the world's happiness!</h2>
      <h4>The Travel Blogs</h4>
      <Link to="/">Home</Link>
      <Link to="/blogs">TravelBlogs</Link>
      <Link to="/blogs/add">Add New Blogs</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<TravelBlogs />} />
        <Route path="/blogs/add" element={<AddBlogs />} />
      </Routes>
    </div>
  );
}
function Home() {
  return (
    <div className="title_text">
      <h3>WELCOME TO THE TRAVEL UNIVERSE!!</h3>
      <img src="https://thumbs.dreamstime.com/b/ready-summer-vacation-travel-background-d-rendering-114574299.jpg" alt="travel" />
      <ul></ul>
    </div>
  );
}

// function TravelBlogs () {

//   return (
//     <div className="title_text">
//       <h4>WELCOME TO THE TRAVEL BLOG!!</h4>
//       <img src="https://thumbs.dreamstime.com/b/ready-summer-vacation-travel-background-d-rendering-114574299.jpg" alt="travel" />
//       <ul></ul>
//     </div>
//   );
// }


function TravelBlogs() {
  const [blogs, setBlogs] = useState([]);
 

  useEffect(() => {
    fetch('https://64c3962067cfdca3b65fef80.mockapi.io/mockdata')
      .then(response => response.json())
      .then(data => {
        setBlogs(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const getBlogs = () => {
        fetch("https://64cc7dce2eafdcdc8519e155.mockapi.io/movies/", {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => setBlogs(data));
      };

  const deleteBlogs = (id) => {
    console.log("Deleting...", id);
    fetch("https://64c3962067cfdca3b65fef80.mockapi.io/mockdata/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => getBlogs());
  };
  return (
    <div className="container">
      <div className="title">
        <h3>Travel Blogs</h3>
      </div>
      <div className="travel-blogs">
        {blogs.map((blog, index) => (
          <TravelBlogCard
            key={index}
            title={blog.title}
            images={blog.images}
            content={blog.content}
            location={blog.location}
            public={blog.ispublic ? "Yes" : "No"}
           
            comments={blog.comments}
            deleteButton={
              <button onClick={() => deleteBlogs(blog.id)}>Delete Blogs</button>
            }
            checklistOutput={blog.checklist ? blog.checklist.join(", ") : "No items checked"}
          />
        ))}
      </div>
    </div>
  );
}