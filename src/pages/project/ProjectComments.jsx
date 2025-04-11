import { useState } from "react";
import { createTimeStamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import Avatar from "../../components/Avatar";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import "./Project.css";
import ProgressIcon from "../../components/ProgressIcon";

function ProjectComments({ project }) {
  const { user } = useAuthContext();
  const [newComment, setNewComment] = useState("");
  const { updateItem, isPending, error } = useUpdateDocument("projects");
  const [commentError, setCommentError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCommentError(null);

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: createTimeStamp.now(),
      id: Math.random(),
    };

    if (!newComment) return setCommentError("Please add a comment");

    updateItem(project.id, { comments: [...project.comments, commentToAdd] });

    if (!error) setNewComment("");
  };

  // format date to show time ago in seconds, minutes, hours, days
  const timeAgo = (timestamp) => {
    const now = new Date();
    const date = timestamp.toDate(); // Firebase Timestamp to JS Date

    const diffInSeconds = Math.floor((now - date) / 1000);
    if (diffInSeconds < 60) return `${diffInSeconds} secs ago`;

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min${diffInMinutes > 1 ? "s" : ""} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 31) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }

    // Fallback to showing the actual date
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="project-comments">
      <h4>Project Comments</h4>

      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment) => (
            <li key={comment.id}>
              <div className="comment-author">
                <Avatar src={comment.photoURL} />
                <p className="comment-author-name">{comment.displayName}</p>
                <span className="comment-date">
                  {timeAgo(comment.createdAt)}
                </span>
              </div>

              <div className="comment-content">
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
      </ul>

      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          {commentError && <p className="error">{commentError}</p>}
          <textarea
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        {isPending ? (
          <ProgressIcon />
        ) : (
          <button className="btn">Add Comment</button>
        )}
      </form>
    </div>
  );
}

export default ProjectComments;
