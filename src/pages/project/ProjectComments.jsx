import { useState } from "react";
import { createTimeStamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import Avatar from "../../components/Avatar";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import "./Project.css";
import ProgressIcon from "../../components/ProgressIcon";
import { useTimeAgo } from "../../hooks/useTimeAgo";

function ProjectComments({ project }) {
  const { user } = useAuthContext();
  const [newComment, setNewComment] = useState("");
  const { updateItem, isPending, error } = useUpdateDocument("projects");
  const [commentError, setCommentError] = useState(null);

  const { getTimeAgo } = useTimeAgo();

  const handleSubmit = (e) => {
    e.preventDefault();
    setCommentError(null);

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: createTimeStamp.now(),
      createdBy: user.uid,
      id: Math.random(),
    };

    if (!newComment) return setCommentError("Please add a comment");

    updateItem(project.id, { comments: [...project.comments, commentToAdd] });

    if (!error) setNewComment("");
  };

  const handleDeleteComment = (id) => {
    const commentsWithoutDeletedOne = project.comments.filter(
      (comment) => comment.id !== id
    );
    updateItem(project.id, { comments: commentsWithoutDeletedOne });
  };

  return (
    <div className='project-comments'>
      <h4>Project Comments</h4>

      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment) => (
            <li key={comment.id}>
              <div className='comment-author'>
                <Avatar src={comment.photoURL} />
                <p className='comment-author-name'>{comment.displayName}</p>
                <span className='comment-date'>
                  {getTimeAgo(comment.createdAt)}
                </span>
              </div>

              <div className='comment-content'>
                <p>{comment.content}</p>
              </div>

              {user.uid === comment.createdBy && (
                <span
                  className='delete-comment'
                  title='remove'
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  -
                </span>
              )}
            </li>
          ))}
      </ul>

      <form className='add-comment' onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          {commentError && <p className='error'>{commentError}</p>}
          <textarea
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        {isPending ? (
          <ProgressIcon />
        ) : (
          <button className='btn'>Add Comment</button>
        )}
      </form>
    </div>
  );
}

export default ProjectComments;
