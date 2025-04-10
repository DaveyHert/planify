import "./Project.css";
import Avatar from "../../components/Avatar";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function ProjectSummary({ project }) {
  const { user } = useAuthContext();

  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p className="due-date">
          Project due by<span>{project.dueDate.toDate().toDateString()}</span>
        </p>
        <p className="details">{project.details}</p>
        <h4>Project assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsers.map((user) => (
            <div key={user.id} data-user-name={user.displayName}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id && (
        <button className="btn">Mark as Complete</button>
      )}
    </div>
  );
}
