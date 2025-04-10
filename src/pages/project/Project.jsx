import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import ProgressIcon from "../../components/ProgressIcon";
import ProjectSummary from "./ProjectSummary";
import ProjectComments from "./ProjectComments";
import "./Project.css";

function Project() {
  const { id } = useParams();

  const { data: project, isPending, error } = useDocument("projects", id);

  if (isPending) {
    return <ProgressIcon />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="project-details container">
      {project && (
        <>
          <ProjectSummary project={project} />
          <ProjectComments project={project} />
        </>
      )}
    </div>
  );
}

export default Project;
