
// import * as Yup from "yup";
// import { TextField } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik";

// const validationSchema = Yup.object().shape({
//   title: Yup.string().required("Title is required"),
//   content: Yup.string().required("Content is required"),
//   images: Yup.array().of(Yup.string().url("Invalid image URL")),
//   location: Yup.object().shape({
//     type: Yup.string().required(),
//     coordinates: Yup.array().of(Yup.number()).min(2),
//   }),
//   isPublic: Yup.boolean(),
//   comments: Yup.string().required("Comment cannot be empty"),
// });

// export function AddBlogs() {
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       title: "",
//       content: "",
//       images: [],
//       location: { type: "Point", coordinates: [] },
//       isPublic: false,
//       comments: "",
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       console.log("Submitted Blog:", values);

//       // Reset the form fields after successful submission
//       formik.resetForm();
//     },
//   });

//   return (
//     <div className="add-blogs">
//       <h2>Add New Blog</h2>
//       <form onSubmit={formik.handleSubmit}>
//         <div>
//           <label htmlFor="title">Title:</label>
//           <TextField
//             type="text"
//             id="title"
//             {...formik.getFieldProps("title")}
//             required
//           />
//           {formik.touched.title && formik.errors.title && (
//             <div className="error">{formik.errors.title}</div>
//           )}
//         </div>
//         <div>
//           <label htmlFor="content">Content:</label>
//           <TextField
//             multiline
//             id="content"
//             {...formik.getFieldProps("content")}
//             required
//           />
//           {formik.touched.content && formik.errors.content && (
//             <div className="error">{formik.errors.content}</div>
//           )}
//         </div>
//         <div>
//           <label htmlFor="images">Images:</label>
//           <TextField
//             type="text"
//             id="images"
//             {...formik.getFieldProps("images")}
//           />
//           {formik.touched.images && formik.errors.images && (
//             <div className="error">{formik.errors.images}</div>
//           )}
//         </div>
//         {/* Implement location selection here */}
//         <div>
//           <label htmlFor="public">Public:</label>
//           <input
//             type="checkbox"
//             id="public"
//             {...formik.getFieldProps("isPublic")}
//           />
//         </div>
//         <div>
//           <label htmlFor="comments">Comments:</label>
//           <TextField
//             type="text"
//             id="comments"
//             {...formik.getFieldProps("comments")}
//           />
//           {formik.touched.comments && formik.errors.comments && (
//             <div className="error">{formik.errors.comments}</div>
//           )}
//         </div>
//         <button type="submit">Add Blog</button>
//       </form>
//     </div>
//   );
// }

import * as Yup from "yup";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";



export function AddBlogs() {
  const navigate = useNavigate();
  const formValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  images: Yup.string().url("Invalid image URL"),
  location: Yup.string().required().min(2),
  isPublic: Yup.boolean(),
  comments: Yup.string().required("Comment cannot be empty"),
});

  const  { handleSubmit, handleChange, handleBlur, values, touched, errors } = 
  useFormik({
    initialValues: {
      title: "",
      content: "",
      images: "",
      location: { type: "Point", coordinates: [] },
      isPublic: "",
      comments: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      fetch('https://64c3962067cfdca3b65fef80.mockapi.io/mockdata/', {
         method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
      }).then(() => navigate("/blogs"));
    },
  });

  return (
 <div className="add-blogs">
    <h2>Add New Blog</h2>
    <form onSubmit={handleSubmit}>
      <TextField
        name="title"
        label="title"
        onChange={handleChange}
        onBlur={handleBlur}
        // value={values.title}
        type="text"
        placeholder="Title"
        required
     />
     {touched.title && errors.title ? errors.title : null}
     <TextField
        name="content"
        label="content"
        onChange={handleChange}
        onBlur={handleBlur}
        // value={values.content}
        type="text"
        placeholder="Content"
        required
     />
     {touched.content && errors.content ? errors.content : null}  
     <TextField
        name="images"
        label="images"
        onChange={handleChange}
        onBlur={handleBlur}
        // value={values.images}
        type="text"
        placeholder="Images URL"
        required
      />
      {touched.images && errors.images ? errors.images : null}
      <TextField
        name="location"
        label="location"
        onChange={handleChange}
        onBlur={handleBlur}
        // value={values.location}
        type="text"
        placeholder="Location"
        required
      />
      {touched.location && errors.location ? errors.location: null}
      <TextField
        name="isPublic"
        label="isPublic"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.isPublic}
        type="text"
        placeholder="isPublic"
        required
      />
      {touched.isPublic && errors.isPublic ? errors.isPublic : null}
      <TextField
        name="comments"
        label="comments"
        onChange={handleChange}
        onBlur={handleBlur}
        // value={values.comments}
        type="text"
        placeholder="comments"
        required
      />
      {touched.comments && errors.comments ? errors.comments : null}

        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
}