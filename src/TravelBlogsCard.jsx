import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

export function TravelBlogCard({
  title,
  content,
  images,
  location,
  comments,
}) {
  const [showContent, setShowContent] = useState(false);

  return (
    <div className="travel-blog-card">
      {/* Display the title */}
      <h2>{title}</h2>

      {/* Display images */}
      {images.map((image, index) => (
        <img key={index} src={image} alt={`Image ${index}`} />
      ))}

      {/* Display summary/content */}
      <button onClick={() => setShowContent(!showContent)}>Toggle Content</button>
      {showContent && <p>{content}</p>}

      {/* Display location */}
      <p>Location: {location.coordinates[0]}, {location.coordinates[1]}</p>

      {/* Display public status */}
      {/* <p>Public: {public ? "Yes" : "No"}</p> */}

      {/* Display comments */}
      <p> {comments}</p>

      {/* Add details button */}
      <IconButton color="primary" aria-label="view details">
        <InfoIcon />
      </IconButton>
    </div>
  );
}


