
import { useState } from "react";

export function TravelBlogCard({
  title, content, images, location, ispublic, comments,  checklistOutput,deleteButton
}) {
  const [checked, setChecked] = useState([]);
  const checkList = ["Passport", "Electronic gadgets", "Clothes"];

 
  const handleCheck = (event) => {
    const updatedList = event.target.checked
      ? [...checked, event.target.value]
      : checked.filter((item) => item !== event.target.value);
    setChecked(updatedList);
  };

  const isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  return (
    <div className="travel-blog-card">
      <h2>{title}</h2>
      <img src={images} alt="Blog" />
      <p>{content}</p>
      <p>Location: {location}</p>
      <p>Public: {ispublic ? "Yes" : "No"}</p>
       <h4>Checklist: {checklistOutput}</h4>
      <div className="checklist">
        {checkList.map((item, index) => (
          <div key={index}>
            <input value={item} type="checkbox"  onChange={event => handleCheck(event, item)} 
            />
            <span className={isChecked(item)}>{item}</span>
          </div>
        ))}
      </div>
      <p>Comments: {comments}</p>
      {deleteButton}
    </div>
  );
}


