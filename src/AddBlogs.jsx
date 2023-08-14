// import { useState } from "react";

// export function AddBlogs() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [images, setImages] = useState([]);
//   const [location, setLocation] = useState("");
//   const [isPublic, setIsPublic] = useState(false);
//   const [comments, setComments] = useState([]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you can implement the logic to submit the blog data
//     const newBlog = {
//       title,
//       content,
//       images,
//       location,
//       public: isPublic,
//       comments,
//     };
//     console.log("Submitted Blog:", newBlog);
//     // Reset the form fields after submission
//     setTitle("");
//     setContent("");
//     setImages([]);
//     setLocation("");
//     setIsPublic(false);
//     setComments([]);
//   };

//   return (
//     <div className="add-blogs">
//       <h2>Add New Blog</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="title">Title:</label>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required />
//         </div>
//         <div>
//           <label htmlFor="content">Content:</label>
//           <textarea
//             id="content"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             required />
//         </div>
//         <div>
//           <label htmlFor="images">Images :</label>
//           <input
//             type="text"
//             id="images"
//             value={images}
//             onChange={(e) => setImages(e.target.value.split(","))} />
//         </div>
//         <div>
//           <label htmlFor="location">Location:</label>
//           <input
//             type="text"
//             id="location"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)} />
//         </div>
//         <div>
//           <label htmlFor="public">Public:</label>
//           <input
//             type="checkbox"
//             id="public"
//             checked={isPublic}
//             onChange={(e) => setIsPublic(e.target.checked)} />
//         </div>
//         <div>
//           <label htmlFor="comments">Comments:</label>
//           <input
//             type="text"
//             id="comments"
//             value={comments}
//             onChange={(e) => setComments(e.target.value.split(","))} />
//         </div>
//         <button type="submit">Add Blog</button>
//       </form>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  images: Yup.array().of(Yup.string().url("Invalid image URL")),
  location: Yup.object().shape({
    type: Yup.string().required(),
    coordinates: Yup.array().of(Yup.number()).min(2),
  }),
  isPublic: Yup.boolean(),
  comments: Yup.string().required("Comment cannot be empty"),
});

export function AddBlogs() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      images: [],
      location: { type: "Point", coordinates: [] },
      isPublic: false,
      comments: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Submitted Blog:", values);

      // Reset the form fields after successful submission
      formik.resetForm();
    },
  });

  return (
    <div className="add-blogs">
      <h2>Add New Blog</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <TextField
            type="text"
            id="title"
            {...formik.getFieldProps("title")}
            required
          />
          {formik.touched.title && formik.errors.title && (
            <div className="error">{formik.errors.title}</div>
          )}
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <TextField
            multiline
            id="content"
            {...formik.getFieldProps("content")}
            required
          />
          {formik.touched.content && formik.errors.content && (
            <div className="error">{formik.errors.content}</div>
          )}
        </div>
        <div>
          <label htmlFor="images">Images:</label>
          <TextField
            type="text"
            id="images"
            {...formik.getFieldProps("images")}
          />
          {formik.touched.images && formik.errors.images && (
            <div className="error">{formik.errors.images}</div>
          )}
        </div>
        {/* Implement location selection here */}
        <div>
          <label htmlFor="public">Public:</label>
          <input
            type="checkbox"
            id="public"
            {...formik.getFieldProps("isPublic")}
          />
        </div>
        <div>
          <label htmlFor="comments">Comments:</label>
          <TextField
            type="text"
            id="comments"
            {...formik.getFieldProps("comments")}
          />
          {formik.touched.comments && formik.errors.comments && (
            <div className="error">{formik.errors.comments}</div>
          )}
        </div>
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
}
