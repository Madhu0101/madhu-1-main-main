
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
  checklist: Yup.array().of(Yup.string()), 
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
      checklist: [],
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
  const handleChecklistChange = (event) => {
    const updatedChecklist = event.target.checked
      ? [...values.checklist, event.target.value]
      : values.checklist.filter((item) => item !== event.target.value);
    handleChange({
      target: { name: "checklist", value: updatedChecklist },
    });
  };

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
      <div className="checklist">
          <p>Checklist:</p>
          {["Passport", "Electronic gadgets", "Clothes"].map((item, index) => (
            <div key={index}>
              <label>
                <input
                  type="checkbox"
                  value={item}
                  onChange={handleChecklistChange}
                  checked={values.checklist.includes(item)}
                />
                {item}
              </label>
            </div>
          ))}
        </div>

        <button type="submit">Add Blog</button>
      </form>
  </div>
  );
}