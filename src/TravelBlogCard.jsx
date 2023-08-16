
export function TravelBlogCard({
  title, content, images, location, ispublic, comments, deleteButton,

}) {
  
  return (
    <div className="travel-blog-card">

      <h2>{title}</h2>
      <img src={images} />
      <p>{content}</p>
      <p>location: {location}</p>
      <p>public: {ispublic ? "Yes" : "No"}</p>
      <p>comments: {comments}</p>
      {deleteButton}
    </div>
  );
}
