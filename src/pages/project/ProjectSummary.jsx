import { useAuthContext } from "../../hooks/useAuthContext";
import "./Project.css";
import Avatar from "../../components/Avatar";
import LabelIcon from "../../assets/label-icon.svg";

export default function ProjectSummary({ project }) {
  const { user } = useAuthContext();

  return (
    <div>
      <div className='project-summary'>
        <h2 className='page-title'>{project.name}</h2>
        <div className='project-info'>
          <p className='due-date'>
            Due date<span>{project.dueDate.toDate().toDateString()}</span>
          </p>

          <div
            className='created-by'
            data-user-name={project.createdBy.displayName}
          >
            Created by <Avatar src={project.createdBy.photoURL} />
          </div>
          <div className='label'>
            <img src={LabelIcon} alt='label' />
            <span>{project.category}</span>
          </div>
        </div>
        <p className='details'>{project.details}</p>
        <h4>Project assigned to:</h4>
        <div className='assigned-users'>
          {project.assignedUsers.map((user) => (
            <div key={user.id} data-user-name={user.displayName}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id && (
        <button className='btn'>Mark as Complete</button>
      )}
    </div>
  );
}
