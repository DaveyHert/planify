import "./ProjectCard.css";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

// ProjectCard component
function ProjectCard({ project }) {
  console.log(project);
  return (
    <div className="project-card">
      <Link to={`/projects/${project.id}`} key={project.id}>
        <h4>{project.name}</h4>
        <p className="due-date">
          Due by {project.dueDate.toDate().toDateString()}
        </p>
        <div className="assigned-to">
          <p>
            <strong>Assigned to:</strong>
          </p>
          <ul>
            {project.assignedUsers.map((user) => (
              <li key={user.photoURL}>
                <Avatar src={user.photoURL} />
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </div>
  );
}

export default ProjectCard;
