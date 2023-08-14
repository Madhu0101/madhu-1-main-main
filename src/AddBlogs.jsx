import { useState } from "react";

export function AddBlogs() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [comments, setComments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can implement the logic to submit the blog data
    const newBlog = {
      title,
      content,
      images,
      location,
      public: isPublic,
      comments,
    };
    console.log("Submitted Blog:", newBlog);
    // Reset the form fields after submission
    setTitle("");
    setContent("");
    setImages([]);
    setLocation("");
    setIsPublic(false);
    setComments([]);
  };

  return (
    <div className="add-blogs">
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required />
        </div>
        <div>
          <label htmlFor="images">Images :</label>
          <input
            type="text"
            id="images"
            value={images}
            onChange={(e) => setImages(e.target.value.split(","))} />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div>
          <label htmlFor="public">Public:</label>
          <input
            type="checkbox"
            id="public"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)} />
        </div>
        <div>
          <label htmlFor="comments">Comments:</label>
          <input
            type="text"
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value.split(","))} />
        </div>
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
}
